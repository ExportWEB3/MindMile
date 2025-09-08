import { convertDate, isValidDate } from "../helper.function";
import type { orderActivityLog } from "../types.declarationts";
import { IconUIComponent } from "./icon.ui";
import { TextUIComponent, TitleUIComponent } from "./texts.ui";

export function ActivityLogComponentUI(props: { logs: orderActivityLog[] }) {
  const { logs } = props;

  if (!Array.isArray(logs) || logs.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-[150px] text-gray-500">
        <IconUIComponent icon="ri-file-list-3-line" className="text-2xl mb-2" />
        <TextUIComponent type="p" text="No activity yet" className="!text-sm" />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      <TitleUIComponent
        type="h5"
        text="Activity Log"
        className="!text-primay-very-dark !mb-4 hidden"
      />

      <div className="relative border-l border-gray-200 !pl-6 min-h-[150px] max-h-80 overflow-y-auto !pr-3">
        {logs?.map((log, index) => (
          <div key={index} className="!mb-6 relative">
            {/* Dot Indicator */}
            <span className="absolute -left-[11px] top-2 w-4 h-4 rounded-full bg-primary-23 border-2 border-white shadow" />

            {/* Log Content */}
            <div className="flex flex-col">
              <TextUIComponent
                type="p"
                text={log?.logMessage}
                className="!text-gray-700 !text-sm"
              />
              <TextUIComponent
                type="p"
                text={`${
                  log.logDate && isValidDate(log.logDate)
                    ? convertDate({ date: log.logDate, isFortmat: true })
                    : "N/A"
                }`}
                className="!text-xs text-gray-400 !mt-1"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
