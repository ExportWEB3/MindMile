import { Popover } from "rizzui/popover";
import { ProfilePictureComponent } from "./profile.ui";
import { useState, type ReactNode } from "react";

import { BackgroundBlur } from "./bg.ui";

export function PopOverUIComponent(props: {
  imgURL?: string;
  children: ReactNode;
}) {
  const { imgURL, children } = props;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Popover arrowClassName="hidden" isOpen={isOpen}>
        <Popover.Trigger>
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="w-12 cursor-pointer"
          >
            <ProfilePictureComponent displayDetails={false} imgURL={imgURL} />
          </div>
        </Popover.Trigger>
        <Popover.Content className="z-[6] bg-gray-50 shadow-md ] !py-2 min-w-[150px] border-none !px-2 w-auto max-w-max">
          {() => {
            // Update local state when Popover's setOpen is called

            return (
              <div className="w-full">
                <div className="mb-3 flex items-center gap-3">{children}</div>
              </div>
            );
          }}
        </Popover.Content>
      </Popover>

      <BackgroundBlur isBackground={true} isVisible={isOpen} zIndex="z-0" />
    </>
  );
}
