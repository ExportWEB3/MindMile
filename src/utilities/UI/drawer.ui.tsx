import { IconUIComponent } from "./icon.ui";
import { BackgroundBlur } from "./bg.ui";
import type {
  drawerStateAttributes,
  draywerAttributes,
} from "../types.declarationts";

export function DrawerUIComponent(props: draywerAttributes) {
  const { children, drawerState, setDrawerState, isFullDarkBG } = props;

  return (
    <>
      <div
        className={`w-full h-96 z-10  fixed  animate-slide-down  ${
          !drawerState?.isOpen && "hidden"
        }  flex  top-0 fixed`}
      >
        <span
          onClick={() =>
            setDrawerState({
              ...(drawerState as drawerStateAttributes),
              isOpen: !drawerState?.isOpen,
            })
          }
          className="cursor-pointer !mt-5 !pr-5 absolute right-0"
        >
          <IconUIComponent icon="ri-menu-line" className=" !text-white" />
        </span>
        <div className="w-full   flex justify-end !px-5 md:!px-10">
          {children}
        </div>
      </div>

      <BackgroundBlur
        isBackground={true}
        isVisible={drawerState?.isOpen}
        isFullDarkBG={isFullDarkBG}
      />
    </>
  );
}
