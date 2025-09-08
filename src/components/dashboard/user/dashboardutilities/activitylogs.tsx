import type { orderActivityLog } from "../../../../utilities/types.declarationts";
import { ActivityLogComponentUI } from "../../../../utilities/UI/activitylog.ui";
import {
  TextUIComponent,
  TitleUIComponent,
} from "../../../../utilities/UI/texts.ui";

export function UserActivityLogComponent(props: { logs: orderActivityLog[] }) {
  const { logs } = props;

  return (
    <section className="w-full ">
      <div className="w-full border border-gray-300 rounded-xl bg-white">
        {/* Header */}
        <div className="w-full !py-3 flex-col flex justify-center rounded-t-xl bg-primary-23 !px-5">
          <TitleUIComponent
            type="h4"
            text="Activity Log"
            className="!text-primay-very-dark"
          />

          <TextUIComponent
            type="p"
            text="Track your most recent actions and updates"
            className="!py-1"
          />
        </div>

        {/* Content */}
        <div className="!p-5">
          <ActivityLogComponentUI logs={logs} />
        </div>
      </div>
    </section>
  );
}
