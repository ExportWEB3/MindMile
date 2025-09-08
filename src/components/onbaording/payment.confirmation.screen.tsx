import {
  displayNumber,
  formatToTitleCase,
  generateAddDate,
} from "../../utilities/helper.function";
import type { onboardingSubComponentsAttributes } from "../../utilities/types.declarationts";
import { TextUIComponent, TitleUIComponent } from "../../utilities/UI/texts.ui";
import { OnboardingWrapper } from "./wrapper.onboarding";

export function PaymentConfirmationScreenomponent(
  props: onboardingSubComponentsAttributes
) {
  const { onboardingComponentState, setOnboardingComponentState } = props;
  const selectedPlan = onboardingComponentState?.tierPlan;

  return (
    <OnboardingWrapper
      onboardingComponentState={onboardingComponentState}
      setOnboardingComponentState={setOnboardingComponentState}
    >
      <div className="w-full flex flex-col items-center">
        {/* Header */}
        <div className="w-full flex flex-col items-center">
          <TitleUIComponent text="Review and Confirm Subscription" type="h2" />
          <TextUIComponent
            type="h5"
            text="Step 4 of 4: Review the terms and confirm your subscription"
            className={`${
              onboardingComponentState?.eventType !==
                "add_payment_registeration_event" && "hidden"
            }`}
          />
        </div>

        {/* Subscription Summary Container */}
        <div className="w-full h-[800px] rounded-lg !px-10 !pt-12 max-[513px]:!px-4 max-[420px]:!p-[5px] !mt-10 bg-white border-[1px] border-gray-300 !mb-20">
          {/* Subscription Summary */}
          <TitleUIComponent
            type="h4"
            text="Your Subscription Summary"
            className="!text-primay-very-dark"
          />

          <div className="w-full !px-5 !py-[22px] !space-y-5 h-[160px] rounded-lg !mt-10 bg-gray-200">
            <TextUIComponent
              type="h5"
              text={`Selected plans: ${formatToTitleCase(
                (selectedPlan?.name as string) || "None Selected"
              )}`}
              className="!text-primay-very-dark"
            />
            <TextUIComponent
              type="h5"
              text={`Monthly Points: ${displayNumber(
                selectedPlan?.pointsPerMonth as string
              )}`}
              className="!text-primay-very-dark"
            />
            <TextUIComponent
              type="h5"
              text={`Next Billing Date: ${generateAddDate({
                actionType: "day",
                dateNum: 30,
              })}`}
              className="!text-primay-very-dark"
            />
          </div>

          {/* Terms and Conditions */}
          <TitleUIComponent
            type="h5"
            text="Terms and Conditions"
            className="!text-primay-very-dark !mt-16"
          />

          <div className="w-full !px-5  !py-7 !mt-7 h-[210px] max-[513px]:h-[280px] max-[420px]:h-[350px] !bg-white border-[1px] border-gray-300 rounded-lg shadow-box-shadowOne">
            <TextUIComponent
              type="p"
              text="MIT Travel Subscription Program Terms and Conditions"
              className="!text-primay-very-dark"
            />

            <ul className="!space-y-5 !mt-5 flex flex-col !text-lg leading-relaxed">
              <li className="!font-light before:content-['•'] before:mr-2">
                ultrices ipsum sit nisi viverra id id fringilla non, odio ex.
                eget hendrerit quis ultrices porta Cras sed efficitur. nisi
              </li>
              <li className="!font-light flex item-start before:content-['•'] gap-2">
                ultrices ipsum sit nisi viverra id id fringilla non, odio ex.
                eget hendrerit quis ultrices porta Cras sed efficitur. nisi
              </li>
              <TextUIComponent
                type="p"
                text="Read Full Terms"
                className={`!text-primary cursor-pointer`}
              />
            </ul>
          </div>

          {/* Agreement Checkbox */}
          <div className="w-full h-10 !mt-3 flex items-center gap-2 ">
            <div className="flex flex-wrap gap-1">
              <TextUIComponent
                className="!text-primary !text-xs"
                type="h6"
                text="By proceeding, you agree to our terms and conditions"
              />
            </div>
          </div>
        </div>
      </div>
    </OnboardingWrapper>
  );
}
