import { useEffect, useState } from "react";
import { TiptapEditor } from "../../components/TextEditor/texteditor";
import { useMediaQuery } from "../../hooks/custom.hook";
import { convertDate } from "../helper.function";
import type {
  intenararyValueAttributes,
  itinararyPopUpPropsAttributes,
  ItinerarySliderStateAttributes,
} from "../types.declarationts";
import { ModalUIComponent } from "./btnModal.ui";
import { TitleUIComponent } from "./texts.ui";
import { IconUIComponent } from "./icon.ui";
import OptimizedImage from "./image.ui";

export const ItineraryPopUpDisplay = (props: itinararyPopUpPropsAttributes) => {
  const { payload } = props;

  return (
    <ModalUIComponent
      isBottonBorder={true}
      btnClassName="w-36 mt-3"
      btnText="Read More"
    >
      <div className={`  flex  rounded-sm    flex-col `}>
        <span className=" ">
          <TitleUIComponent
            type="h3"
            text={`${payload?.eventTitle}`}
            className="font-semibold"
          />
        </span>

        <TitleUIComponent
          type="h5"
          text={convertDate({
            date: payload?.eventDate as string,
            isFortmat: true,
          })}
          className="text-primary-lighter !mt-3 "
        />
        <span className="text-primary-headerTextColor">
          <TitleUIComponent
            type="h5"
            text={`${payload?.eventName}`}
            className=" !mt-3"
          />
        </span>

        <TiptapEditor
          editable={false}
          textValue={`${payload?.description as string}`}
          editorToolType="no_heading"
          className="!mt-4"
        />
      </div>
    </ModalUIComponent>
  );
};

export const NewSliderComponent = (props: {
  payload: intenararyValueAttributes[];
}) => {
  let phoneScreen = useMediaQuery("(max-width: 1023px)");
  let phoneScreensmall = useMediaQuery("(min-width: 400px)");
  const [sliderComponentState, setSliderComponentState] =
    useState<ItinerarySliderStateAttributes>({
      selectedIndex: 0,
      isPopUpState: false,
      lessThan: 8,
      greaterThan: -1,
    });
  const { payload } = props;

  const handleSlider = (props: { targetIndex: number }) => {
    const { targetIndex } = props;
    setSliderComponentState({
      ...sliderComponentState,
      selectedIndex: targetIndex,
    });
  };

  const handleSlideRight = () => {
    if (sliderComponentState?.lessThan === payload?.length) return;
    setSliderComponentState({
      ...sliderComponentState,
      greaterThan: Number(sliderComponentState?.greaterThan) + 1,
      lessThan: Number(sliderComponentState?.lessThan) + 1,
      selectedIndex: Number(sliderComponentState?.selectedIndex) + 1,
    });
  };

  const handleSlideLeft = () => {
    if (Number(sliderComponentState?.greaterThan) < 0) return;
    setSliderComponentState({
      ...sliderComponentState,
      greaterThan: Number(sliderComponentState?.greaterThan) - 1,
      lessThan: Number(sliderComponentState?.lessThan) - 1,
      selectedIndex: Number(sliderComponentState?.selectedIndex) - 1,
    });
  };

  useEffect(() => {
    if (phoneScreen) {
      setSliderComponentState({ ...sliderComponentState, lessThan: 3 });
    } else {
      setSliderComponentState({
        ...sliderComponentState,
        lessThan: payload?.length < 8 ? payload?.length : 8,
      });
    }
  }, [phoneScreen, phoneScreensmall]);

  return (
    <>
      <div
        className={`w-full flex flex-col relative ${
          sliderComponentState?.isPopUpState && "fixed "
        } !pb-5 `}
      >
        <div className={`flex items-center  relative w-full h-32`}>
          <div
            className={` bg-gray-50 h-full absolute right-0 ${
              sliderComponentState?.greaterThan === payload?.length - 1 &&
              "hidden"
            }`}
          >
            <span
              onClick={handleSlideRight}
              className="text-xl   cursor-pointer"
            >
              <IconUIComponent
                icon="ri-arrow-right-wide-line"
                className="text-primary-headerTextColor text-2xl"
              />
            </span>
          </div>

          <div
            className={`w-16 bg-gray-50 h-full absolute left-0 ${
              sliderComponentState?.greaterThan === payload?.length - 1 &&
              "hidden"
            }`}
          >
            <span
              onClick={handleSlideLeft}
              className="text-xl  right-0  cursor-pointer"
            >
              <IconUIComponent
                icon="ri-arrow-left-wide-line"
                className="text-primary-lighter text-2xl"
              />
            </span>
          </div>
          {payload?.map((item, index) => {
            if (
              index > Number(sliderComponentState?.greaterThan) &&
              index < Number(sliderComponentState?.lessThan)
            ) {
              return (
                <div
                  key={item?.eventTitle + index}
                  className={` w-full relative  !ml-4 `}
                >
                  <span
                    className={`w-full cursor-pointer flex justify-center border-b  text-primary-headerTextColor ${
                      index === sliderComponentState?.selectedIndex &&
                      "border-primary text-primary-headerTextColor"
                    }`}
                    key={item?.eventTitle + index}
                    onClick={() => handleSlider({ targetIndex: index })}
                  >
                    <TitleUIComponent
                      type="h6"
                      text={`Day ${Number(index) + Number(1)}`}
                      className="text-font15"
                    />
                  </span>
                </div>
              );
            }
          })}
        </div>

        <div className={`w-full flex flex-col md:flex-row items-center`}>
          {payload?.map((item, index) => {
            if (sliderComponentState?.selectedIndex === index) {
              return (
                <div
                  key={item?.eventName + index}
                  className={`w-full h-auto flex  flex-col md:flex-row  justify-between`}
                >
                  <div
                    className={`w-full md:w-[35%] h-56 flex md:h-[300px] ${
                      phoneScreensmall && "h-80"
                    }`}
                  >
                    <OptimizedImage
                      imageData={(item?.eventImageURL as string) || ""}
                      alt="MIT"
                      className="rounded-lg"
                    />
                  </div>
                  <div
                    className={`w-full md:w-[48%] lg:w-[63%] !mt-10 md:!mt-0 flex flex-col h-96 `}
                  >
                    <span className="text-primary-headerTextColor">
                      <TitleUIComponent
                        type="h4"
                        text={`${item?.eventTitle}`}
                        className=" font-semibold"
                      />
                    </span>
                    <TitleUIComponent
                      type="h6"
                      text={convertDate({
                        date: item?.eventDate as string,
                        isFortmat: true,
                      })}
                      className=" !mt-3 "
                    />
                    <div className="!mt-2">
                      <span className="">
                        <TitleUIComponent
                          type="h6"
                          text={`${item?.eventName}`}
                          className=""
                        />
                      </span>

                      <div className="!mt-4">
                        <TiptapEditor
                          editable={false}
                          textValue={`${
                            Number(item?.description?.length) < Number(100)
                              ? item?.description
                              : item?.description?.slice(0, 200) + `...`
                          }`}
                          editorToolType="no_heading"
                        />
                      </div>
                    </div>

                    <div className="!mt-5">
                      <ItineraryPopUpDisplay
                        itinaryPopUpState={sliderComponentState}
                        setItinaryPopUPState={setSliderComponentState}
                        payload={item}
                      />
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </>
  );
};
