import type {
  LayoutComponentProps,
  onboardingSubComponentsAttributes,
} from "../../utilities/types.declarationts";
import { LayoutComponent } from "../layouts/layout.general";

export function OnboardingWrapper(
  props: onboardingSubComponentsAttributes & LayoutComponentProps
) {
  const { onboardingComponentState, children } = props;
  return (
    <LayoutComponent
      className={`${
        onboardingComponentState?.eventType !==
          "add_payment_registeration_event" && "!mt-0"
      }`}
      parentDivClassName={`${
        onboardingComponentState?.eventType !==
          "add_payment_registeration_event" && "!px-1"
      }`}
    >
      {children}
    </LayoutComponent>
  );
}
