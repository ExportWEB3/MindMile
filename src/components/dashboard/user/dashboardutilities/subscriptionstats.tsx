import { useCustomQuery } from "../../../../hooks/custom.hook";
import {
  convertDate,
  displayCurrency,
  formatToTitleCase,
  isValidDate,
} from "../../../../utilities/helper.function";
import type {
  customerSubscriptionDetailsAttributes,
  userDashboardChildrenPropsAttributes,
} from "../../../../utilities/types.declarationts";
import { ButtonUIComponent } from "../../../../utilities/UI/button.ui";
import {
  TextUIComponent,
  TitleUIComponent,
} from "../../../../utilities/UI/texts.ui";

export function UserDashboardStats(props: {
  customerData: customerSubscriptionDetailsAttributes;
  stateProps: userDashboardChildrenPropsAttributes;
}) {
  const {
    customerData,
    stateProps: { setUserDashboardState },
  } = props;
  const { generateQuery } = useCustomQuery();

  const handleNavigation = () => {
    generateQuery({
      path: `/dashboard/user`,
      query: { page: "1" },
    });
    setUserDashboardState((prev) => ({ ...prev, modalState: true }));
  };

  return (
    <div className="w-full h-[130px] flex gap-5 !mt-10 max-[880px]:flex-col max-[880px]:h-[400px] max-[880px]:gap-2 max-[460px]:h-[350px]">
      {/* Subscription Status Cards */}

      <div className="w-[20%] h-full flex flex-col items-center justify-center !p-5 !space-y-3 border border-gray-300 rounded-xl max-[880px]:w-full max-[880px]:!py-3">
        <TextUIComponent
          type="h5"
          text={formatToTitleCase(customerData?.subscriptionPlanName)}
          className="!text-primary"
        />
        <TextUIComponent
          type="h5"
          text={displayCurrency(customerData?.subscriptionPrice)}
          className="!text-primay-very-dark"
        />
        <TextUIComponent
          type="h5"
          text={formatToTitleCase(customerData?.subscriptionStatus)}
          className="!text-primay-very-dark"
        />
      </div>

      {/* Next Billing Date */}
      <div className="w-[30%] h-full flex flex-col items-center justify-center !p-5 !space-y-3 border border-gray-300 rounded-xl max-[880px]:w-full max-[769px]:!py-3">
        <TextUIComponent
          type="h5"
          text="Next billing date:"
          className="!text-primay-very-dark"
        />
        <TitleUIComponent
          type="h6"
          text={
            isValidDate(customerData?.nextBillingDate)
              ? convertDate({
                  date: customerData?.nextBillingDate,
                  isFortmat: true,
                })
              : "N/A"
          }
          className="!text-primay-very-dark"
        />
        <div className="w-full h-7 bg-gray-300 rounded-full">
          <div className="h-full w-[40%] bg-primary rounded-full" />
        </div>
      </div>

      {/* Change Subscription */}
      <div className="w-[50%] h-full !p-5 max-[350px]:!p-2 border border-gray-300 rounded-xl max-[880px]:w-full">
        <TextUIComponent
          type="h5"
          text="Change Subscription:"
          className="!text-primay-very-dark"
        />
        <div className="w-full h-10 flex gap-3 !mt-5 max-[515px]:gap-[2px] max-[515px]:grid max-[515px]:grid-cols-3">
          <ButtonUIComponent
            onClick={handleNavigation}
            type="button"
            text="Downgrade"
            className="bg-primary-dark h-10 rounded-[11px] w-full"
          />
          <ButtonUIComponent
            onClick={handleNavigation}
            type="button"
            text="Upgrade"
            className="bg-primary h-10 rounded-[11px] w-full"
          />
          <ButtonUIComponent
            type="button"
            text="Cancel"
            className="bg-secondary-red h-10 rounded-[11px] w-full"
          />
        </div>
      </div>
    </div>
  );
}
