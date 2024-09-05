"use client";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/CheckoutForm";
import CompletePage from "@/components/CompletePage";
import { useEffect, useState } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function App() {
  const [clientSecret, setClientSecret] = useState("");
  const [dpmCheckerLink, setDpmCheckerLink] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    const clientSecretFromUrl = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    if (clientSecretFromUrl) {
      setConfirmed(true);
      setClientSecret(clientSecretFromUrl);
    }
  }, []);

  useEffect(() => {
    if (!clientSecret) {
      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
      })
        .then((res) => res.json())
        .then((data) => {
          setClientSecret(data.clientSecret);
          setDpmCheckerLink(data.dpmCheckerLink);
        })
        .catch((error) => console.error("Error:", error));
    }
  }, [clientSecret]);

  const appearance = { theme: "stripe" };
  const options = { clientSecret, appearance };

  return (
    <div className="App min-h-[800px]">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          {confirmed ? (
            <CompletePage />
          ) : (
            <CheckoutForm
              clientSecret={clientSecret}
              dpmCheckerLink={dpmCheckerLink}
            />
          )}
        </Elements>
      )}
    </div>
  );
}
