import { useContext, useEffect, useState } from "react";
import type { layoutAttributes } from "../../utilities/types.declarationts";
import { settingContext } from "../../contexts/settings/settings.context";
import { UserContext } from "../../contexts/user/user.context";
import { NotificationContext } from "../../contexts/notification/notification.context";
import { CheckServerStatus } from "../error/error.component";
import { LoadingComponent } from "../../utilities/UI/loading.ui";
import { UnprotectedLayout } from "./unprotected";
import { LoginComponent } from "../auth/login.auth";
import { ToastComponentUI } from "../../utilities/UI/toast.ui";
import { HeaderMenu } from "../header/header";
import { GlobalErrorComponent } from "../../utilities/UI/globalerror.ui";

export function ProtectedLayout(props: layoutAttributes) {
  const { children } = props;
  const { settingsState } = useContext(settingContext);
  const { userState } = useContext(UserContext);
  const { notificationState } = useContext(NotificationContext);
  const [layOutComponentState, setLayOutComponentState] = useState<{
    apiLoadingState: boolean;
  }>({ apiLoadingState: false });

  //this useEffect simply helps to stop the loading state once there is a response from the refresh token end point.
  //once we are unable to login a user, the component will push user to login component
  //what makes this possible is the  dispatch({ type: "SET_REFRESHTOKEN_RESPONSE" }) action
  useEffect(() => {
    if (
      userState?.isRefreshTokenResponseState ||
      userState?.isRefreshTokenResponseState === "429"
    ) {
      setLayOutComponentState({
        ...layOutComponentState,
        apiLoadingState: true,
      });
    }
  }, [userState?.user?._id, userState?.isRefreshTokenResponseState]);

  return (
    <>
      {!userState?.isServerAlive && <CheckServerStatus />}

      {(settingsState?.isLoading || !layOutComponentState?.apiLoadingState) &&
        !userState?.globalError?.errorState &&
        userState?.isServerAlive && (
          <LoadingComponent
            background={settingsState?.isLoading ? false : true}
          />
        )}

      {!userState?.user?._id ? (
        <UnprotectedLayout title="Login">
          <LoginComponent />
        </UnprotectedLayout>
      ) : (
        <div className={`w-full flex flex-col no-scrollbar overflow-auto`}>
          {notificationState?.notification?.notificationText && (
            <ToastComponentUI />
          )}

          <div className="z-[6]">
            <HeaderMenu
              bg="bg-primary"
              isAdminPage={true}
              textClassName="!text-white"
              className=""
            />
          </div>

          <div className={` w-full !mt-10 min-h-full !pb-16 `}>
            {userState?.globalError?.errorState ? (
              <GlobalErrorComponent />
            ) : (
              children
            )}
          </div>
        </div>
      )}
    </>
  );
}
