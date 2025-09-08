import { headerMenuData } from "../../utilities/data";
import { ButtonUIComponent } from "../../utilities/UI/button.ui";
import { IconUIComponent } from "../../utilities/UI/icon.ui";
import OptimizedImage from "../../utilities/UI/image.ui";
import logo2 from "../../assets/demo-logo.png";
import siteLogo from "../../assets/site.png";
import { Link } from "react-router-dom";
import type {
  drawerStateAttributes,
  HeaderMenuAttributes,
  menuSlugAttributes,
  userRoleAttributes,
} from "../../utilities/types.declarationts";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/user/user.context";
import { ProfilePictureComponent } from "../../utilities/UI/profile.ui";
import {
  useHttpFetcher,
  useMediaQuery,
  useURLParams,
} from "../../hooks/custom.hook";
import { settingContext } from "../../contexts/settings/settings.context";
import { DrawerUIComponent } from "../../utilities/UI/drawer.ui";
import { isAdminValidation } from "../../utilities/helper.function";

export function HeaderMenu(props: {
  bg?: string;
  textClassName?: string;
  isAdminPage?: boolean;
  className?: string;
}) {
  const { bg, textClassName, isAdminPage = false, className } = props;
  const { userState, userDispatch } = useContext(UserContext);
  const { settingDispatch } = useContext(settingContext);
  const getPath = useURLParams();
  const navigate = useNavigate();
  let largeScreen = useMediaQuery("(min-width: 1024px)");
  const { fetchIt } = useHttpFetcher();
  const [headerComponentState, setHeaderComponentState] = useState<{
    headerMenu: HeaderMenuAttributes[];
    path: string;
    isAdmin?: boolean;
  }>({ headerMenu: [], path: "", isAdmin: false });
  const [drawerSate, setDrawerState] = useState<{
    isOpen: boolean;
    placement: "top" | "left" | "right" | "bottom";
  }>({
    isOpen: false,
    placement: "top",
  });
  const handleNavigation = async (params: {
    slug: menuSlugAttributes;
    link: string;
  }) => {
    const { slug, link } = params;

    if (slug === "dashboard") {
      const { isValid } = isAdminValidation({
        userRole: userState?.user?.role as userRoleAttributes,
      });

      if (isValid) return navigate("/dashboard/subscription");
      else return navigate("/dashboard/user");
    }

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

    if (slug === "signup") {
      navigate(`/auth/register`);
    }

    if (slug === "login") {
      navigate("/auth/login");
    }

    navigate(link);
    return;
  };

  useEffect(() => {
    const isLoggedIn = Boolean(userState?.user?._id);
    const role = userState?.user?.role as userRoleAttributes;

    let allowedSlugs: string[] = [];

    if (isLoggedIn) {
      const adminRoles: userRoleAttributes[] = [
        "admin_mit",
        "super_user_mit",
        "support_agent_mit",
        "dev_user_mit",
      ];
      allowedSlugs = adminRoles.includes(role as userRoleAttributes)
        ? ["dashboard", "report", "setting", "myAccount"]
        : ["dashboard", "trips", "myAccount", "logout"];
    } else {
      allowedSlugs = ["home", "pricing", "about", "contact", "login", "signup"];
    }

    const tempMenuData = headerMenuData?.filter((item) =>
      allowedSlugs.includes(item?.slug)
    );

    const { isValid } = isAdminValidation({
      userRole: userState?.user?.role as userRoleAttributes,
    });

    setHeaderComponentState((prev) => ({
      ...prev,
      headerMenu: tempMenuData,
      isAdmin: isValid,
    }));
  }, [userState?.user?._id, userState?.user?.role, headerMenuData]);

  useEffect(() => {
    if (getPath) {
      const path = getPath?.split("/")[1];

      setHeaderComponentState((prev) => ({
        ...prev,
        path: path,
      }));
    }
  }, [getPath]);

  const handleDrawerFunc = () => {
    if (largeScreen) return;

    setDrawerState({
      ...drawerSate,
      isOpen: !drawerSate?.isOpen,
    });
  };

  return (
    <>
      <DrawerUIComponent
        drawerState={drawerSate as drawerStateAttributes}
        setDrawerState={
          setDrawerState as React.Dispatch<
            React.SetStateAction<drawerStateAttributes>
          >
        }
        isFullDarkBG={true}
      >
        <div className="!px-4 w-full !mt-5 overflow-hidden ">
          {headerComponentState?.headerMenu?.map((item, index) => (
            <Link key={index?.toString()} to={item?.link} className="">
              <li
                className={`!p-2 cursor-pointer !text-sm !text-white  `}
                key={index}
              >
                {item?.menuName}
              </li>
            </Link>
          ))}
        </div>
      </DrawerUIComponent>

      <header className={`w-full ${bg} ${isAdminPage && "fixed"} `}>
        <div
          className={`${
            !isAdminPage || !headerComponentState?.isAdmin
              ? "customContainerModified"
              : " !px-6 lg:!px-16 "
          } mx-auto  flex  items-center justify-between !h-20 ${className} `}
        >
          {/* Logo */}
          <div className="flex items-center w-2/4 lg:w-[30%] space-x-3 h-full">
            <OptimizedImage
              imageData={import.meta.env.PROD ? siteLogo : logo2} // This now already has { sources, img, placeholder }
              alt="MIT+ Logo"
              className="mr-4"
              style={{ maxWidth: "96px", height: "auto" }}
            />
          </div>

          {/* Desktop Menu */}
          <nav
            className={`flex items-center h-full justify-end  w-full  2xl:w-2/4 text-[16px] font-medium text-[var(--color-primary-dark)]`}
          >
            {/* Normal menu items */}
            <div
              className={`flex items-center justify-around  h-full  gap-4 ${
                headerComponentState?.isAdmin
                  ? `w-auto   2xl:w-[55%]`
                  : "w-auto"
              } ${!isAdminPage && "hidden md:flex"}`}
            >
              {headerComponentState?.headerMenu
                .filter(
                  (menu) => menu?.slug !== "login" && menu?.slug !== "signup"
                )
                .map((menu, index) => (
                  <span
                    onClick={() =>
                      handleNavigation({ slug: menu?.slug, link: menu?.link })
                    }
                    className={`cursor-pointer hover:text-[var(--color-primary)] transition-colors duration-200 hidden sm:flex h-full items-center ${
                      menu?.slug === "setting" && "sm:hidden lg:flex"
                    } ${
                      !isAdminPage &&
                      menu?.slug !== "home" &&
                      menu?.slug !== "contact" &&
                      "!hidden lg:!flex"
                    }  ${textClassName}`}
                    key={index}
                  >
                    <li
                      className={`${
                        headerComponentState?.path === menu?.slug &&
                        "bg-white-33 rounded-[10px] text-black"
                      }  sm:flex items-center h-3/5 !px-3 !text-xs md:!text-sm`}
                    >
                      {menu?.menuName}
                    </li>
                  </span>
                ))}
            </div>

            {/* Login & Sign Up buttons with space */}
            <div className="flex items-center ">
              {userState?.user?._id ? (
                <span
                  className="cursor-pointer !mr-3"
                  onClick={handleDrawerFunc}
                >
                  <ProfilePictureComponent
                    displayDetails={false}
                    imgURL={userState?.user?.picture}
                  />
                </span>
              ) : (
                <>
                  {headerMenuData
                    .filter(
                      (menu) =>
                        menu?.slug === "login" || menu?.slug === "signup"
                    )
                    .map((menu, index) => (
                      <span className={`!mr-4 hidden sm:flex`} key={index}>
                        <ButtonUIComponent
                          onClick={() =>
                            handleNavigation({
                              slug: menu?.slug,
                              link: menu?.link,
                            })
                          }
                          key={index}
                          isBorder={menu?.slug === "login"}
                          text={menu?.menuName}
                          className="!h-[45px] md:w-[130px] lg:w-[164px] rounded-[5px]"
                        />
                      </span>
                    ))}
                </>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className={`flex lg:hidden`}>
            <span
              onClick={() =>
                setDrawerState({ ...drawerSate, isOpen: !drawerSate?.isOpen })
              }
              className={`cursor-pointer !pr-2 flex lg:hidden ${
                userState?.user?._id && "hidden"
              }`}
            >
              <IconUIComponent
                icon="ri-menu-line"
                className={`${drawerSate?.isOpen && "hidden"}`}
              />
            </span>

            <span
              onClick={() => settingDispatch({ type: "SET_TOGGLE_SIDEBAR" })}
              className={`!p-2 rounded-md hover:bg-gray-100  ${
                (!isAdminPage || !headerComponentState?.isAdmin) && "hidden"
              }`}
            >
              <IconUIComponent
                icon={`ri-menu-line ${
                  isAdminPage ? "text-white" : "text-primary"
                }`}
              />
            </span>
          </div>
        </div>
      </header>
    </>
  );
}
