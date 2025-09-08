import OptimizedImage from "../../utilities/UI/image.ui";
import signupImg from "../../assets/signImg.png";
import { TextUIComponent, TitleUIComponent } from "../../utilities/UI/texts.ui";
import { agreementText, registerData } from "../../utilities/data";

import { InputUIComponent } from "../../utilities/UI/input.ui";
import { FormUIComponent } from "../../utilities/UI/form.ui";
import { ButtonUIComponent } from "../../utilities/UI/button.ui";
import { LayoutComponent } from "../layouts/layout.general";
import {
  useCustomQuery,
  useHttpFetcher,
  useNotificationHook,
} from "../../hooks/custom.hook";
import { useState } from "react";
import type {
  customInputOnchangeDataAttributes,
  RegisterUserComponetStateAttributes,
  RegUserDataAttributes,
  userAttributes,
} from "../../utilities/types.declarationts";
import { AxiosError } from "axios";
import { GoogleAuthComponent } from "./google.auth";

export function SignupComponent() {
  const { generateQuery } = useCustomQuery();
  const { notify } = useNotificationHook();
  const { fetchIt } = useHttpFetcher();

  const [signupComponentState, setSignUpComponentState] =
    useState<RegisterUserComponetStateAttributes>({
      regUser: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        isAggreed: false,
        isMITAffiliate: false,
        mitAffiliateID: "",
        phoneNumber: "",
      },
    });

  const handleInput = (params: customInputOnchangeDataAttributes) => {
    const { value, name } = params;
    const key = name as keyof RegUserDataAttributes;
    setSignUpComponentState((prev) => ({
      ...prev,
      regUser: { ...prev?.regUser, [key]: value },
    }));
  };

  const handleSubmitReg = async () => {
    if (
      signupComponentState?.regUser?.isMITAffiliate &&
      !signupComponentState?.regUser?.mitAffiliateID.trim()
    ) {
      return notify({
        notificationText:
          "As an MIT Affiliate, kindly provide your MIT Affiliate ID",
      });
    }
    const userData = signupComponentState?.regUser || {};
    const regData: userAttributes = {
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      email: userData?.email,
      password: userData?.password,
      isAggreedTermsAndCondition: userData?.isAggreed,
      isMITAffiliate: userData?.isMITAffiliate,
      mitAffiliateID: userData?.mitAffiliateID,
      phoneNumber: userData?.phoneNumber,
    };
    try {
      const res = await fetchIt({
        apiEndPoint: "auth/create",
        reqData: regData,
        httpMethod: "post",
        isSuccessNotification: {
          notificationText: "",
          notificationState: false,
        },
      });
      const userId = res?.payload as { userId: string };

      if (res?.statusCode === 200) {
        generateQuery({
          path: `/onboarding`,
          query: { screenname: "welcome", userid: userId?.userId },
        });
      }
      return;
    } catch (error) {
      return;
    }
  };

  return (
    <LayoutComponent>
      <section className="w-full h-full flex  justify-center">
        <div className="w-full lg:w-3/5">
          <TitleUIComponent
            type="h2"
            text={`Sign Up to create your account `}
            className="!text-primary"
          />

          <TextUIComponent
            text="Join the MIT travel subscription program to start earning and redeeming travel points"
            type="p"
            className="!mt-5"
          />

          <FormUIComponent
            onSubmit={handleSubmitReg}
            className="w-full h-fit !pt-[40px]"
          >
            {registerData?.map((item, index) => (
              <div className="!mt-3" key={index}>
                <InputUIComponent
                  key={String(index)}
                  label={item.field}
                  isRequired={true}
                  type={
                    item.name === "password"
                      ? "password"
                      : item.name === "email"
                      ? "email"
                      : "text"
                  }
                  placeholder={item?.placeHolder}
                  name={item.name}
                  className="w-full h-[55px] border-gray-300 bg-white !rounded-[12px] text-[17px] !placeholder-black pl-5"
                  onChange={(data: customInputOnchangeDataAttributes) =>
                    handleInput(data)
                  }
                  value={
                    signupComponentState?.regUser[
                      item?.name as keyof RegUserDataAttributes
                    ] as string
                  }
                />
              </div>
            ))}

            <div className="w-full h-32 !mt-4 bg-gray-300 rounded-xl !px-10 !py-5">
              <TextUIComponent
                type="h4"
                text="Password requirements:"
                className="text-[17px]"
              />
              <ul className="!ml-5 !mt-2 space-y-2">
                <li>At least 8 characters</li>
                <li>Include uppercase letter, number, and special character</li>
              </ul>
            </div>

            <div className="w-full  rounded-xl !mt-4">
              <TextUIComponent
                type="h3"
                text="Are you an MIT affiliate?"
                className="!text-primay-very-dark"
              />
              <div className="w-full h-10 flex !mt-5 gap-4">
                <ButtonUIComponent
                  type="button"
                  text="Yes"
                  onClick={() =>
                    setSignUpComponentState((prev) => ({
                      ...prev,
                      regUser: { ...prev.regUser, isMITAffiliate: true },
                    }))
                  }
                  className={`w-36 h-full rounded-full border border-gray-300 flex items-center justify-center
                      ${
                        signupComponentState?.regUser?.isMITAffiliate
                          ? "bg-primary text-white"
                          : "bg-white text-black"
                      }`}
                />

                <ButtonUIComponent
                  type="button"
                  text="No"
                  onClick={() =>
                    setSignUpComponentState((prev) => ({
                      ...prev,
                      regUser: { ...prev.regUser, isMITAffiliate: false },
                    }))
                  }
                  className={`w-36 h-full rounded-full border border-gray-300 flex items-center justify-center
                  ${
                    !signupComponentState?.regUser?.isMITAffiliate
                      ? "bg-primary text-white"
                      : "bg-white text-black"
                  }`}
                />
              </div>

              <div className="!mt-4">
                <InputUIComponent
                  type="text"
                  name="MIT ID"
                  label="MIT ID Number"
                  placeholder="Enter your MIT Affiliate ID"
                  className="bg-white "
                  onChange={(data: customInputOnchangeDataAttributes) =>
                    setSignUpComponentState((prev) => ({
                      ...prev,
                      regUser: {
                        ...prev?.regUser,
                        mitAffiliateID: data?.value as string,
                      },
                    }))
                  }
                />
              </div>
            </div>

            <div className="w-full h-10 !mt-3 flex items-center gap-2 !pl-5">
              <InputUIComponent
                type="checkbox"
                name=""
                isCheckedState={true}
                className="!w-fit !h-fit accent-[#AA871D] border-none cursor-pointer"
                onChange={(data: customInputOnchangeDataAttributes) => {
                  setSignUpComponentState((prev) => ({
                    ...prev,
                    regUser: {
                      ...prev?.regUser,
                      isAggreed: data?.value as boolean,
                    },
                  }));
                }}
              />
              <div className="flex flex-wrap gap-1">
                {agreementText.map((item, index) => (
                  <TextUIComponent
                    key={index}
                    type="p"
                    text={item.text}
                    className={item.color}
                  />
                ))}
              </div>
            </div>

            <div className={`w-full h-[52px]`}>
              <ButtonUIComponent
                type="submit"
                text="Sign Up"
                className="w-full !rounded-[13px] !mt-5"
              />
            </div>
          </FormUIComponent>

          <div className={`w-full h-5 flex justify-center !mt-16`}>
            <TextUIComponent type="p" text={`Already have an account?`} />
            <TextUIComponent
              type="h4"
              text={`Sign in`}
              className="!text-primary !ml-2"
            />
          </div>

          <span className="w-full h-10 flex !mt-7 items-center !space-x-5 justify-center">
            <hr className="h-[1.5px] w-[200px] bg-gray-500" />
            <TextUIComponent type="p" text={`or`} />
            <hr className="h-[1.5px] w-[200px] bg-gray-500" />
          </span>
<GoogleAuthComponent />
        </div>

        <div className="w-2/5 h-full hidden lg:flex lg:items-center justify-center">
          <OptimizedImage
            imageData={signupImg}
            alt="MIT+ Signup"
            className="w-3/4"
            style={{ objectFit: "cover" }}
          />
        </div>
      </section>
    </LayoutComponent>
  );
}
