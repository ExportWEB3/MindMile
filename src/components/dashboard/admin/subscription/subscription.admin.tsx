import { useState } from "react";

import { ButtonUIComponent } from "../../../../utilities/UI/button.ui";
import { CardUIComponent } from "../../../../utilities/UI/card.ui";
import { IconUIComponent } from "../../../../utilities/UI/icon.ui";
import { TableUIComponent } from "../../../../utilities/UI/table.ui";
import { TitleUIComponent } from "../../../../utilities/UI/texts.ui";
import { AdminLayOutComponent } from "../../../layouts/layout.admin";
import { CreateSubscriptionPlans } from "./create.subscription";
import { useSWRHook } from "../../../../hooks/custom.hook";
import { ComponetDataDisplayer } from "../../../../utilities/UI/data.display.ui";
import type {
  ClientTierPlanResponse,
  applicationActionEvent,
  customTierAttributes,
} from "../../../../utilities/types.declarationts";

export function SubscriptionAdminComponent() {
  const [susbcriptionComponentState, setSubscriptionComponentState] = useState<{
    modalState: boolean;
    tier?: customTierAttributes | null;
    event: applicationActionEvent;
  }>({ modalState: false, tier: null, event: "writeOnly" });

  const swrResponse = useSWRHook({
    apiEndPoint: `platform/tierplans/record`,
    cacheKey: `platform/tierplans/record`,
  });
  const subscriptionData = swrResponse?.fetchData
    ?.payload as ClientTierPlanResponse;

  return (
    <>
      <CreateSubscriptionPlans
        modalState={susbcriptionComponentState?.modalState}
        closeModalState={() =>
          setSubscriptionComponentState((prev) => ({
            ...prev,
            modalState: false,
            tier: null,
            event: "writeOnly",
          }))
        }
        tier={susbcriptionComponentState?.tier as customTierAttributes | null}
        event={susbcriptionComponentState?.event}
      />

      <AdminLayOutComponent
        title="Admin Dashboard"
        btnFunction={() =>
          setSubscriptionComponentState((prev) => ({
            ...prev,
            modalState: true,
            event: "writeOnly",
          }))
        }
      >
        <ComponetDataDisplayer loading={swrResponse?.fetchIsLoading}>
          <section className={`w-full flex flex-col `}>
            <section className="w-full !mt-10 flex-col flex flex-wrap md:flex-row justify-between">
              {subscriptionData?.stats?.map((item, index) => (
                <span
                  key={index}
                  className="w-full !mt-2 md:!mt-0 md:w-[23%] lg:w-[20%]"
                >
                  <CardUIComponent title={item?.title} value={item?.value} />
                </span>
              ))}
            </section>
          </section>

          <section className="w-full !mt-10 ">
            <TitleUIComponent
              text="Subscription Plan"
              type="h5"
              className=" !pb-6"
            />
            <TableUIComponent
              columnKeys={[
                "name",
                "monthlyFee",
                "pointsPerMonth",
                "subscribers",
                "actions",
              ]}
              headerData={[
                "Plan Name",
                "Price",
                "Points",
                "Subsribers",
                "Actions",
              ]}
              data={subscriptionData?.tierPlans}
              columnRenderers={{
                actions: (row) => (
                  <div className="flex gap-4 ">
                    <span
                      onClick={() =>
                        setSubscriptionComponentState((prev) => ({
                          ...prev,
                          modalState: true,
                          tier: row,
                          event: "readOnly",
                        }))
                      }
                      className="cursor-pointer border !px-1 h-6 flex  justify-center border-primary rounded-md"
                    >
                      <IconUIComponent
                        icon="ri-eye-line"
                        className="text-base"
                      />
                    </span>

                    <span
                      onClick={() =>
                        setSubscriptionComponentState((prev) => ({
                          ...prev,
                          modalState: true,
                          tier: row,
                          event: "writeOnly",
                        }))
                      }
                      className="cursor-pointer border !px-1 h-6 flex  justify-center border-primary rounded-md"
                    >
                      <IconUIComponent
                        icon="ri-edit-line"
                        className="text-base"
                      />
                    </span>
                  </div>
                ),
              }}
            />
          </section>

          <section className="w-full !mt-10 flex justify-end">
            <ButtonUIComponent text="Save Changes" className="hidden" />
          </section>
        </ComponetDataDisplayer>
      </AdminLayOutComponent>
    </>
  );
}
