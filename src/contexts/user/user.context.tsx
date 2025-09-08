import { createContext, useReducer, useRef } from "react";
import type {
  reactChildrenNodeAttributes,
  UserContextAttributes,
  UserInitialStateAttributes,
} from "../../utilities/types.declarationts";

import { UserReducer } from "./user.reducer";
import { refreshFunc } from "../../utilities/helper.function";
import { AxiosError } from "axios";
import { useHttpFetcher } from "../../hooks/custom.hook";
import { useFetcher } from "../../hooks/custom.hook";

const initialUserState: UserInitialStateAttributes = {
  user: null,
  token: "",
  isServerAlive: false,
  isRefreshTokenResponseState: "",
  globalError: { errorState: false, errorMessage: "" },
};

export const UserContext = createContext<UserContextAttributes>({
  userState: initialUserState,
  userDispatch: () => null,
});

export const UserProvider = ({ children }: reactChildrenNodeAttributes) => {
  const [userState, userDispatch] = useReducer(UserReducer, initialUserState);
  const refreshRan = useRef(false);
  const serverChecked = useRef(false);
  const { fetchIt } = useHttpFetcher();

  const refreshSWR = async () => {
    if (refreshRan.current) return;
    refreshRan.current = true;
    try {
      const payload = await refreshFunc();

      if (payload?.token) {
        userDispatch({ type: "SET_USER", payload: payload?.user });
        userDispatch({ type: "SET_TOKEN", payload: payload?.token });
      } else {
        userDispatch({
          type: "SET_REFRESH_TOKEN_RESPONSE",
          payload: "yes",
        });
      }
    } catch (error) {
      userDispatch({ type: "LOG_OUT" });
      if (error instanceof AxiosError) {
        if (error.response?.status === 429) {
          userDispatch({
            type: "SET_REFRESH_TOKEN_RESPONSE",
            payload: "429",
          });
          return;
        }
      }

      userDispatch({ type: "SET_REFRESH_TOKEN_RESPONSE", payload: "yes" });
    }
  };

  const checkServer = async () => {
    if (serverChecked.current) return;
    serverChecked.current = true;
    try {
      await fetchIt({
        apiEndPoint: `serverstatus`,
        httpMethod: "get",
        isSuccessNotification: {
          notificationText: "",
          notificationState: false,
        },
      });
      userDispatch({ type: "SET_SERVER_STATE_ON" });
    } catch (error) {
      userDispatch({ type: "CLEAR_SERVER_STATE_OFF" });
    }
  };

  useFetcher({
    cacheKey: "/usersession",
    request: refreshSWR,
  });

  useFetcher({
    cacheKey: "/checkserver",
    request: checkServer,
  });

  return (
    <UserContext.Provider value={{ userState, userDispatch }}>
      {children}
    </UserContext.Provider>
  );
};
