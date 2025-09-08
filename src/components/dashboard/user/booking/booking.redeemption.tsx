import { useContext, useRef, useState, type ReactNode } from "react";
import {
  useCustomQuery,
  useHttpFetcher,
  useNotificationHook,
  useSWRHook,
} from "../../../../hooks/custom.hook";
import type {
  IncludedNonIncludedAttributes,
  tripSubPackages,
  tripSubscriptionPlatformResponseData,
  userAttributes,
} from "../../../../utilities/types.declarationts";
import { ButtonUIComponent } from "../../../../utilities/UI/button.ui";
import { ComponetDataDisplayer } from "../../../../utilities/UI/data.display.ui";
import OptimizedImage from "../../../../utilities/UI/image.ui";
import {
  TextUIComponent,
  TitleUIComponent,
} from "../../../../utilities/UI/texts.ui";
import { CardUIComponent } from "../../../../utilities/UI/card.ui";
import {
  convertDate,
  formatToTitleCase,
  isValidDate,
} from "../../../../utilities/helper.function";

import { ReadMoreComponent } from "../../../../utilities/UI/readmore.ui";
import { NewSliderComponent } from "../../../../utilities/UI/slider.ui";
import { InncludedNonIncluded } from "./included.booking";
import { TripPackagesSection } from "./package.booking";
import { TripAddOnsSection } from "./addon.booking";
import { OrganizationSection } from "./orginaziation.booking";
import { CustomImageGallery } from "../../../gallery/custom.gallery";
import { RedeemCheckOut } from "./Redeem/redeem.index";
import { UserContext } from "../../../../contexts/user/user.context";
import { LogInWarning } from "./Redeem/loginWarning";

interface ComponentContainerProps {
  children: ReactNode;
  className?: string;
}

export const ComponentContainer = ({
  children,
  className,
}: ComponentContainerProps) => {
  return (
    <div className={`customContainer w-full ${className}`}>{children}</div>
  );
};

