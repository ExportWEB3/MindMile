import type {
  isNotificationPopAttributes,
  notificationActionAttributes,
  notificationInitialState,
} from "../../utilities/types.declarationts";

export const NotificationReducer = (
  notificationState: notificationInitialState,
  action: notificationActionAttributes
): notificationInitialState => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return {
        ...notificationState,
        notification: action.payload as isNotificationPopAttributes,
      };

    default:
      return notificationState;
  }
};
