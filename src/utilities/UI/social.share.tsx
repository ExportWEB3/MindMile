import { FacebookShareButton, TwitterShareButton } from "react-share";
import { IconUIComponent } from "./icon.ui";
import type { ShareSocialAttribute } from "../types.declarationts";

export function ShareSocialComponent(props: ShareSocialAttribute) {
  const { url, title, hashtags, popUp, setPopUp, isShowEmail, className } =
    props;

  function handleSendMessage() {
    setPopUp(true);
  }

  return (
    <>
      <div
        className={`${
          popUp && "w-full overscroll-none overflow-hidden fixed h-screen  "
        } ${popUp && "hidden"} text-base flex pt-2 pb-1 ${className}`}
      >
        <FacebookShareButton url={url}>
          <IconUIComponent icon="ri-facebook-fill" className={` text-2xl`} />
        </FacebookShareButton>

        <TwitterShareButton url={url} title={title} hashtags={hashtags}>
          <IconUIComponent
            icon="ri-twitter-x-fill"
            className={`ml-3 text-2xl`}
          />
        </TwitterShareButton>

        {isShowEmail && (
          <span className="cursor-pointer" onClick={handleSendMessage}>
            <IconUIComponent icon="ri-mail-line" className={`text-2xl ml-3 `} />
          </span>
        )}
      </div>
    </>
  );
}