export function TripLiveBookingComponent() {
  const { getQueryValue } = useCustomQuery();
  const tripId = getQueryValue("tripid") as string;
  const { notify } = useNotificationHook();
  const { userState, userDispatch } = useContext(UserContext);
  const { fetchIt } = useHttpFetcher();
  const [tripLiveState, setTripLiveState] = useState<{
    modalState: boolean;
    logInWarning?: boolean;
  }>({
    modalState: false,
    logInWarning: false,
  });
  const { fetchData, fetchIsLoading } = useSWRHook({
    apiEndPoint: `customer/trip/${tripId}`,
    cacheKey: `customer/trip/${tripId}`,
  });
  const { fetchData: backendDate } = useSWRHook({
    apiEndPoint: "date",
    cacheKey: "date",
  });

  const tripData = fetchData?.payload as tripSubscriptionPlatformResponseData;
  const scrollRef = useRef<null | HTMLDivElement>(null); //To scroll to the target div
  const handleBookingScrool = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleOrderState = () => {
    if (!userState?.user?._id) {
      setTripLiveState((prev) => ({ ...prev, logInWarning: true }));
      return;
    }
    setTripLiveState((prev) => ({ ...prev, modalState: true }));
    return;
  };

  const handleLogin = async (data: { email: string; password: string }) => {
    const { email, password } = data;
    if (!email || !password) {
      return notify({
        notificationText: "Password and email fields are required",
        notificationState: true,
      });
    }
    const reqData = {
      email,
      password,
      strategy: "local",
    };
    try {
      const res = await fetchIt({
        apiEndPoint: `auth/login`,
        httpMethod: "post",
        reqData,
        isSuccessNotification: {
          notificationText: "",
          notificationState: false,
        },
      });
      const payload = res?.payload as {
        token: string;
        user: userAttributes;
      };
      userDispatch({ type: "SET_USER", payload: payload?.user });
      userDispatch({ type: "SET_TOKEN", payload: payload?.token });
      setTripLiveState((prev) => ({ ...prev, logInWarning: false }));
    } catch (error) {
      return;
    }
  };

  return (
    <>
      <LogInWarning
        logInWarningModal={tripLiveState?.logInWarning as boolean}
        closeLogInModal={() =>
          setTripLiveState((prev) => ({ ...prev, logInWarning: false }))
        }
        onClick={(data: { email: string; password: string }) =>
          handleLogin(data)
        }
      />

      <RedeemCheckOut
        tripsData={tripData}
        modalState={tripLiveState?.modalState}
        closeModal={() =>
          setTripLiveState((prev) => ({ ...prev, modalState: false }))
        }
      />

      <section>
        <ComponetDataDisplayer
          error={!tripData?._id ? "Selected Trip Not Found" : ""}
          loading={fetchIsLoading}
        >
          <section className="w-full flex flex-col relative ">
            {/* Hero Section */}
            <section className="w-full h-[400px] lg:h-[650px] relative">
              <div className="h-full w-full">
                <OptimizedImage
                  imageData={tripData?.tripImages[0]}
                  alt=""
                  style={{ objectFit: "cover", height: "100%" }}
                />
                {/* Gradient overlay */}
                <div
                  className="absolute bottom-0 w-full h-[60%] "
                  style={{
                    background:
                      "linear-gradient(rgba(255,255,255,0) 20%, rgba(0,0,0,1))",
                  }}
                ></div>
                <ComponentContainer>
                  <div className="w-full relative ">
                    {/* Trip title */}
                    <div className="absolute bottom-10 left-4 bg-opacity-50 !p-3 rounded-md">
                      <TitleUIComponent
                        type="h2"
                        className="!text-white"
                        text={`${tripData?.tripName || "Trip Name"}`}
                      />
                    </div>

                    {/* Desktop Get Started card */}
                    <div className="absolute hidden bottom-4 right-4 bg-white rounded-xl shadow-xl !p-6 lg:flex flex-col md:flex-row items-center gap-4 max-w-sm">
                      <TitleUIComponent
                        type="h5"
                        className="text-lg font-semibold text-gray-900"
                        text="Get Started"
                      />
                      <ButtonUIComponent
                        onClick={handleBookingScrool}
                        text="Book Now"
                        className="bg-primary text-white !py-2 !px-6 rounded-lg hover:bg-primary-dark transition-colors"
                      />
                    </div>
                  </div>
                </ComponentContainer>
              </div>
            </section>

            {/* Content Sections */}
            <ComponentContainer className="!mt-10">
              <section className="w-full flex items-center justify-center gap-5 flex-col lg:flex-row">
                <CardUIComponent
                  icon="ri-calendar-line"
                  className="bg-secondary-red-6 !border-dark-light-38 w-full md:w-[40%] h-[170px]"
                  title="Tour Dates"
                  titleClassName="!text-xl !pb-1"
                  valueClassName=" !pb-1 text-center !text-sm md:!text-lg"
                  value={`${
                    isValidDate(tripData?.startDate as string)
                      ? convertDate({
                          date: tripData?.startDate as string,
                          isFortmat: true,
                        })
                      : "Dates TBA"
                  } to ${
                    isValidDate(tripData?.endDate as string)
                      ? convertDate({
                          date: tripData?.endDate as string,
                          isFortmat: true,
                        })
                      : "Dates TBA"
                  }`}
                />
                <CardUIComponent
                  icon="ri-team-fill"
                  className=" !border-dark-light-38 w-full md:w-[40%] h-[170px]"
                  title="Exciting Group"
                  titleClassName="!text-xl !pb-1"
                  valueClassName="!text-sm md:!text-lg !pb-1"
                  value={`Meet Others like you`}
                />

                <CardUIComponent
                  icon="ri-map-pin-line"
                  className="bg-dark-light-38 !border-dark-light-38 w-full md:w-[40%] h-[170px]"
                  title="Tour Destination"
                  titleClassName="!text-xl !pb-1"
                  valueClassName="!text-sm md:!text-lg !pb-1"
                  value={`${formatToTitleCase(tripData?.destination)}`}
                />
              </section>
            </ComponentContainer>

            <ComponentContainer className="!mt-12">
              <section>
                <TitleUIComponent type="h3" text="About Trip" />

                <div className="!mt-6">
                  <ReadMoreComponent
                    limit="300"
                    text={tripData?.description as string}
                    textDisplayer="richText"
                  />
                </div>
              </section>
            </ComponentContainer>

            <ComponentContainer className="!mt-10 w-full">
              {tripData?.istripItinarary &&
                Array.isArray(tripData?.tripItinarary) &&
                tripData?.tripItinarary?.length > Number(0) && (
                  <section className="w-full flex flex-col h-auto bg-gray-50 pb-5  mt-16 print:flex print:px-0 ">
                    <div className=" flex flex-col py-5">
                      <div className="w-full justify-center flex mt-4 lg:mt-10">
                        <span className="text-primary-headerTextColor  font-bold">
                          <TitleUIComponent
                            type="h6"
                            className="  mt-5 px-5"
                            text="Trip Itinerary"
                          />
                        </span>
                      </div>

                      <div className="mt-10 pb-0 ">
                        <NewSliderComponent
                          payload={tripData?.tripItinarary || []}
                        />
                      </div>
                    </div>
                  </section>
                )}
            </ComponentContainer>

            <section className=" w-full !pb-10">
              <ComponentContainer>
                <InncludedNonIncluded
                  icon="ri-checkbox-circle-line"
                  data={
                    tripData?.tripIncludedItem as IncludedNonIncludedAttributes[]
                  }
                  title="Trip Includes"
                />
              </ComponentContainer>
            </section>

            <section className=" w-full !pb-10">
              <ComponentContainer>
                <InncludedNonIncluded
                  icon="ri-close-circle-line"
                  data={
                    tripData?.tripNotIncludedItem as IncludedNonIncludedAttributes[]
                  }
                  title="Trip Does Not Include"
                  iconClassName="!text-gray-300"
                />
              </ComponentContainer>
            </section>

            <section className="" ref={scrollRef}>
              <ComponentContainer>
                <TripPackagesSection
                  packages={tripData?.tripPackages as tripSubPackages[]}
                  userResult={tripData?.tripOwnerProfile}
                  response={tripData}
                  dateBackend={backendDate?.payload as string}
                  onBookNow={handleOrderState}
                />
              </ComponentContainer>
            </section>

            <section className="">
              <ComponentContainer>
                <TripAddOnsSection
                  title="Add On"
                  addOns={tripData?.tripAddOns}
                />
              </ComponentContainer>
            </section>

            <section>
              <OrganizationSection
                user={tripData?.tripOwnerProfile}
                showLogo={false}
              />
            </section>

            <section className="w-full flex flex-col bg-white !pb-10 !mt-10">
              <ComponentContainer>
                <div className="  w-full  flex flex-col !py-5">
                  <span className=" font-bold">
                    <TitleUIComponent
                      type="h4"
                      className="text-font25 !mt-5"
                      text={`Photo Gallery`}
                    />
                  </span>
                  <div className="w-full  flex mt-3">
                    {tripData?.eventType !== "publish" &&
                    tripData?.tripImages?.length < Number(1) ? (
                      <div className="">
                        <TextUIComponent
                          text="Add images to your trip to appear here"
                          type="p"
                          className="text-primary-lighter"
                        />
                      </div>
                    ) : (
                      <div className="!mt-5 w-full !pb-20 h-auto">
                        <CustomImageGallery images={tripData?.tripImages} />
                      </div>
                    )}
                  </div>
                </div>
              </ComponentContainer>
            </section>

            {/* Mobile sticky button */}
            <div
              className={`fixed bottom-0 left-0 w-full bg-white p-4 border-t border-gray-200 shadow-inner lg:hidden z-10 ${
                tripLiveState?.modalState && "hidden"
              }`}
            >
              <ButtonUIComponent
                text="Book Now"
                onClick={handleBookingScrool}
                className="w-full h-12 bg-primary text-white font-semibold rounded-lg"
              />
            </div>
          </section>
        </ComponetDataDisplayer>
      </section>
    </>
  );
}
