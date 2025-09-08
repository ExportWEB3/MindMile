import type {
  paymentProviderActionAttributes,
  PaymentProviderIntialStateAttributes,
} from "../../utilities/types.declarationts";

export const PaymentProviderReducer = (
  paymentProviderState: PaymentProviderIntialStateAttributes,
  action: paymentProviderActionAttributes
): PaymentProviderIntialStateAttributes => {
  switch (action.type) {
    case "SET_STRIPE_CLIENT_SECRET":
      return {
        ...paymentProviderState,
        stripeClientSecret: action.payload,
      };

    default:
      return paymentProviderState;
  }
};
