import { ButtonUIComponent } from "../../../utilities/UI/button.ui";
import { IconUIComponent } from "../../../utilities/UI/icon.ui";
import OptimizedImage from "../../../utilities/UI/image.ui";
import {
  TextUIComponent,
  TitleUIComponent,
} from "../../../utilities/UI/texts.ui";

import paypalImg from "../../../assets/logos_paypal.png";
import creditCardImg from "../../../assets/noto_credit-card.png";
import type {
  onboardingSubComponentsAttributes,
  paymentInitializationAttributes,
  paymentProviderAttributes,
  reqActionPaymentAttributes,
  stripeCustomFunctionParamsAttributes,
  stripePaymentFlowBackendResponseAttributes,
} from "../../../utilities/types.declarationts";
import {
  displayCurrency,
  formatToTitleCase,
  invalidateSWRKeys,
} from "../../../utilities/helper.function";
import {
  useCustomQuery,
  useHttpFetcher,
  useNotificationHook,
} from "../../../hooks/custom.hook";
import { useContext, useState } from "react";
import { UserContext } from "../../../contexts/user/user.context";
import { StripeCardIndexComponent } from "../../paymentprovider/stripe/stripecardindex.component";
import { PaymentProviderContext } from "../../../contexts/paymentprovider/paymentprovider.context";
import { OnboardingWrapper } from "../wrapper.onboarding";

