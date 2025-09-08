import type { onboardingSubComponentsAttributes } from "../../utilities/types.declarationts";
import { PaymentConfirmationScreenomponent } from "../onbaording/payment.confirmation.screen";

export function ConfirmationCheckOutComponent(
  props: onboardingSubComponentsAttributes
) {
  const { onboardingComponentState, setOnboardingComponentState } = props;
  return (
    <section className="w-full flex flex-col">
      <PaymentConfirmationScreenomponent
        onboardingComponentState={onboardingComponentState}
        setOnboardingComponentState={setOnboardingComponentState}
      />
    </section>
  );
}
