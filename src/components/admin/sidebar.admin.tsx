import { useContext, useEffect, useState } from "react";
import { settingContext } from "../../contexts/settings/settings.context";
import { adminSideBarData } from "../../utilities/data";
import type { menuSlugAttributes } from "../../utilities/types.declarationts";
import { IconUIComponent } from "../../utilities/UI/icon.ui";
import { TextUIComponent } from "../../utilities/UI/texts.ui";
import { useHttpFetcher, useURLParams } from "../../hooks/custom.hook";
import { UserContext } from "../../contexts/user/user.context";
import { useNavigate } from "react-router-dom";

export function AdminSideBar() {
  const { settingsState: state, settingDispatch } = useContext(settingContext);
  const { userDispatch } = useContext(UserContext);
  const { fetchIt } = useHttpFetcher();

  const [componentBasedState, setComponentBasedState] = useState<{
    path: string;
  }>({ path: "" });
  const getPath = useURLParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (getPath) {
      const path = getPath?.split("/")[2];

      setComponentBasedState((prev) => ({
        ...prev,
        path: path,
      }));
    }
  }, [getPath]);

  const handleNavigation = async (slug: menuSlugAttributes) => {
    if (slug === "logout") {
      try {
        await fetchIt({
          apiEndPoint: `logout`,
          isSuccessNotification: {
            notificationText: "",
            notificationState: false,
          },
          httpMethod: "post",
        });
        userDispatch({ type: "LOG_OUT" });
        navigate("/auth/login");
        return;
      } catch (error) {
        navigate("/auth/login");
        userDispatch({ type: "LOG_OUT" });
      }
      return;
    }

    navigate(`/dashboard/${slug}`);
  };

  return (
    <div className={`  h-screen `}>
      <div
        className={`${
          state?.isSideBar
            ? "w-full flex  justify-center relative !mt-4"
            : "hidden flex-col  md:w-full md:flex md:justify-center"
        }`}
      >
        <div className="w-full flex justify-end absolute   !px-4  lg:hidden !mt-20">
          <span
            onClick={() => settingDispatch({ type: "SET_TOGGLE_SIDEBAR" })}
            className="!p-2 rounded-md hover:bg-gray-100 border border-dark-very-light-42"
          >
            <IconUIComponent icon="ri-menu-line" />
          </span>
        </div>
        <div className="flex flex-col w-full !mt-36">
          {adminSideBarData?.map((item, index) => {
            const isLogout = item?.slug === "logout";
            const isActive = componentBasedState?.path === item?.slug;
            const lastNonLogoutIndex =
              adminSideBarData?.filter((i) => i?.slug !== "logout").length - 1;

            // Determine if this is the last non-logout item
            const isLastNonLogout =
              !isLogout &&
              index ===
                adminSideBarData.findIndex(
                  (_, idx) =>
                    idx ===
                    adminSideBarData.findIndex((j) => j?.slug !== "logout") +
                      lastNonLogoutIndex
                );
            return (
              <div
                onClick={() => handleNavigation(item?.slug)}
                key={index}
                className={`!mt-2 w-full justify-center flex items-center cursor-pointer !py-2 ${
                  isActive ? "bg-primary-23  font-semibold" : ""
                } ${
                  isLastNonLogout ? "border-b border-dark-very-light-42" : ""
                } ${isLogout && "!mt-5"}`}
              >
                <span className="w-2/4">
                  <TextUIComponent
                    className=" !text-black !text-start"
                    type="p"
                    text={item?.menuName}
                  />
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
