import type { stripePaymentMethodResultAttributes } from "../../../utilities/types.declarationts";
import { ButtonUIComponent } from "../../../utilities/UI/button.ui";
import { ComponetDataDisplayer } from "../../../utilities/UI/data.display.ui";
import { IconUIComponent } from "../../../utilities/UI/icon.ui";
import {
  TextUIComponent,
  TitleUIComponent,
} from "../../../utilities/UI/texts.ui";

export function StripeCardListComponent({
  paymentMethods,
  onSelectCard,
  onDeleteCard,
  isManagePayment = false,
}: {
  paymentMethods: stripePaymentMethodResultAttributes[];
  onSelectCard: (cardId: string) => void;
  onDeleteCard?: (cardId: string) => void;
  isManagePayment: boolean;
}) {
  if (!paymentMethods?.length) return null;

  const handleOnDelete = (pmId: string) => {
    if (!onDeleteCard || typeof onDeleteCard !== "function" || !pmId) return;
    onDeleteCard(pmId);
  };

  const handleSelectedMethod = (pmId: string) => {
    if (!onSelectCard || typeof onSelectCard !== "function" || !pmId) return;
    onSelectCard(pmId);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <TitleUIComponent
        text="Saved Cards"
        type="h6"
        className="!text-gray-700"
      />
      <ComponetDataDisplayer
        loading={false}
        error={
          !Array.isArray(paymentMethods) || paymentMethods?.length < 1
            ? "No listed Card"
            : ""
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paymentMethods?.map((pm) => (
            <div
              key={pm?.paymentMethodId}
              className="flex flex-col justify-between rounded-2xl border border-gray-100 shadow-sm !p-2 bg-gray-50 hover:shadow-md transition-all duration-200"
            >
              {/* Card header */}
              <div className="flex flex-col gap-3 ">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
                    <IconUIComponent
                      icon="ri-bank-card-line"
                      className="text-gray-500 text-lg"
                    />
                  </div>
                  <TitleUIComponent
                    text={`**** **** **** ${pm?.lastFourDigit}`}
                    type="h6"
                    className="!text-base"
                  />
                </div>

                {/* Card details */}
                <TextUIComponent
                  text={`${pm?.cardBrand?.toUpperCase()} · Expires ${
                    pm?.exp_month
                  }/${pm?.exp_year}`}
                  type="p"
                  className="text-sm text-gray-500 !mt-4 "
                />
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center !p-2 !mt-6">
                <ButtonUIComponent
                  text="Use Card"
                  onClick={() => handleSelectedMethod(pm?.paymentMethodId)}
                  className=" !h-10 rounded-xl text-sm w-auto"
                />

                {isManagePayment && (
                  <span
                    className="text-red-500 hover:text-red-600 flex items-center gap-1 text-sm transition-colors cursor-pointer"
                    onClick={() => handleOnDelete(pm?.paymentMethodId)}
                  >
                    <IconUIComponent
                      icon="ri-delete-bin-6-line"
                      className="!text-xl"
                    />
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </ComponetDataDisplayer>
    </div>
  );
}
