import React from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

export default function CheckoutForm({ clientSecret, dpmCheckerLink }) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/auth/payment?payment_intent_client_secret=${clientSecret}`,
      },
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = { layout: "tabs" };

  return (
    <div className="container mt-20 mb-10 min-h-32 justify-center flex-col items-center flex mx-auto">
      <div>
        <h2 className="text-3xl font-bold text-gray-600 mb-6">Please make payment</h2>
      </div>
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button className="btn btn-success mt-3 text-white my-3" disabled={isLoading || !stripe || !elements}>
          <span id="button-text">
            {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
          </span>
        </button>
        {message && <div id="payment-message">{message}</div>}
      </form>
      <div id="dpm-annotation">
        <p>
          Payment methods are dynamically displayed based on customer location, order amount, and currency.
          <a href={dpmCheckerLink} target="_blank" rel="noopener noreferrer">Check integration</a>
        </p>
      </div>
    </div>
  );
}
