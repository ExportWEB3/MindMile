import {
  convertDate,
  isValidDate,
} from "../../../../../utilities/helper.function";
import { TitleUIComponent } from "../../../../../utilities/UI/texts.ui";

type BookingHeaderProps = {
  tripName: string;
  startDate?: string;
  endDate?: string;
  selectedScreen: number;
  onScreenChange: (index: number) => void;
};

export function BookingHeader({
  tripName,
  startDate,
  endDate,
  selectedScreen,
  onScreenChange,
}: BookingHeaderProps) {
  const tabs = ["Packages", "Add Ons", "Participants", "Redeem"];

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center !pt-4 bg-primary">
        <TitleUIComponent
          className="!text-white text-center !mt-6 !px-3"
          type="h4"
          text={tripName}
        />
        <TitleUIComponent
          type="h6"
          className="!text-white !mt-4 !pb-4"
          text={`${
            isValidDate(startDate as string)
              ? convertDate({ date: startDate as string, isFortmat: true })
              : "TBD"
          } To ${
            isValidDate(endDate as string)
              ? convertDate({ date: endDate as string, isFortmat: true })
              : "TBD"
          }`}
        />
      </div>

      <div className="w-full flex bg-white shadow-md justify-center gap-4 !py-3 flex-col !px-3 sm:flex-row">
        {tabs.map((item, index) => (
          <span
            key={index}
            className={`!py-2 !px-3 rounded-[15px] ${
              selectedScreen === index ? "bg-primary-23" : ""
            }`}
            onClick={() => onScreenChange(index)}
          >
            <TitleUIComponent
              type="h6"
              text={item}
              className="cursor-pointer"
            />
          </span>
        ))}
      </div>
    </>
  );
}
