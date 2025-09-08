import { createContext, useReducer } from "react";
import type {
  notificationContextAttributes,
  notificationInitialState,
  reactChildrenNodeAttributes,
} from "../../utilities/types.declarationts";
import { NotificationReducer } from "./notification.reducer";

const initialNotificationState: notificationInitialState = {
  notification: {
    notificationText: "",
    URL: "",
    isTimer: false,
    timer: "",
    bgColour: "",
    textColour: "",
    isNavigation: true,
    statusCode: null,
    isRevalidate: false,
    isRevaliddateURL: [],
    showCancelButton: false,
    event: "",
    notificationState: false,
    isURL: false,
    icon: "",
  },
};

export const NotificationContext = createContext<notificationContextAttributes>(
  {
    notificationState: initialNotificationState,
    notificationDispatch: () => null,
  }
);

export const NotificationProvider = ({
  children,
}: reactChildrenNodeAttributes) => {
  const [notificationState, notificationDispatch] = useReducer(
    NotificationReducer,
    initialNotificationState
  );

  return (
    <NotificationContext.Provider
      value={{ notificationState, notificationDispatch }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
