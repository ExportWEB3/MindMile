import { Box } from "rizzui/box";
import type { objectFitAttributes } from "../types.declarationts";
import { IconUIComponent } from "./icon.ui";
import { TitleUIComponent } from "./texts.ui";

export function ProfilePictureComponent(props: {
  displayDetails: boolean;
  imgURL?: string;
  isReview?: boolean;
  className?: string;
  objectFit?: objectFitAttributes;
  iconClassName?: string;
}) {
  const {
    displayDetails,
    imgURL,
    isReview,
    className,
    objectFit,
    iconClassName,
  } = props;

  return (
    <Box className={`flex  items-center`} as={"div"}>
      <div
        className={`h-8 w-8 md:h-12 flex justify-center items-center md:w-12 round ${className}`}
      >
        {imgURL && !isReview ? (
          <img
            src={""}
            alt="booking system image"
            width="0"
            height="0"
            style={{
              objectFit: "contain",
            }}
            className="w-full h-full rounded-full "
          />
        ) : isReview && imgURL ? (
          <img
            src={imgURL as string}
            alt="flow core"
            width="0"
            height="0"
            style={{
              objectFit: `${objectFit ? objectFit : "contain"}`,
            }}
            className="w-full h-full rounded-full "
          />
        ) : (
          <IconUIComponent
            icon="ri-account-circle-fill"
            className={`text-white  text-4xl ${iconClassName}`}
          />
        )}
      </div>

      <div
        className={`w-auto ml-3 ${!displayDetails && "hidden"}   flex flex-col`}
      >
        <TitleUIComponent type="h4" text={``} className="text-black" />

        <TitleUIComponent
          type="h6"
          text={``}
          className="text-primary-customDark"
        />
      </div>
    </Box>
  );
}
