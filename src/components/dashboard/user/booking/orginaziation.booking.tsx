import type { profileResponseAttributes } from "../../../../utilities/types.declarationts";
import { IconUIComponent } from "../../../../utilities/UI/icon.ui";
import { ProfilePictureComponent } from "../../../../utilities/UI/profile.ui";
import { ReadMoreComponent } from "../../../../utilities/UI/readmore.ui";
import {
  TextUIComponent,
  TitleUIComponent,
} from "../../../../utilities/UI/texts.ui";
import { ComponentContainer } from "./booking.redeemption";

interface OrganizationSectionProps {
  user: profileResponseAttributes;
  showLogo?: boolean;
}

export const OrganizationSection = ({
  user,
  showLogo = false,
}: OrganizationSectionProps) => {
  if (!user) return null;

  return (
    <section className="w-full flex flex-col bg-primary pb-10 mt-5 print:flex print:px-0">
      <div className="w-full flex flex-col py-5">
        {/* Header section */}

        <div className="w-full flex !mt-10 border-b border-white !pb-5">
          <ComponentContainer>
            <div className="w-full flex flex-col">
              <div className="w-full flex md:w-10/12 justify-center sm:justify-start publishedTripContainer">
                <span className="font-bold flex items-center md:px-7">
                  {showLogo && (
                    <ProfilePictureComponent
                      imgURL="https://res.cloudinary.com/maximumimpactbooking/image/upload/v1718412165/booking/maximum-impact-new-logo_ehljnq.png"
                      isReview={true}
                      displayDetails={false}
                      className=" rounded-full !w-20 !h-20 bg-white"
                    />
                  )}

                  <div className="w-full flex justify-center sm:justify-start items-center print:h-32">
                    <ProfilePictureComponent
                      imgURL={user?.userPicture}
                      isReview={true}
                      displayDetails={false}
                      className=" rounded-full !ml-4 !w-20 !h-20 bg-white"
                    />
                  </div>

                  <TitleUIComponent
                    type="h4"
                    className=" !ml-2 !text-white text-center md:text-left hidden"
                    text="Your Organization"
                  />
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="w-full publishedTripContainer top-14 flex flex-col overflow-hidden print:hidden">
              <div className="w-full flex flex-col !mt-7 items-center justify-center overflow-hidden lg:w-4/5 xl:w-3/4 md:flex-row md:items-start">
                <div className="w-full flex flex-col md:!px-7">
                  {/* Name */}
                  {user?.firstName && (
                    <span className="text-white flex flex-col font-bold">
                      <TitleUIComponent
                        type="h4"
                        className="!mt-5 !text-white text-center sm:text-start md:text-left"
                        text={user?.firstName}
                      />
                    </span>
                  )}

                  {/* About */}
                  {user?.about && (
                    <div className="w-full flex justify-center relative !mt-3">
                      <ReadMoreComponent
                        text={user?.about}
                        limit="500"
                        className="!text-white text-center sm:text-start"
                      />
                    </div>
                  )}

                  {/* Contact Info */}
                  <div className="w-full flex flex-col mt-5 justify-center sm:justify-start">
                    {user?.phoneNumber && (
                      <div className="w-full flex justify-center sm:justify-start lg:flex-row lg:items-center">
                        <IconUIComponent
                          icon="ri-phone-fill"
                          className="!text-white text-xl hidden sm:block"
                        />
                        <TextUIComponent
                          text={user?.phoneNumber}
                          type="p"
                          className="!text-white !ml-2"
                        />
                      </div>
                    )}

                    {user?.website && (
                      <div className="w-full flex justify-center sm:justify-start !mt-2 lg:flex-row lg:items-center">
                        <IconUIComponent
                          icon="ri-pages-line"
                          className="!text-white text-xl hidden sm:block"
                        />
                        <TextUIComponent
                          text={user?.website}
                          type="p"
                          className="text-white !ml-2"
                        />
                      </div>
                    )}

                    {user?.professionalBodyMembership && (
                      <div className="w-full flex !mt-2 lg:flex-row lg:items-center">
                        <IconUIComponent
                          icon="ri-award-fill"
                          className="!text-white text-xl hidden sm:block"
                        />
                        <TextUIComponent
                          text={user?.professionalBodyMembership}
                          type="p"
                          className="!text-white !ml-2 text-center sm:text-start"
                        />
                      </div>
                    )}

                    {user?.address1 && (
                      <div className="w-full flex justify-center sm:justify-start !mt-4 lg:flex-row lg:items-center">
                        <IconUIComponent
                          icon="ri-map-pin-line"
                          className="text-white text-xl hidden sm:block"
                        />
                        <TextUIComponent
                          text={user?.address1}
                          type="p"
                          className="!text-white !ml-2 text-center"
                        />
                      </div>
                    )}

                    {user?.address2 && (
                      <div className="w-full flex justify-center sm:justify-start !mt-2 lg:flex-row lg:items-center">
                        <IconUIComponent
                          icon="ri-map-pin-line"
                          className="text-white text-xl"
                        />
                        <TextUIComponent
                          text={user?.address2}
                          type="p"
                          className="text-white !ml-2"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </ComponentContainer>
        </div>
      </div>
    </section>
  );
};
