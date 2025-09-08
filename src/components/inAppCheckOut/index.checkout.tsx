import { useContext, useState } from "react";
import { NonBTNModalUIComponent } from "../../utilities/UI/modal.ui";
import type { OnboardingComponentStateAttributes } from "../../utilities/types.declarationts";
import { useCustomQuery } from "../../hooks/custom.hook";
import { ChoosePlanScreenComponent } from "../onbaording/account.setup";
import { ButtonUIComponent } from "../../utilities/UI/button.ui";
import { ConfirmationCheckOutComponent } from "./confirmation.chechout";
import { PaymentInAppCheckOutComponent } from "./paymentcheckout";
import { settingContext } from "../../contexts/settings/settings.context";

export function InAppChechoutIndexComponent(props: {
  modalState: boolean;
  closeModal: () => void;
}) {
  const { modalState, closeModal } = props;
  const { settingsState } = useContext(settingContext);

  const { getQueryValue, generateQuery } = useCustomQuery();

  const getPageIndex = getQueryValue("page");

  const [onboardingComponentState, setOnboardingComponentState] =
    useState<OnboardingComponentStateAttributes>({
      selectedPlanId: "",
      billingCycle: "monthly",
      userId: "",
      paymentProvider: "",
      tierPlan: undefined,
      eventType: "add_payment_inApp_event",
    });

  const handleCloseModal = () => {
    if (!closeModal) return;
    setOnboardingComponentState({
      selectedPlanId: "",
      billingCycle: "monthly",
      userId: "",
      paymentProvider: "",
      tierPlan: undefined,
      eventType: "add_payment_inApp_event",
    });
    closeModal();
  };

  const handleNavigation = (event: "goback" | "next") => {
    if (!getPageIndex) return;

    const pagNum = Number(getPageIndex);

    // Protect against NaN or non-integers
    if (Number.isNaN(pagNum) || !Number.isInteger(pagNum)) return;

    // Boundaries (assuming 1..3 is your range)
    if (
      (pagNum === 1 && event === "goback") ||
      (pagNum === 3 && event === "next")
    ) {
      return;
    }

    const newPage = event === "next" ? pagNum + 1 : pagNum - 1;

    // Protect against going below 1
    if (newPage < 1) return;

    generateQuery({
      path: "/dashboard/user",
      query: {
        page: String(newPage),
      },
    });
  };

  return (
    <NonBTNModalUIComponent
      modalText={``}
      modalState={modalState}
      disableOutSideBoxClose={false}
      closeModalCustomFunc={handleCloseModal}
      className="h-screen"
    >
      <div className="w-full flex-col">
        {getPageIndex === "1" ? (
          <ChoosePlanScreenComponent
            onboardingComponentState={onboardingComponentState}
            setOnboardingComponentState={setOnboardingComponentState}
          />
        ) : getPageIndex === "2" ? (
          <ConfirmationCheckOutComponent
            onboardingComponentState={onboardingComponentState}
            setOnboardingComponentState={setOnboardingComponentState}
          />
        ) : getPageIndex === "3" ? (
          <PaymentInAppCheckOutComponent
            onboardingComponentState={onboardingComponentState}
            setOnboardingComponentState={setOnboardingComponentState}
            customFunc={handleCloseModal}
          />
        ) : (
          <div
            className={`${
              settingsState?.isLoading && getPageIndex && "hidden"
            }`}
          >
            loading...
          </div>
        )}
      </div>
      <div
        className={`w-full justify-center gap-4 flex items-center ${
          settingsState?.isLoading ||
          (!onboardingComponentState?.selectedPlanId && "hidden")
        } `}
      >
        <ButtonUIComponent
          onClick={() => handleNavigation("goback")}
          className={`${getPageIndex === "1" && "hidden"} w-32 rounded-[10px]`}
          text="Back"
          isBorder={true}
        />

        <ButtonUIComponent
          onClick={() => handleNavigation("next")}
          text="Next"
          className={`w-32 rounded-[10px] ${getPageIndex === "3" && "hidden"}`}
        />
      </div>
    </NonBTNModalUIComponent>
  );
}
