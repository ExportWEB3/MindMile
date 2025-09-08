import { useNavigate } from "react-router-dom";
import { useSWRHook } from "../../../../hooks/custom.hook";
import type { customerTripSummaryAttributes } from "../../../../utilities/types.declarationts";
import { ButtonUIComponent } from "../../../../utilities/UI/button.ui";
import { ComponetDataDisplayer } from "../../../../utilities/UI/data.display.ui";
import {
  TextUIComponent,
  TitleUIComponent,
} from "../../../../utilities/UI/texts.ui";

export function UserTripSummaryComponent() {
  const navigate = useNavigate();
  const { fetchData, fetchIsLoading } = useSWRHook({
    apiEndPoint: `customer/trips/record`,
    cacheKey: "customer/trips/record",
  });
  const tripsData =
    (fetchData?.payload as customerTripSummaryAttributes) || null;

  return (
    <section className="w-full border border-gray-300 rounded-xl !mt-10 bg-white">
      <ComponetDataDisplayer
        error={!tripsData ? "Data not available" : ""}
        loading={fetchIsLoading}
      >
        {/* Header */}
        <div className="w-full h-16 flex items-center rounded-t-xl bg-primary-23 !px-5">
          <TitleUIComponent
            type="h4"
            text="Trips"
            className="!text-primay-very-dark"
          />
        </div>

        {/* Stats Grid */}
        <div className="!p-5 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Trips Booked */}
          <div className="flex flex-col items-center justify-center !p-4 bg-gray-50 rounded-lg">
            <TextUIComponent
              type="h3"
              text={String(tripsData?.totalBookedTrip)}
              className="!text-primary font-bold"
            />
            <TextUIComponent
              type="p"
              text="Trips Booked"
              className="!text-gray-600 text-sm"
            />
          </div>

          {/* Points Redeemed */}
          <div className="flex flex-col items-center justify-center !p-4 bg-gray-50 rounded-lg">
            <TextUIComponent
              type="h3"
              text={String(tripsData?.totalPointsUsed)}
              className="!text-primary font-bold"
            />
            <TextUIComponent
              type="p"
              text="Points Redeemed"
              className="!text-gray-600 text-sm"
            />
          </div>

          {/* Available Trips */}
          <div className="flex flex-col items-center justify-center !p-4 bg-gray-50 rounded-lg">
            <TextUIComponent
              type="h3"
              text={String(tripsData?.totalAvailableTrips)}
              className="!text-primary font-bold"
            />
            <TextUIComponent
              type="p"
              text="Available Trips"
              className="!text-gray-600 text-sm"
            />
          </div>
        </div>

        {/* Button */}
        <div className="w-full flex justify-end !px-5 !pb-5">
          <ButtonUIComponent
            onClick={() => navigate("/trips/record?eventtype=all")}
            isBorder={true}
            className="w-32 !bg-primary-30 text-black border-none rounded-[10px]"
            text="View Trips"
          />
        </div>
      </ComponetDataDisplayer>
    </section>
  );
}
