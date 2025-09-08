import { createContext, useReducer } from "react";
import type {
  PaymentProviderContextAttributes,
  PaymentProviderIntialStateAttributes,
  reactChildrenNodeAttributes,
} from "../../utilities/types.declarationts";
import { PaymentProviderReducer } from "./paymentprovider.reducer";

const initialPaymentProviderState: PaymentProviderIntialStateAttributes = {
  stripeClientSecret: "",
};

export const PaymentProviderContext =
  createContext<PaymentProviderContextAttributes>({
    paymentProviderState: initialPaymentProviderState,
    paymentProviderDispatch: () => null,
  });

export const PaymentProviderProvider = ({
  children,
}: reactChildrenNodeAttributes) => {
  const [paymentProviderState, paymentProviderDispatch] = useReducer(
    PaymentProviderReducer,
    initialPaymentProviderState
  );

  return (
    <PaymentProviderContext.Provider
      value={{ paymentProviderState, paymentProviderDispatch }}
    >
      {children}
    </PaymentProviderContext.Provider>
  );
};
