import {
  convertDate,
  displayCurrency,
  formatToTitleCase,
  isValidDate,
} from "../../../../utilities/helper.function";
import type { paymentDetailsAttributes } from "../../../../utilities/types.declarationts";
import { IconUIComponent } from "../../../../utilities/UI/icon.ui";
import { TableUIComponent } from "../../../../utilities/UI/table.ui";
import {
  TextUIComponent,
  TitleUIComponent,
} from "../../../../utilities/UI/texts.ui";

export function PaymentHistoryComponent(props: {
  payments: paymentDetailsAttributes[];
}) {
  const { payments } = props;
  return (
    <div className="w-full h-fit  border border-gray-300 rounded-xl">
      <div className="w-full h-16 flex items-center rounded-t-xl bg-primary-23 !px-5">
        <TitleUIComponent
          type="h4"
          text="Payment History"
          className="!text-primay-very-dark"
        />
      </div>

      <TableUIComponent
        columnKeys={["date", "amount", "paymentProvider", "status", "receipt"]}
        headerData={["Date", "Amount", "Payment Provider", "Status", "Receipt"]}
        data={payments}
        columnRenderers={{
          date: (row) => (
            <div className="flex gap-2">
              <span className="flex   rounded-full">
                <TextUIComponent
                  type="p"
                  text={
                    isValidDate(row?.dateCreated)
                      ? convertDate({
                          date: row?.dateCreated,
                          isFortmat: true,
                        })
                      : "N/A"
                  }
                />
              </span>
            </div>
          ),
          amount: (row) => (
            <div>
              <TextUIComponent type="p" text={displayCurrency(row?.amount)} />
            </div>
          ),
          paymentProvider: (row) => (
            <div>
              <TextUIComponent
                type="p"
                text={formatToTitleCase(row?.paymentProvider) || "N/A"}
              />
            </div>
          ),
          status: (row) => (
            <div className="flex gap-2">
              <span className="flex items-center h-6 !px-5 rounded-full bg-primary-23">
                <TextUIComponent
                  type="p"
                  text={formatToTitleCase(row.status)}
                />
              </span>
            </div>
          ),
          receipt: () => (
            <div className="flex gap-4">
              <span className="flex justify-center h-6 !px-1 cursor-pointer border border-primary rounded-md">
                <IconUIComponent icon="ri-eye-line" className="text-base" />
              </span>
            </div>
          ),
        }}
      />
    </div>
  );
}
