import type { StripeCardIndexComponent } from "../../../utilities/types.declarationts";
import { ButtonUIComponent } from "../../../utilities/UI/button.ui";
import { TitleUIComponent } from "../../../utilities/UI/texts.ui";
import { StripeCheckOutComponent } from "./stripe.provider";
import { StripeCardListComponent } from "./stripecard.listing";

export function StripeCardIndexComponent({
  isCardInput,
  stripeObjects,
  paymentMethods,
  stripeClientSecret,
  isManageProfile,
  customFunction,
}: StripeCardIndexComponent) {
  //user is paying with their card already existing,
  const handleOnCardPayment = (paymentMethodId: string) => {
    if (!customFunction) return;
    customFunction({ pmId: paymentMethodId });
    return;
  };

  const handleAddNewCard = () => {
    if (!customFunction) return;
    customFunction({ pmId: "", event: "add_new_card" });
    return;
  };

  const handleOnCardDelete = () => {};
  return (
    <div className="w-full flex flex-col">
      {Array.isArray(paymentMethods) &&
      !isCardInput &&
      paymentMethods?.length > 0 ? (
        <div className="flex w-full flex-col">
          <StripeCardListComponent
            paymentMethods={paymentMethods}
            onSelectCard={handleOnCardPayment}
            onDeleteCard={handleOnCardDelete}
            isManagePayment={isManageProfile}
          />

          <div className="w-full flex !mt-6 justify-end border-t border-dark-light-38 !pb-2">
            <ButtonUIComponent
              text="Add New Card"
              isBorder={true}
              className="rounded-[10px] w-36 !mt-3"
              onClick={handleAddNewCard}
            />
          </div>
        </div>
      ) : stripeClientSecret ? (
        <div className="w-full flex flex-col">
          <StripeCheckOutComponent
            eventType={stripeObjects?.eventType}
            userSubscriptionId={stripeObjects?.userSubscriptionId}
            userId={stripeObjects?.userId}
            customFunction={stripeObjects?.customFunction}
            reqAction={stripeObjects?.reqAction}
          />
        </div>
      ) : (
        <div className="w-full flex justify-center !py-4">
          <TitleUIComponent
            text="Ensure you selected the Stripe Payment method"
            type="h6"
            className="!text-gray-400"
          />
        </div>
      )}
    </div>
  );
}
