import { Elements } from "@stripe/react-stripe-js";
import { useContext, useMemo } from "react";
import { PaymentProviderContext } from "../../../contexts/paymentprovider/paymentprovider.context";
import { StripeCheckoutForm } from "./stripe.checkoutform";
import type { StripePaymentAttributes } from "../../../utilities/types.declarationts";
import { loadStripe } from "@stripe/stripe-js";

export function StripeCheckOutComponent({
  userSubscriptionId,
  eventType,
  customFunction,
  userId,
  reqAction,
}: StripePaymentAttributes) {
  const { paymentProviderState } = useContext(PaymentProviderContext);
  const stripePromise = useMemo(
    () => loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY),
    []
  );

  const options = {
    clientSecret: paymentProviderState?.stripeClientSecret
      ? paymentProviderState?.stripeClientSecret
      : "",
    appearance: {
      theme: "stripe" as "stripe",
      variables: {
        colorPrimary: "#aa8924",
        fontFamily: `font-family: var(--font-poppins) !important;`,
        colorText: "#747474",
        colorBackground: "#ffffff",
      },
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <StripeCheckoutForm
        eventType={eventType}
        userSubscriptionId={userSubscriptionId}
        customFunction={customFunction}
        userId={userId}
        reqAction={reqAction}
      />
    </Elements>
  );
}
