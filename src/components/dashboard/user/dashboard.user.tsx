import {
  customPageHook,
  useCustomQuery,
  useSWRHook,
} from "../../../hooks/custom.hook";

import { TableUIComponent } from "../../../utilities/UI/table.ui";
import {
  TextUIComponent,
  TitleUIComponent,
} from "../../../utilities/UI/texts.ui";
import { LayoutComponent } from "../../layouts/layout.general";
import { PaginationUIComponent } from "../../../utilities/UI/pagination.ui";
import { UserDashboardStats } from "./dashboardutilities/subscriptionstats";
import type {
  customerSubscriptionDetailsAttributes,
  paymentDetailsAttributes,
  SubcriptionFutureActionAttributes,
} from "../../../utilities/types.declarationts";
import { UserPointSummaryDashboard } from "./dashboardutilities/poin.user";

import { ComponetDataDisplayer } from "../../../utilities/UI/data.display.ui";
import { InAppChechoutIndexComponent } from "../../inAppCheckOut/index.checkout";
import { useContext, useState } from "react";
import { PaymentHistoryComponent } from "./dashboardutilities/payment.history";
import { FutureSubscriptionUpdate } from "./dashboardutilities/futureupdates";
import { UserContext } from "../../../contexts/user/user.context";
import { UserActivityLogComponent } from "./dashboardutilities/activitylogs";
import { UserTripSummaryComponent } from "./dashboardutilities/trips.user";

export function DashboardComponent() {
  const { generateQuery } = useCustomQuery();
  const [userDashboardState, setUserDashboardState] = useState<{
    modalState: boolean;
  }>({ modalState: false });
  const { userState } = useContext(UserContext);

  const { pageNumber, handlePage } = customPageHook();

  const { fetchData, fetchIsLoading } = useSWRHook({
    apiEndPoint: `customer/subscription/details`,
    cacheKey: `customer/subscription/details`,
  });

  const { fetchData: paymentData } = useSWRHook({
    apiEndPoint: `customer/payment/record?page=${pageNumber}`,
    cacheKey: `customer/payment/record?page=${pageNumber}`,
  });

  const paymentPayload = paymentData?.payload as {
    payments: paymentDetailsAttributes[];
    totalDocs: number;
    totalPages: number;
  };

  const customerData =
    (fetchData?.payload as customerSubscriptionDetailsAttributes) || {};
  const handleNavigate = async () => {
    generateQuery({ path: `/user/profile`, query: { screenname: "profile" } });
  };

  const handleCloseModalState = () => {
    setUserDashboardState((prev) => ({ ...prev, modalState: false }));
    generateQuery({
      path: `/dashboard/user`,
    });
  };

  return (
    <>
      <InAppChechoutIndexComponent
        modalState={userDashboardState?.modalState}
        closeModal={handleCloseModalState}
      />

      <LayoutComponent>
        <section className="w-full h-full flex flex-col justify-center">
          {/* Subscription + Account */}
          <TextUIComponent
            type="h2"
            text="MY Subscription"
            className="!text-primay-very-dark !mt-10 lg:!mt-0"
          />
          <TextUIComponent
            type="h5"
            text="Account"
            onClick={handleNavigate}
            className="!text-primary cursor-pointer"
          />
          <section className="w-full">
            <UserTripSummaryComponent />
          </section>

          {/* Current Subscription Section */}
          <div className="w-full h-fit !mt-10 !py-10 !px-5 !pb-30 border border-gray-300 rounded-xl bg-white max-[880px]:!px-3 max-[370px]:!px-2">
            <TitleUIComponent
              type="h4"
              text="Current Subscription"
              className="!text-primay-very-dark"
            />

            <section className="w-full">
              <ComponetDataDisplayer
                error={
                  !customerData ||
                  (Array.isArray(customerData) && customerData?.length < 1)
                    ? "No data found"
                    : ""
                }
                loading={fetchIsLoading}
              >
                <UserDashboardStats
                  stateProps={{ userDashboardState, setUserDashboardState }}
                  customerData={customerData}
                />
              </ComponetDataDisplayer>
            </section>

            <section className="!mt-10">
              <FutureSubscriptionUpdate
                tierPlans={customerData?.activeTierPlans || []}
                futureSubscription={
                  userState?.user?.subscriptionPlan
                    ?.subscriptionAction as SubcriptionFutureActionAttributes
                }
              />
            </section>

            <div className="w-full md:h-[245px] flex gap-5 !mt-10 max-[820px]:flex-col max-[820px]">
              {/* Points Summary */}
              <UserPointSummaryDashboard customerData={customerData} />

              {/* Points Redemption History */}
              <div className="w-[50%] h-full border border-gray-300 rounded-xl max-[820px]:w-full">
                <div className="w-full h-16 flex items-center rounded-t-xl bg-primary-23 !px-5">
                  <TitleUIComponent
                    type="h4"
                    text="Points Redemption History"
                    className="!text-primay-very-dark"
                  />
                </div>

                <TableUIComponent
                  columnKeys={["date", "tripName", "pointUsed"]}
                  headerData={["Date", "Trip", "Points Used"]}
                  data={customerData?.pointRedemptionLog}
                />
              </div>
            </div>

            <section className="w-full flex !mt-10">
              <UserActivityLogComponent
                logs={customerData?.subscriptionActivityLogs}
              />
            </section>
            {/* Payment History */}
            <section className="!mt-10 ">
              <PaymentHistoryComponent payments={paymentPayload?.payments} />

              <div className="w-full h-14 flex justify-end ">
                <PaginationUIComponent
                  setPageNumber={handlePage}
                  pageNumber={pageNumber}
                  totalPages={paymentPayload?.totalPages}
                />
              </div>
            </section>
          </div>
        </section>
      </LayoutComponent>
    </>
  );
}
