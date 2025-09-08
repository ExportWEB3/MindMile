import { useContext } from "react";
import type { layoutAttributes } from "../../utilities/types.declarationts";
import { LoadingComponent } from "../../utilities/UI/loading.ui";
import { CheckServerStatus } from "../error/error.component";
import { HeaderMenu } from "../header/header";
import { ToastComponentUI } from "../../utilities/UI/toast.ui";
import { GlobalErrorComponent } from "../../utilities/UI/globalerror.ui";
import { FooterComponent } from "../footer/footer";
import { settingContext } from "../../contexts/settings/settings.context";
import { NotificationContext } from "../../contexts/notification/notification.context";
import { UserContext } from "../../contexts/user/user.context";

export function UnprotectedLayout(props: layoutAttributes) {
  const { children, title } = props;
  const { settingsState } = useContext(settingContext);
  const { notificationState } = useContext(NotificationContext);
  const { userState } = useContext(UserContext);

  return (
    <div className="flex flex-col min-h-screen">
      {!userState.isServerAlive && <CheckServerStatus />}
      {settingsState?.isLoading && <LoadingComponent background={false} />}
      {notificationState?.notification?.notificationText && (
        <ToastComponentUI />
      )}
      <HeaderMenu bg={title === "Home" ? "bg-white" : ""} />

      {!userState.isServerAlive ? (
        <CheckServerStatus />
      ) : (
        <>
          <main className="flex-grow w-full relative min-h-[calc(100vh-80px)]">
            {userState?.globalError?.errorState ? (
              <GlobalErrorComponent />
            ) : (
              children
            )}
          </main>

          <FooterComponent />
        </>
      )}
    </div>
  );
}
