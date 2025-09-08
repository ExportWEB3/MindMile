import type { onboardingSubComponentsAttributes } from "../../utilities/types.declarationts";
import { ChoosePlanScreenComponent } from "../onbaording/account.setup";

export function InAppCheckOutPlans(props: onboardingSubComponentsAttributes) {
  const { onboardingComponentState, setOnboardingComponentState } = props;

  return (
    <section className="w-full flex flex-col">
      <ChoosePlanScreenComponent
        onboardingComponentState={onboardingComponentState}
        setOnboardingComponentState={setOnboardingComponentState}
      />
    </section>
  );
}