export function ChoosePaymentMethodScreenComponent(
  props: onboardingSubComponentsAttributes
) {
  const { getQueryValue, generateQuery } = useCustomQuery();
  const { setOnboardingComponentState, onboardingComponentState, customFunc } =
    props;
  const { paymentProviderDispatch } = useContext(PaymentProviderContext);
  const [componentState, setComponentState] = useState<{
    paymentResponse: stripePaymentFlowBackendResponseAttributes;
    reqAction: reqActionPaymentAttributes;
  }>({
    paymentResponse: { paymentMethod: [], clientSecret: "", userId: "" },
    reqAction: "",
  });
  const { fetchIt } = useHttpFetcher();
  const { userState } = useContext(UserContext);
  const { notify } = useNotificationHook();
  const selectedPlan = onboardingComponentState?.tierPlan;
  const userId = getQueryValue("userid") as string;

  const handlePaymentMethodSelect = async (params: {
    method: paymentProviderAttributes;
  }) => {
    const isLoggedInUser =
      onboardingComponentState?.eventType !==
        "add_payment_registeration_event" && userState?.user?._id
        ? true
        : false;

    if (!onboardingComponentState?.selectedPlanId) {
      return notify({
        notificationText:
          "Please select a subscription plan before choosing a payment method.",
      });
    }
    const getUserId =
      onboardingComponentState?.eventType === "add_payment_registeration_event"
        ? userId
        : userState?.user?._id;
    if (!getUserId) {
      notify({
        notificationText:
          "Required User Id not provided, refresh or contact Support",
      });
      return;
    }
    if (
      !params?.method ||
      (params?.method !== "paypal" && params?.method !== "stripe")
    ) {
      return notify({
        notificationText: "Please select a payment method.",
      });
    }
    setOnboardingComponentState((prev) => ({
      ...prev,
      paymentProvider: params?.method,
    }));
    const reqData: paymentInitializationAttributes = {
      paymentProvider: params?.method,
      tierPlanId: onboardingComponentState?.selectedPlanId,
      billingCycle: onboardingComponentState?.billingCycle,
      isLoggedInUser: isLoggedInUser,
    };
    try {
      const res = await fetchIt({
        apiEndPoint: `payment/init/${getUserId}`,
        reqData,
        httpMethod: "post",
        isSuccessNotification: {
          notificationText: "",
          notificationState: false,
        },
      });
      const payloadRes =
        res?.payload as stripePaymentFlowBackendResponseAttributes;

      if (payloadRes?.clientSecret) {
        paymentProviderDispatch({
          type: "SET_STRIPE_CLIENT_SECRET",
          payload: payloadRes?.clientSecret as string,
        });
      }
      setComponentState({
        paymentResponse: payloadRes,
        reqAction: "",
      });
    } catch (error) {
      return;
    }
  };

  const handleChangePlanNav = () => {
    const eventOnboard = onboardingComponentState?.eventType;

    if (eventOnboard === "add_payment_registeration_event") {
      return generateQuery({
        path: `/onboarding`,
        query: { screenname: "plan", userid: userId },
      });
    } else if (eventOnboard === "add_payment_inApp_event") {
      return generateQuery({
        path: `/dashboard/user`,
        query: { page: "1" },
      });
    }
  };

  const handlePaymentWithExistingCard = async (
    params: stripeCustomFunctionParamsAttributes
  ) => {
    const { pmId, event } = params;

    if (!pmId && event !== "add_new_card") {
      return notify({
        notificationText: "No card selected, select a card",
        notificationState: true,
      });
    }
    if (!userState?.user?._id) {
      return notify({
        notificationText:
          "You need to login to be able to pay with your existing card",
        notificationState: true,
      });
    }
    const userId = String(userState?.user?._id);
    if (onboardingComponentState?.paymentProvider === "stripe") {
      const reqData: paymentInitializationAttributes = {
        paymentProvider: "stripe",
        tierPlanId: onboardingComponentState?.selectedPlanId,
        billingCycle: onboardingComponentState?.billingCycle,
        isLoggedInUser: true,
        paymentMethodId: pmId,
        eventType: "add_payment_inApp_event",
        reqAction:
          event === "add_new_card" ? "additional_paymentMethod_event" : "",
      };

      try {
        const res = await fetchIt({
          apiEndPoint: `payment/init/${userId}`,
          reqData,
          httpMethod: "post",
          isSuccessNotification: {
            notificationText: "",
            notificationState: false,
          },
        });
        if (res?.statusCode === 200) {
          if (event === "add_new_card") {
            const payloadRes =
              res?.payload as stripePaymentFlowBackendResponseAttributes;
            if (payloadRes?.clientSecret) {
              paymentProviderDispatch({
                type: "SET_STRIPE_CLIENT_SECRET",
                payload: payloadRes?.clientSecret as string,
              });
            }
            setComponentState({
              paymentResponse: payloadRes,
              reqAction: "additional_paymentMethod_event",
            });
          } else {
            if (customFunc && typeof customFunc === "function") customFunc();

            notify({
              notificationText:
                "Thank you for submitting your payment, we will send you email regarding the status of your payment",
              notificationState: true,
              isRevalidate: true,
              isRevaliddateURL: [`/usersession`],
            });
            invalidateSWRKeys(["customer/subscription/details"]);
          }
        }

        return;
      } catch (error) {
        return;
      }
    }
  };

  return (
    <OnboardingWrapper
      onboardingComponentState={onboardingComponentState}
      setOnboardingComponentState={setOnboardingComponentState}
    >
      <section className="w-full flex flex-col">
        <div className="w-full flex flex-col items-center">
          <TitleUIComponent
            text="Choose Your MIT Travel Subscription"
            type="h2"
            className="text-center"
          />
          <TextUIComponent
            type="h4"
            text="Step 3 of 4: Payment Information"
            className={`!mt-2 ${
              onboardingComponentState?.eventType !==
                "add_payment_registeration_event" && "hidden"
            }`}
          />
        </div>

        <div className="w-full h-36 md:h-24 !py-2 relative gap-2 border-[1px] border-gray-300 !px-6 sm:!px-10 md:!px-12 !bg-white !mt-5 rounded-lg flex items-center justify-between flex-col md:flex-row">
          <div className="w-auto flex flex-col !pb-1 justify-center items-center md:items-start">
            <TextUIComponent
              type="h4"
              text={`Selected Plan: ${
                formatToTitleCase(selectedPlan?.name as string) ||
                "None Selected"
              }`}
            />
            <TextUIComponent
              type="h3"
              text={displayCurrency(selectedPlan?.monthlyFee as string)}
              className="!mt-1 !text-primary"
            />
          </div>

          <ButtonUIComponent
            onClick={handleChangePlanNav}
            type="button"
            text="Change Plan"
            isBorder={true}
            className="bg-white border-primary text-primary w-full md:w-48"
          />
        </div>

        <div className="w-full min-h-[700px] !py-2 bg-white border-[1px] border-gray-300 !mt-10 !mb-20 !px-4 max-[640px]:!px-1 sm:!px-1 md:!px-6 rounded-lg">
          {/* Payment method selection */}
          <TitleUIComponent
            type="h6"
            text=" Select A payment Method"
            className="text-center"
          />
          <div
            className="
                w-full h-28 sm:h-24 bg-gray-100 max-[640px]:!mt-5 !mt-5 flex flex-col sm:flex-row gap-4 sm:gap-12
                !px-4 sm:!px-5 !py-4 rounded-xl
                transition-colors duration-300
              "
          >
            {/* Credit Card */}
            <span
              onClick={() => handlePaymentMethodSelect({ method: "stripe" })}
              className={`
                  w-full sm:w-[48%] gap-2 h-12 sm:h-full flex items-center justify-center  rounded-xl cursor-pointer
                  transition-colors duration-300
                  ${
                    onboardingComponentState?.paymentProvider === "stripe"
                      ? "bg-gray-100 shadow-md border-2 border-primary"
                      : "bg-white hover:bg-gray-50 border-[1px] border-gray-300"
                  }
                `}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setOnboardingComponentState((prev) => ({
                    ...prev,
                    paymentProvider: "stripe",
                  }));
                }
              }}
            >
              {onboardingComponentState?.paymentProvider === "stripe" && (
                <IconUIComponent
                  icon="ri-checkbox-circle-fill"
                  className="text-primary text-xl"
                />
              )}

              <TextUIComponent type="p" text="Credit/Debit Card" />
              <div
                className={`h-[24px] w-[4px] rounded-md mx-2
                    ${
                      onboardingComponentState?.paymentProvider === "stripe"
                        ? "bg-black"
                        : "bg-transparent"
                    }`}
              />
              <OptimizedImage
                imageData={creditCardImg}
                alt="MIT+ creditcard"
                className="w-[25px]"
              />
            </span>
            {/* Paypal */}
            <span
              onClick={() => () =>
                handlePaymentMethodSelect({ method: "paypal" })}
              className={`
                  w-full sm:w-[48%] gap-4 h-12 sm:h-full flex items-center justify-center border-[1px] border-gray-300 rounded-xl cursor-pointer
                  transition-colors duration-300
                  ${
                    onboardingComponentState?.paymentProvider === "paypal"
                      ? " shadow-md bg-primary"
                      : "bg-white hover:bg-gray-50"
                  }
                `}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setOnboardingComponentState((prev) => ({
                    ...prev,
                    paymentProvider: "paypal",
                  }));
                }
              }}
            >
              {onboardingComponentState?.paymentProvider === "paypal" && (
                <IconUIComponent
                  icon="ri-checkbox-circle-fill"
                  className="text-primary text-xl mr-2"
                />
              )}

              <TextUIComponent type="p" text="Paypal" />
              <div
                className={`h-[24px] w-[4px] rounded-md mx-2
                    ${
                      onboardingComponentState?.paymentProvider === "paypal"
                        ? "bg-black"
                        : "bg-transparent"
                    }`}
              />
              <OptimizedImage
                imageData={paypalImg}
                alt="MIT+ Paypal"
                className="w-[17px]"
              />
            </span>
          </div>

          <div className="!mt-10 !px-2 sm:!px-0">
            {onboardingComponentState?.paymentProvider === "stripe" ? (
              <StripeCardIndexComponent
                isCardInput={
                  Array.isArray(
                    componentState?.paymentResponse?.paymentMethod
                  ) &&
                  componentState?.paymentResponse?.paymentMethod?.length > 0
                    ? false
                    : true
                }
                paymentMethods={componentState?.paymentResponse?.paymentMethod}
                stripeClientSecret={
                  componentState?.paymentResponse?.clientSecret
                }
                stripeObjects={{
                  userId: userId,
                  eventType: "add_payment_registeration_event",
                  userSubscriptionId: onboardingComponentState?.selectedPlanId,
                  reqAction: componentState?.reqAction,
                  customFunction: customFunc,
                }}
                isManageProfile={false}
                customFunction={(data: stripeCustomFunctionParamsAttributes) =>
                  handlePaymentWithExistingCard({
                    pmId: data?.pmId,
                    event: data?.event,
                  })
                }
              />
            ) : onboardingComponentState?.paymentProvider === "paypal" ? (
              <div className="w-full h-[400px] max-[640px]:!mt-[120px] flex items-center justify-center text-gray-500 border border-dashed border-gray-400 rounded-lg px-4 sm:px-8">
                <TextUIComponent
                  type="p"
                  text="Paypal payment coming soon..."
                  className="text-lg font-medium text-center"
                />
              </div>
            ) : (
              <div className="flex w-full justify-center h-full items-center">
                <TitleUIComponent
                  className="text-center !text-gray-400"
                  type="h6"
                  text="You have not selected a Payment Method, click Credit/Debit Card or PayPal "
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </OnboardingWrapper>
  );
}
