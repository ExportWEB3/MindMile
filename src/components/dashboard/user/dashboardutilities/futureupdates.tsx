import {
  convertDate,
  displayCurrency,
  formatToTitleCase,
  isValidDate,
} from "../../../../utilities/helper.function";
import type {
  SubcriptionFutureActionAttributes,
  Tier,
} from "../../../../utilities/types.declarationts";
import {
  TextUIComponent,
  TitleUIComponent,
} from "../../../../utilities/UI/texts.ui";

export function FutureSubscriptionUpdate(props: {
  tierPlans: Tier[];
  futureSubscription: SubcriptionFutureActionAttributes;
}) {
  const { tierPlans = [], futureSubscription } = props;

  if (
    !tierPlans ||
    futureSubscription?.isActive === false ||
    !futureSubscription?.isActive ||
    futureSubscription?.isPaid === false ||
    !futureSubscription?.isPaid
  )
    return;

  const tierPlan = tierPlans.find(
    (plan) =>
      String(plan?._id)?.trim() ===
      String(futureSubscription?.subscriptionPlanId)?.trim()
  );
  if (!tierPlan) return;
  return (
    <section className="w-full !mt-10">
      <div className="w-full border border-gray-300 rounded-xl bg-white">
        {/* Header */}
        <div className="w-full !py-3 flex-col flex justify-center rounded-t-xl bg-primary-23 !px-5">
          <TitleUIComponent
            type="h4"
            text="Future Subscription Update"
            className="!text-primay-very-dark"
          />

          <TextUIComponent
            type="p"
            text={`Upcoming update will take effect immediately your current billing cycle ends`}
            className="!py-1"
          />
        </div>

        {/* Content */}
        <div className="!p-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col">
              <TextUIComponent
                type="p"
                text="Plan"
                className="text-xs text-gray-500"
              />
              <TitleUIComponent
                type="h6"
                text={formatToTitleCase(tierPlan?.name as string)}
                className="!text-primay-very-dark"
              />
            </div>

            <div className="flex flex-col">
              <TextUIComponent
                type="p"
                text="Monthly Fee"
                className="text-xs text-gray-500"
              />
              <TitleUIComponent
                type="h6"
                text={`${displayCurrency(tierPlan?.monthlyFee)}`}
                className="!text-primay-very-dark"
              />
            </div>

            <div className="flex flex-col">
              <TextUIComponent
                type="p"
                text="Points / Month"
                className="text-xs text-gray-500"
              />
              <TitleUIComponent
                type="h6"
                text={tierPlan?.pointsPerMonth}
                className="!text-primay-very-dark"
              />
            </div>

            <div className="flex flex-col">
              <TextUIComponent
                type="p"
                text="Update Date"
                className="text-xs text-gray-500"
              />
              <TitleUIComponent
                type="h6"
                text={
                  futureSubscription?.executeAt &&
                  isValidDate(futureSubscription?.executeAt)
                    ? convertDate({
                        date: futureSubscription?.executeAt,
                        isFortmat: true,
                      })
                    : "N/A"
                }
                className="!text-primay-very-dark"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
