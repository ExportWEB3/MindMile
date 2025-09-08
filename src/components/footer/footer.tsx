import { useState } from "react";
import { TextUIComponent, TitleUIComponent } from "../../utilities/UI/texts.ui";
import { Link } from "react-router-dom";
import { IconUIComponent } from "../../utilities/UI/icon.ui";
import { ShareSocialComponent } from "../../utilities/UI/social.share";
import { clientURL } from "../../utilities/baseURL";
import logo from "../../assets/impact.webp";
import logo2 from "../../assets/demo-logo.png";
import backgroundImg from "../../assets/homebackground.png?url";

import { InputUIComponent } from "../../utilities/UI/input.ui";
import { ButtonUIComponent } from "../../utilities/UI/button.ui";
import landingPageIcon from "../../assets/landingpage7.png";
import landingPageIcon5 from "../../assets/landingpageicon5.png";
import OptimizedImage from "../../utilities/UI/image.ui";

export function FooterComponent() {
  const [popUp, setPopUp] = useState(false);

  return (
    <>
      <section
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          margin: "auto",
        }}
        className={` w-full !pt-5 print:hidden `}
      >
        <div className=" flex flex-col items-center customContainerModified   justify-center ">
          <div className="w-full flex flex-col justify-between items-center !pb-8 md:flex-row">
            <div className="w-full flex flex-col  h-full lg:w-1/3 !px-3 lg:!px-0">
              <OptimizedImage
                alt={"maximum impact"}
                imageData={import.meta.env.PROD ? logo : logo2}
                style={{ objectFit: "contain" }}
                className={`w-40 !pb-3 `}
              />

              <TitleUIComponent
                type="h4"
                text={`About`}
                className=" w-full  text-primary-lighter"
              />
              <span>
                <TextUIComponent
                  type="p"
                  text={`MIT Subscription is a platform that allows you buy points that can be used to order any of our travel packages`}
                  className="w-full lg:w-72  !mt-4 text flex  customNoWhiteSPace"
                />
              </span>
            </div>

            <div className="w-full flex flex-col h-full lg:w-1/6">
              <TitleUIComponent
                type="h4"
                text={`Quick Links`}
                className="leading-7 w-full  text-primary-dark !mt-5 md:!mt-0"
              />

              <div className={`w-full flex flex-col !mt-2`}>
                {[
                  { name: "Home", link: "/" },
                  { name: "Dashboard", link: "/dashboard" },
                  { name: "Contact", link: "/contact" },
                ].map((item, index) => (
                  <Link to={item?.link} key={index}>
                    <TextUIComponent
                      key={index}
                      type="p"
                      text={item?.name}
                      className="leading-7 w-full md:!mt-2  text-primary-lighter"
                    />
                  </Link>
                ))}
              </div>
            </div>

            <div className="w-full flex flex-col h-full lg:w-1/6 !mt-5 md:!mt-0">
              <TitleUIComponent
                type="h4"
                text={`Destinations`}
                className="leading-7 w-full  text-primary-dark"
              />

              <div className={`w-full flex flex-col !mt-2`}>
                <div className={`w-full md:!mt-2`}>
                  {["Ghana", "South Africa", "Egypt", "Tanzania"].map(
                    (item, index) => (
                      <span key={index}>
                        <TextUIComponent
                          key={index}
                          type="p"
                          text={item}
                          className="leading-7 w-full  text-primary-dark"
                        />
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className=" justify-end flex-col flex h-full w-full lg:w-1/6 !mt-4 md:!mt-0 ">
              <TitleUIComponent
                type="h4"
                text={`Contact`}
                className="leading-7 w-full flex  text-primary-dark"
              />

              <div className={`w-full flex-col  customNoWhiteSPace `}>
                <div className={`w-full flex items-center !mt-3`}>
                  <IconUIComponent
                    icon="ri-phone-line"
                    className="text-primary-lighter !text-xl"
                  />
                  <TextUIComponent
                    type="p"
                    text="+1-888-760-TRIP (8747)"
                    className="text-primary-lighter !ml-2"
                  />
                </div>

                <div className={`w-full flex items-center !mt-3`}>
                  <IconUIComponent
                    icon="ri-mail-line"
                    className="text-primary-lighter text-xl"
                  />
                  <TextUIComponent
                    type="p"
                    text="info@maximumimpacttravel.com"
                    className="text-primary-lighter !ml-2"
                  />
                </div>
              </div>
              <div className={`flex  !mt-3`}>
                <ShareSocialComponent
                  title="Maximum Impact Travel pro"
                  url={clientURL}
                  popUp={popUp}
                  setPopUp={setPopUp}
                  isShowEmail={false}
                />
              </div>
            </div>
          </div>

          <div className="w-full flex-col items-center justify-center !py-3 !mt-3 ">
            <TextUIComponent
              className="text-center"
              type="p"
              text="All right reserved by Maximum Impact Travel"
            />

            <p className={` hidden  text-gray-300 ml-1  `}>
              Software developed by Valve Tech
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export function EarningFooterSection() {
  return (
    <>
      <section
        className={` flex w-full flex-col lg:justify-between bg-primary relative lg:flex-row  `}
      >
        <div
          className={`w-64  left-0 lg:w-1/5 h-full hidden absolute md:flex  justify-start lg:relative`}
        >
          <div
            className={`w-10 z-10 absolute left-0 bg-primary h-full lg:w-14`}
          ></div>
          <OptimizedImage
            imageData={landingPageIcon5}
            alt="MIT+ Logo"
            style={{ objectFit: "contain" }}
            className={`w-44 absolute mt-4 left-0 lg:top-0 lg:w-72 opacity-45`}
          />
        </div>
        <div
          className={`w-full flex flex-col items-center lg:justify-center !px-5 lg:w-3/5  `}
        >
          <div
            className={`flex text-center justify-center w-full !mt-10 lg:w-auto lg:text-start`}
          >
            <TitleUIComponent
              type="h3"
              text={`Start Earning Today`}
              className="leading-7 w-full  !text-white"
            />
          </div>

          <div className={`flex w-full justify-center !pt-8 md:w-96 lg:w-auto`}>
            <TextUIComponent
              type="p"
              text={`Subscribe and get latest information sent straight to your inbox`}
              className="!text-white w-full text-center lg:text-start  !mt-4"
            />
          </div>
          <div
            className={`w-full flex flex-col items-center justify-center !mt-5  md:flex-row lg:w-full xl:w-3/4 lg:items-center`}
          >
            <div className="w-full md:w-2/4">
              <InputUIComponent
                className="bg-white border-none outline-none"
                type="email"
                name="email"
              />
            </div>
            <div className="w-full justify-center !pb-5 flex md:w-auto !mt-5 lg:justify-start ">
              <ButtonUIComponent
                text="Submit"
                className="bg-white text-primary  font-semibold md:!ml-3 md:h-16"
                isBorder={true}
              />
            </div>
          </div>
        </div>
        <div className={`w-1/5  h-full relative items-end hidden lg:flex  `}>
          <div className="w-full absolute h-full bg-primary opacity-45"></div>
          <OptimizedImage
            imageData={landingPageIcon}
            alt="MIT+ Logo"
            style={{ objectFit: "contain" }}
            className={`w-96 h-80 `}
          />
        </div>
      </section>
    </>
  );
}
