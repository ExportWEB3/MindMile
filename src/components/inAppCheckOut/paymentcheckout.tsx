import type { onboardingSubComponentsAttributes } from "../../utilities/types.declarationts";
import { ChoosePaymentMethodScreenComponent } from "../onbaording/payment.screen/payment.screen";

export function PaymentInAppCheckOutComponent(
  props: onboardingSubComponentsAttributes
) {
  const { onboardingComponentState, setOnboardingComponentState, customFunc } =
    props;

  return (
    <section className="w-full flex flex-col">
      <ChoosePaymentMethodScreenComponent
        onboardingComponentState={onboardingComponentState}
        setOnboardingComponentState={setOnboardingComponentState}
        customFunc={customFunc}
      />
    </section>
  );
}
