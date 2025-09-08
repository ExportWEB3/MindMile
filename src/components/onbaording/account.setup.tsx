import { TextUIComponent, TitleUIComponent } from "../../utilities/UI/texts.ui";
import { IconUIComponent } from "../../utilities/UI/icon.ui";

import type {
  billingCircleAttributes,
  customInputOnchangeDataAttributes,
  onboardingSubComponentsAttributes,
  Tier,
} from "../../utilities/types.declarationts";
import { ComponetDataDisplayer } from "../../utilities/UI/data.display.ui";
import {
  calculateCurrency,
  displayCurrency,
  displayNumber,
  formatToTitleCase,
} from "../../utilities/helper.function";
import { InputUIComponent } from "../../utilities/UI/input.ui";
import { useSWRHook } from "../../hooks/custom.hook";
import { useContext, useEffect, useMemo } from "react";
import { UserContext } from "../../contexts/user/user.context";
import { OnboardingWrapper } from "./wrapper.onboarding";

export function ChoosePlanScreenComponent(
  props: onboardingSubComponentsAttributes
) {
  const { fetchData, fetchIsLoading } = useSWRHook({
    apiEndPoint: `tierplans`,
    cacheKey: "tierplans",
  });
  const tierPlans = useMemo(() => {
    return (fetchData?.payload as Tier[]) || [];
  }, [fetchData?.payload]);

  const { userState } = useContext(UserContext);
  const { onboardingComponentState, setOnboardingComponentState } = props;

  const handleSelection = (params: {
    data: customInputOnchangeDataAttributes;
    plan: Tier;
  }) => {
    const { data, plan } = params;
    if (!data?.name) return;
    setOnboardingComponentState((prev) => ({
      ...prev,
      selectedPlanId: data?.name as string,
      tierPlan: plan,
    }));
  };

  useEffect(() => {
    if (!userState?.user?._id) return;

    setOnboardingComponentState((prev) => {
      // don’t override if user already selected something locally
      if (prev.selectedPlanId) return prev;

      const selectedPlanId =
        userState?.user?.subscriptionPlan?.subscriptionPlanId;

      const findPlan = selectedPlanId
        ? tierPlans?.find(
            (plan) => plan?._id?.toString() === selectedPlanId?.trim()
          )
        : undefined;

      return {
        ...prev,
        userId: String(userState?.user?._id || ""),
        tierPlan: findPlan,
        selectedPlanId: selectedPlanId ? String(selectedPlanId) : "",
        billingCycle: userState?.user?.subscriptionPlan
          ?.billingCycle as billingCircleAttributes,
      };
    });
  }, [userState?.user?._id, tierPlans]);

  return (
    <OnboardingWrapper
      onboardingComponentState={onboardingComponentState}
      setOnboardingComponentState={setOnboardingComponentState}
    >
      <section className="w-full flex flex-col ">
        <ComponetDataDisplayer
          loading={fetchIsLoading}
          error={
            !Array.isArray(tierPlans) || tierPlans?.length < 1
              ? "No Subscription plan available at the moment"
              : ""
          }
        >
          <div className="w-full flex flex-col items-center">
            <TitleUIComponent
              text="Choose Your Subscription Plan"
              type="h2"
              className={`text-center ${
                onboardingComponentState?.eventType !==
                "add_payment_registeration_event"
                  ? "!mt-0"
                  : "!mt-5"
              }`}
            />

            <TextUIComponent
              type="h5"
              text="Step 2 of 4: Select the plan that best fits your travel needs"
              className={`!mt-5 ${
                onboardingComponentState?.eventType !==
                  "add_payment_registeration_event" && "hidden"
              }`}
            />
            {/* Container */}
            <div
              className={`flex flex-col !mt-10 gap-4 !relative w-full min-h-[820px] h-auto overflow-hidden  rounded-[10px] border border-dark-light-38 !px-3  !py-4 sm:!py-6 md:!py-8 !mb-20`}
            >
              {tierPlans?.map((plan) => (
                <div
                  key={plan._id}
                  className={`border ${
                    String(plan?._id)?.trim() ===
                    String(onboardingComponentState?.selectedPlanId)?.trim()
                      ? "border-primary shadow-lg border-2"
                      : "border-gray-300"
                  }  w-full flex gap-3 flex-col sm:flex-row rounded-lg !p-4 sm:!p-5 md:!p-6 shadow-sm h-auto sm:h-[200px] cursor-pointer `}
                >
                  {/* Static Icon */}
                  <div className="flex items-center gap-2 ">
                    <InputUIComponent
                      isCheckedState={true}
                      checked={
                        onboardingComponentState?.selectedPlanId?.trim() ===
                        String(plan?._id)?.trim()
                      }
                      name={plan?._id as string}
                      onChange={(data: customInputOnchangeDataAttributes) =>
                        handleSelection({ data: data, plan })
                      }
                      type="radio"
                      className="border-none outline-none shadow-none"
                    />

                    <span className="rounded-full !py-1 !px-4  sm:hidden !h-8 sm:h-full flex items-center justify-center bg-gray-200">
                      <TextUIComponent
                        type="h6"
                        text={formatToTitleCase(plan?.name)}
                      />
                    </span>
                  </div>

                  {/* Left Column */}
                  <div className="w-full sm:w-[65%] h-full    flex flex-col !pt-3 sm:!pt-4 md:!pt-5">
                    <div className="w-full hidden h-auto sm:h-9 bg-white sm:flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 md:gap-10">
                      <span className="rounded-full w-32 sm:w-36 md:w-40 !h-8 sm:h-full flex items-center justify-center bg-gray-200">
                        <TextUIComponent
                          type="h6"
                          text={formatToTitleCase(plan?.name)}
                        />
                      </span>
                    </div>

                    <TextUIComponent
                      type="h5"
                      text={`${displayCurrency(plan?.monthlyFee)}/month `}
                      className="font-bold !mt-3 sm:!mt-4"
                    />
                    <TextUIComponent
                      type="h6"
                      text={`Earn ${displayNumber(
                        plan.pointsPerMonth
                      )} points monthly (equivalent to ${displayCurrency(
                        plan?.monthlyFee
                      )})`}
                      className="!mt-3 sm:!mt-5 text-gray-600"
                    />
                  </div>

                  {/* Right Column */}
                  <div className="w-full sm:w-[30%] border-t sm:border-t-0 sm:border-l border-gray-300 h-auto sm:h-full flex flex-col justify-center !pl-0 sm:!pl-8 md:!pl-[60px] gap-2 sm:gap-3 !mt-4 !pt-2 sm:!pt-0 sm:!mt-0">
                    <TextUIComponent type="h6" text="Points earned per year" />
                    <TextUIComponent
                      type="h3"
                      text={`${displayNumber(
                        calculateCurrency(plan?.pointsPerMonth, "multiply", 12)
                      )}`}
                    />
                    <TextUIComponent
                      type="p"
                      text={`36-month expiration`}
                      className="text-gray-500"
                    />
                  </div>
                </div>
              ))}

              {/* Automatic Billing Notice */}
              <div
                className={`w-full flex flex-col sm:flex-row items-center justify-between`}
              >
                <div className="w-full sm:w-[70%] md:w-[50%] lg:w-[40%] max-[650px]:left-0 max-[650px]:gap-1 h-auto flex gap-2  !overflow-hidden left-4 sm:left-10 lg:left-20 bottom-4 sm:bottom-5">
                  <span>
                    <IconUIComponent
                      icon="ri-error-warning-line"
                      className="text-lg sm:text-xl !text-primary-30"
                    />
                  </span>
                  <span className="flex flex-col">
                    <TextUIComponent
                      className="!text-primary-30"
                      type="h6"
                      text="Automatic Billing Notice"
                    />
                    <TextUIComponent
                      type="h6"
                      className="!text-primary-30"
                      text={`Your subscription will be automatically renewed each month. You’ll receive email reminders for failed or missed payments.`}
                    />
                  </span>
                </div>
                <div className="w-full sm:w-[65%] !mt-5 sm:!mt-0 md:w-[50%] lg:w-[45%] max-[640px]:!right-0 max-[350px]:bottom-19 h-auto flex items-center gap-2 rounded-xl !px-2 bg-gray-300  right-4 sm:right-10 lg:right-20 bottom-24 sm:bottom-26 !py-2 sm:!py-0">
                  <IconUIComponent
                    icon="ri-arrow-up-down-line"
                    className="text-[20px] sm:text-[25px] !text-black"
                  />
                  <TextUIComponent
                    className="!p-2 !text-xs"
                    type="h6"
                    text="You can upgrade or downgrade your plan at anytime from your account settings"
                  />
                </div>
              </div>
            </div>
          </div>
        </ComponetDataDisplayer>
      </section>
    </OnboardingWrapper>
  );
}
