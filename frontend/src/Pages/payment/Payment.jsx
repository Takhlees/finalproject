import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "./Payment.css";

const stripePromise = loadStripe(
  "pk_test_51PoP9sG2pH36a60QUpBlEvvFEdlW7BTQXzHTLf00sxF4q8H2HXxnFJHWKBIetYBtezUeAb0ZOoGTtTdUHR4khcuy006LiG7TxZ"
);

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

  const { amount } = location.state;

  const [cardError, setCardError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if all required fields and card details are valid
  const isFormValid = () => {
    return !cardError;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (!stripe || !elements) {
      return;
    }

    setTimeout(() => {
      navigate("/bookingconfirmation", {
        state: {
          ...location.state,
          paymentStatus: "success",
        },
      });
      setIsSubmitting(false);
    }, 2000);
  };

  const handleCardChange = (event) => {
    if (event.error) {
      setCardError(event.error.message);
    } else {
      setCardError("");
    }
  };

  return (
    <div className="paymentContainer">
      <h1>Complete Your Payment</h1>
      <p>Payment Amount: ${amount}</p>
      <form onSubmit={handleSubmit} className="paymentForm">
        <CardElement className="cardElement" onChange={handleCardChange} />
        {cardError && <p className="cardError">{cardError}</p>}

        <button
          type="submit"
          disabled={!stripe || !isFormValid() || isSubmitting}>
          {isSubmitting ? "Processing..." : `Pay $${amount}`}
        </button>
      </form>
    </div>
  );
};

export default Payment;
