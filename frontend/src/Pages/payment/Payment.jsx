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

    try {
      // Create PaymentIntent on the server
      const response = await fetch('http://localhost:4000/api/payment/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }), // Convert to smallest currency unit
      });
      
      const { clientSecret } = await response.json();
      if (!clientSecret) {
        throw new Error('Missing client secret');
      }
      // Confirm card payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name,
            email,
            phone: contact,
          },
        },
      });

      if (error) {
        console.error(error);
        // Handle error and provide feedback to the user
      } else if (paymentIntent.status === 'succeeded') {
        console.log('Payment succeeded!');
        navigate('/confirmation', {
          state: {
            ...location.state,
            paymentStatus: 'success',
          },
        });
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error and provide feedback to the user
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
