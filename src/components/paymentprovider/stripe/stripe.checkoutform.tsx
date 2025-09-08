import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useNotificationHook } from "../../../hooks/custom.hook";
import type { StripePaymentAttributes } from "../../../utilities/types.declarationts";
import { useContext } from "react";
import { settingContext } from "../../../contexts/settings/settings.context";
import { clientURL } from "../../../utilities/baseURL";
import { TextUIComponent } from "../../../utilities/UI/texts.ui";
import { ButtonUIComponent } from "../../../utilities/UI/button.ui";

export function StripeCheckoutForm({
  customFunction,
  userId,
  reqAction,
}: StripePaymentAttributes) {
  const { notify } = useNotificationHook();
  const { settingDispatch } = useContext(settingContext);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const redirectURL = `${clientURL}/onboarding?screenname=thankyou&userid=${userId}`;

    if (!stripe || !elements) {
      return;
    }
    settingDispatch({ type: "SET_ISLOADING_STARTS" });
    try {
      const { error } = await stripe.confirmSetup({
        elements,
        confirmParams: {
          return_url:
            reqAction === "additional_paymentMethod_event" ? "" : redirectURL,
        },
        redirect: "if_required",
      });

      if (error) {
        settingDispatch({ type: "SET_ISLOADING_ENDS" });
        notify({
          notificationText: error?.message as string,
          notificationState: true,
        });
        return;
      } else {
        settingDispatch({ type: "SET_ISLOADING_ENDS" });
        if (reqAction === "additional_paymentMethod_event") {
          notify({
            notificationText:
              "Thank you for your payment, we will send you an email regarding the status of your payment",
            notificationState: true,
            isRevalidate: true,
            isRevaliddateURL: ["customer/subscription/details", "usersession"],
          });
          if (customFunction && typeof customFunction === "function") {
            customFunction();
          }
          return;
        }
        window.location.href = redirectURL;
        return;
      }
    } catch (error) {
      settingDispatch({ type: "SET_ISLOADING_ENDS" });
      notify({
        notificationText:
          `Payment processing error, refresh the page or contact support` as string,
        notificationState: true,
      });
    }
  };
  return (
    <form className="w-full bg-white" onSubmit={(e) => handleSubmit(e)}>
      <div className="w-full flex flex-col !mt-5">
        <TextUIComponent
          type="h5"
          text="Card Details"
          className=" flex !pb-7"
        />
        <PaymentElement />
      </div>

      <div className="w-full flex flex-col">
        <TextUIComponent
          type="h5"
          text="Billing Address"
          className=" flex !pb-3 !mt-3"
        />
        <AddressElement options={{ mode: "billing" }} />
      </div>

      <div className="w-full !pb-3 !mt-10 justify-center flex">
        <ButtonUIComponent type="submit" isDisable={!stripe} text="Submit" />
      </div>
    </form>
  );
}
