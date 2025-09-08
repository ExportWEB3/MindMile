import { useContext, useEffect } from "react";
import { AdminSideBar } from "../admin/sidebar.admin";
import { settingContext } from "../../contexts/settings/settings.context";
import type {
  layoutAttributes,
  userRoleAttributes,
} from "../../utilities/types.declarationts";
import { BackgroundBlur } from "../../utilities/UI/bg.ui";
import { GlobalSearchComponent } from "../../utilities/UI/search.ui";
import { UserContext } from "../../contexts/user/user.context";
import { useNavigate } from "react-router-dom";
import { isAdminValidation } from "../../utilities/helper.function";

export function AdminLayOutComponent({
  children,
  btnFunction,
  btnText,
}: layoutAttributes) {
  const { settingsState: state } = useContext(settingContext);
  const { userState } = useContext(UserContext);
  const navigate = useNavigate();
  const handleBTNClick = () => {
    if (!btnFunction) return;
    btnFunction();
  };

  useEffect(() => {
    const { isValid } = isAdminValidation({
      userRole: userState?.user?.role as userRoleAttributes,
    });

    if (!isValid) {
      navigate("/dashboard/user");
    }
    return;
  }, [userState?.user?.role]);

  return (
    <>
      <BackgroundBlur isBackground={true} isVisible={state?.isSideBar} />
      {
        <section className="flex min-h-screen">
          {/* Sidebar */}
          <div
            className={`fixed top-0 overflow-y-scroll bg-primary-white shadow-md lg:bg-dark-very-light-42 ${
              !state?.isSideBar && "hidden"
            } no-scrollbar left-0 h-screen w-0 lg:w-56 xl:w-80 z-[5]  ${
              state?.isSideBar
                ? "!w-4/5 animate-sideBar-slide lg:!animate-none"
                : "animate-sideBar-slideOut lg:!animate-none"
            }   lg:block`}
          >
            <AdminSideBar />
          </div>

          {/* Spacer for sidebar width */}
          <div className=" w-44 hidden lg:block lg:w-52 xl:w-80" />

          {/* Main content */}
          <main className="flex-1 flex w-full flex-col items-center !mt-20">
            <div className="w-11/12">
              <GlobalSearchComponent
                onChange={() => {}}
                onClick={() => {}}
                placeHolder="search plan..."
                btnText={`+ ${btnText ?? "Add New Plan"} `}
                btnOnClickFunc={handleBTNClick}
              />
            </div>
            {/* Container with consistent spacing */}
            <div className=" w-11/12   !py-6">{children}</div>
          </main>
        </section>
      }
    </>
  );
}
