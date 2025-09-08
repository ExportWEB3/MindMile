import { useEffect, useState } from "react";
import { useCustomQuery, useNotificationHook } from "../../hooks/custom.hook";
import type {
  OnboardingComponentStateAttributes,
  onboardingScreenEventAttributes,
  OnboardingScreenNameAttributes,
} from "../../utilities/types.declarationts";
import { ButtonUIComponent } from "../../utilities/UI/button.ui";
import { LayoutComponent } from "../layouts/layout.general";
import { NotFoundComponent } from "../Notfound.component";
import { PaymentConfirmationScreenomponent } from "./payment.confirmation.screen";
import { ChoosePaymentMethodScreenComponent } from "./payment.screen/payment.screen";
import { ChoosePlanScreenComponent } from "./account.setup";
import { Steps } from "./steps";
import { ThankYouScreenComponent } from "./first.task.screen";
import { WelcomeScreenComponent } from "./welcome.screen";
import { useNavigate } from "react-router-dom";

export function OnboardingScreenIndexComponent() {
  const { getQueryValue, generateQuery } = useCustomQuery();
  const { notify } = useNotificationHook();
  const navigate = useNavigate();
  const getScreenName = getQueryValue(
    "screenname"
  ) as OnboardingScreenNameAttributes;
  const userId = getQueryValue("userid") as string;

  const [onboardingComponentState, setOnboardingComponentState] =
    useState<OnboardingComponentStateAttributes>({
      selectedPlanId: "",
      billingCycle: "monthly",
      userId: userId,
      paymentProvider: "",
      tierPlan: undefined,
      eventType: "add_payment_registeration_event",
    });

  const handleScreenNavigation = (data: {
    eventName: onboardingScreenEventAttributes;
  }) => {
    const { eventName } = data;

    if (!eventName) return;

    let selectedScreenName: OnboardingScreenNameAttributes = "welcome";
    switch (getScreenName) {
      case "welcome":
        selectedScreenName = eventName === "goback" ? "welcome" : "plans";
        break;
      case "plans":
        selectedScreenName = eventName === "goback" ? "welcome" : "confirm";
        break;
      case "payment":
        selectedScreenName = eventName === "goback" ? "confirm" : "thankyou";
        break;
      case "confirm":
        selectedScreenName = eventName === "goback" ? "plans" : "payment";
        break;
      case "thankyou":
        selectedScreenName = eventName === "goback" ? "thankyou" : "thankyou";
        break;
      default:
        notify({ notificationText: "Wrong screen name detected" });
    }
    if (!userId) {
      return notify({
        notificationText:
          "Required id not provided, go back to registeration page",
        notificationState: true,
      });
    }
    if (
      (getScreenName === "payment" ||
        getScreenName === "confirm" ||
        getScreenName === "plans") &&
      eventName !== "goback" &&
      !onboardingComponentState?.selectedPlanId?.trim()
    ) {
      notify({
        notificationText:
          "You need to select one Subscription plan before you proceed",
      });
      return;
    }

    if (
      getScreenName === "payment" &&
      eventName !== "goback" &&
      !onboardingComponentState?.paymentProvider
    ) {
      notify({
        notificationText:
          "You need to select one Payment Method before you proceed",
      });
      return;
    }
    return generateQuery({
      path: `/onboarding`,
      query: { screenname: selectedScreenName, userid: userId },
    });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [getScreenName]);

  return (
    <LayoutComponent>
      <div className="w-full flex flex-col">
        <Steps />
        {getScreenName === "welcome" ? (
          <WelcomeScreenComponent />
        ) : getScreenName === "plans" ? (
          <ChoosePlanScreenComponent
            onboardingComponentState={onboardingComponentState}
            setOnboardingComponentState={setOnboardingComponentState}
          />
        ) : getScreenName === "payment" ? (
          <ChoosePaymentMethodScreenComponent
            onboardingComponentState={onboardingComponentState}
            setOnboardingComponentState={setOnboardingComponentState}
          />
        ) : getScreenName === "confirm" ? (
          <PaymentConfirmationScreenomponent
            onboardingComponentState={onboardingComponentState}
            setOnboardingComponentState={setOnboardingComponentState}
          />
        ) : getScreenName === "thankyou" ? (
          <ThankYouScreenComponent />
        ) : (
          <NotFoundComponent />
        )}

        <div className="w-full flex justify-center items-center">
          <span
            className={`w-full flex justify-center ${
              getScreenName === "thankyou" && "hidden"
            }`}
          >
            <ButtonUIComponent
              isBorder={true}
              className="w-44"
              onClick={() => handleScreenNavigation({ eventName: "goback" })}
              text="Back"
            />
            <ButtonUIComponent
              className={`w-44 !ml-5 ${
                getScreenName === "payment" && "hidden"
              }`}
              onClick={() => handleScreenNavigation({ eventName: "goforward" })}
              text="Next"
            />
          </span>

          <ButtonUIComponent
            className={`w-44 ${getScreenName !== "thankyou" && "hidden"}`}
            onClick={() => navigate(`/user/dashboard`)}
            text="Dashboard"
          />
        </div>
      </div>
    </LayoutComponent>
  );
}
