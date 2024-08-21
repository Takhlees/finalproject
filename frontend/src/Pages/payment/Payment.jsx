import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './Payment.css';


// Load the publishable key from Stripe dashboard
const stripePromise = loadStripe('pk_test_51PoP9sG2pH36a60QUpBlEvvFEdlW7BTQXzHTLf00sxF4q8H2HXxnFJHWKBIetYBtezUeAb0ZOoGTtTdUHR4khcuy006LiG7TxZ');

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

  const { amount, name, email, contact, userID } = location.state; 

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

    console.log('Payment Method:', paymentMethod);
    console.log('Amount:', amount);

    const paymentSuccess = true; 

    if (paymentSuccess) {
      navigate('/confirmation', {
        state: {
          ...location.state,
          paymentStatus: 'success',
        },
      });
    } else {
      console.error('Payment failed');
    }
  };

  return (
    <div className="paymentContainer">
      <h1>Complete Your Payment</h1>
      <p>Payment Amount: ${amount}</p>
      <form onSubmit={handleSubmit} className="paymentForm">
        <CardElement className="cardElement" />
        <button type="submit" disabled={!stripe}>
          Pay ${amount}
        </button>
      </form>
    </div>
  );
};

export default Payment;
