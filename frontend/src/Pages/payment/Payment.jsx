import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './Payment.css';

// Load the publishable key from Stripe dashboard
const stripePromise = loadStripe('your-publishable-key-here');

const Payment = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

   
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error(error);
      return;
    }

    // TODO: Send paymentMethod.id and booking details to your backend to complete the payment
    console.log('Payment Method:', paymentMethod);

    // Mock successful payment response
    const paymentSuccess = true;

    if (paymentSuccess) {
      
      navigate('/confirmation', { state: { ...location.state, paymentStatus: 'success' } });
    } else {
      console.error('Payment failed');
    }
  };

  return (
    <div className="paymentContainer">
      <h1>Complete Your Payment</h1>
      <form onSubmit={handleSubmit} className="paymentForm">
        <CardElement className="cardElement" />
        <button type="submit" disabled={!stripe}>
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default Payment;
