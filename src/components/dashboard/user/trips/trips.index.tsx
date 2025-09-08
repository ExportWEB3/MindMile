import {
  customPageHook,
  useCustomQuery,
  useSWRHook,
} from "../../../../hooks/custom.hook";
import type {
  customerFetchTripEventTypeAttributes,
  customerTripSummaryAttributes,
  customInputOnchangeDataAttributes,
} from "../../../../utilities/types.declarationts";
import { LayoutComponent } from "../../../layouts/layout.general";
import { TripDisplayComponent } from "./trip.display";
import { PaginationUIComponent } from "../../../../utilities/UI/pagination.ui";
import { ComponetDataDisplayer } from "../../../../utilities/UI/data.display.ui";
import { TabUIComponent } from "../../../../utilities/UI/tab.ui";

export function CustomerTripsComponent() {
  const { pageNumber, handlePage } = customPageHook();
  const { getQueryValue, generateQuery } = useCustomQuery();

  const eventType = getQueryValue(
    "eventtype"
  ) as customerFetchTripEventTypeAttributes;
  const { fetchData, fetchIsLoading } = useSWRHook({
    apiEndPoint: `customer/trips/all?page=${pageNumber}&eventtype=${eventType}`,
    cacheKey: `customer/trips/all?page=${pageNumber}&eventtype=${eventType}`,
  });

  const tripsData = fetchData?.payload as customerTripSummaryAttributes;

  const handleTabSelect = (data: customInputOnchangeDataAttributes) => {
    generateQuery({
      path: "/trips/record",
      query: { eventtype: data?.name as string },
    });
  };

  return (
    <LayoutComponent>
      <section className="!mt-10 lg:!mt-0">
        <TabUIComponent
          selectedIndex={eventType == "all" ? 0 : 1}
          onClick={(data: customInputOnchangeDataAttributes) =>
            handleTabSelect(data)
          }
          data={[
            { slug: "all", label: "All Trips" },
            { slug: "booked", label: "Booked Trips" },
          ]}
        />
      </section>

      <ComponetDataDisplayer
        error={
          !Array.isArray(tripsData?.trips) || tripsData?.trips?.length < 1
            ? "No data found"
            : ""
        }
        loading={fetchIsLoading}
      >
        <section className="w-full flex flex-col ">
          <TripDisplayComponent type={eventType} trips={tripsData?.trips} />

          <div className="w-full h-14 flex justify-end ">
            <PaginationUIComponent
              setPageNumber={handlePage}
              pageNumber={pageNumber}
              totalPages={tripsData?.totalPages || 0}
            />
          </div>
        </section>
      </ComponetDataDisplayer>
    </LayoutComponent>
  );
}
