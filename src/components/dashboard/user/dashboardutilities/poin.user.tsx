import {
  convertDate,
  displayCurrency,
  displayNumber,
  isValidDate,
} from "../../../../utilities/helper.function";
import type { customerSubscriptionDetailsAttributes } from "../../../../utilities/types.declarationts";
import {
  TextUIComponent,
  TitleUIComponent,
} from "../../../../utilities/UI/texts.ui";

export function UserPointSummaryDashboard(props: {
  customerData: customerSubscriptionDetailsAttributes;
}) {
  const { customerData: customerDetails } = props;
  return (
    <div className="w-[50%] h-full border border-gray-300 rounded-xl max-[820px]:w-full">
      {/* Header */}
      <div className="w-full h-16 flex items-center rounded-t-xl bg-primary-23 !px-5">
        <TitleUIComponent
          type="h4"
          text="Points Summary"
          className="!text-primay-very-dark"
        />
      </div>

      {/* Body */}
      <div
        className="flex flex-row items-center justify-between h-[160px] !px-5 
                  max-md:flex-col !py-5 max-md:h-auto max-md:items-start max-md:gap-4"
      >
        {/* Left Section */}
        <div className="flex flex-row items-center gap-6 w-full md:w-auto max-md:flex-col max-md:items-start">
          {/* Circle */}
          <div
            className="w-[120px] h-[120px] flex flex-col items-center justify-center rounded-full bg-primary text-white 
                      max-sm:w-[90px] max-sm:h-[90px]"
          >
            <TitleUIComponent
              type="h3"
              text={displayNumber(customerDetails?.totalPoints)}
              className="!text-primary-white"
            />
            <TextUIComponent
              type="p"
              text="Total Points"
              className="!text-primary-white text-xs max-sm:text-[10px]"
            />
          </div>

          {/* Info */}
          <div
            className="!pl-7 space-y-2 border-l border-gray-700 
                      max-md:border-l-0 max-md:border-t max-md:!pt-3 max-md:w-full"
          >
            <TextUIComponent
              type="p"
              text={`Points Value: ${displayCurrency(
                customerDetails?.totalPointMoneyValue
              )}`}
              className="!text-primay-very-dark text-sm"
            />

            <TextUIComponent
              type="p"
              text={`Last Points Earned: ${displayNumber(
                customerDetails?.lastPointEarned
              )} pts `}
              className="!text-primay-very-dark text-sm"
            />

            <TextUIComponent
              type="p"
              text={`Date Earned: ${
                isValidDate(customerDetails?.lastPointEarnedDate)
                  ? convertDate({
                      date: customerDetails?.lastPointEarnedDate,
                      isFortmat: true,
                    })
                  : "N/A"
              }`}
              className="text-sm"
            />
          </div>
        </div>

        {/* Right Section: View More Button */}
        <span
          className="!p-3 bg-primary-23 rounded-[15px] cursor-pointer 
                     max-md:mt-4 max-md:self-end "
        >
          <TitleUIComponent
            type="h6"
            text="View More"
            className="text-center"
          />
        </span>
      </div>
    </div>
  );
}
