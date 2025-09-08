import {
  useCustomQuery,
  useNotificationHook,
} from "../../../../hooks/custom.hook";
import {
  convertDate,
  isValidDate,
} from "../../../../utilities/helper.function";
import type {
  customerFetchTripEventTypeAttributes,
  TripDataAttributes,
} from "../../../../utilities/types.declarationts";
import { ButtonUIComponent } from "../../../../utilities/UI/button.ui";
import OptimizedImage from "../../../../utilities/UI/image.ui";
import {
  TextUIComponent,
  TitleUIComponent,
} from "../../../../utilities/UI/texts.ui";

type TripDisplayComponentProps = {
  trips: TripDataAttributes[];
  type: customerFetchTripEventTypeAttributes;
};

export function TripDisplayComponent({
  trips,
  type,
}: TripDisplayComponentProps) {
  const { notify } = useNotificationHook();
  const { generateQuery } = useCustomQuery();

  if (!trips || trips.length === 0) {
    return (
      <div className="w-full flex justify-center items-center !py-10">
        <TextUIComponent
          type="p"
          text="No trips found"
          className="!text-gray-500"
        />
      </div>
    );
  }

  const handleAction = (props: { tripId: string }) => {
    const { tripId } = props;

    if (!tripId) {
      notify({
        notificationText: "You need to select a trip",
        notificationState: true,
      });
      return;
    }
    return generateQuery({
      path: `/booking/live`,
      query: { tripid: tripId },
      newTab: true,
    });
  };

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 !mt-10">
      {trips.map((trip) => (
        <div
          key={trip._id}
          className="border border-gray-300 rounded-xl bg-white shadow-sm flex flex-col overflow-hidden"
        >
          {/* Trip Image */}
          <div className="w-full h-40 bg-gray-100 overflow-hidden">
            {trip?.image ? (
              <OptimizedImage
                imageData={trip?.image || ""}
                alt={trip.tripName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <TextUIComponent
                  type="p"
                  text="No Image"
                  className="!text-gray-500"
                />
              </div>
            )}
          </div>

          {/* Trip Details */}
          <div className="flex flex-col flex-1 !p-5">
            <TitleUIComponent
              type="h4"
              text={trip.tripName}
              className="!text-primay-very-dark !mb-2"
            />

            <TextUIComponent
              type="p"
              text={`${
                isValidDate(trip.startDate)
                  ? convertDate({ date: trip.startDate, isFortmat: true })
                  : "N/A"
              } to ${
                isValidDate(trip.endDate)
                  ? convertDate({ date: trip.endDate, isFortmat: true })
                  : "N/A"
              }`}
              className="!text-gray-600  text-sm !mb-2"
            />

            {type === "booked" && trip.totalUsedPoints && (
              <TextUIComponent
                type="p"
                text={`Points Used: ${trip.totalUsedPoints}`}
                className="!text-primary text-sm !mb-2"
              />
            )}

            {type === "all" && (
              <TextUIComponent
                type="p"
                text={`${trip?.isSoldOut ? "Booking Closed" : "Available"}`}
                className={`text-sm ${
                  trip.isSoldOut ? "!text-red-500" : "!text-green-600"
                }`}
              />
            )}

            <div className="flex-1"></div>

            {/* CTA Button */}
            <div className="w-full flex justify-end gap-4 !mt-4">
              <ButtonUIComponent
                onClick={() =>
                  handleAction({
                    tripId: String(trip?._id) as string,
                  })
                }
                text={`${type === "all" ? "View Details" : "Redee Points"}`}
                className={`!px-4 !py-2 rounded-[8px] ${
                  type !== "all" && "hidden"
                } w-36`}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
