import React, { useState, useEffect } from 'react';
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

  const { amount, name, email, contact } = location.state;

  const [formValues, setFormValues] = useState({ name, email, contact });
  const [cardError, setCardError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if all required fields and card details are valid
  const isFormValid = () => {
    return (
      formValues.name &&
      formValues.email &&
      formValues.contact &&
      !cardError
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

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
            name: formValues.name,
            email: formValues.email,
            phone: formValues.contact,
          },
        },
      });

      if (error) {
        setCardError(error.message);
        setIsSubmitting(false);
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
      setCardError('An error occurred while processing the payment.');
      setIsSubmitting(false);
      console.error('Error:', error);
      // Handle error and provide feedback to the user
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleCardChange = (event) => {
    if (event.error) {
      setCardError(event.error.message);
    } else {
      setCardError('');
    }
  };

  return (
    <div className="paymentContainer">
      <h1>Complete Your Payment</h1>
      <p>Payment Amount: ${amount}</p>
      <form onSubmit={handleSubmit} className="paymentForm">
        <CardElement className="cardElement" onChange={handleCardChange} />
        {cardError && <p className="cardError">{cardError}</p>}
        <div className="inputContainer">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formValues.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formValues.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="tel"
            name="contact"
            placeholder="Contact"
            value={formValues.contact}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" disabled={!stripe || !isFormValid() || isSubmitting}>
          {isSubmitting ? 'Processing...' : `Pay $${amount}`}
        </button>
      </form>
    </div>
  );
};

export default Payment;
