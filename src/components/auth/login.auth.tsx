import OptimizedImage from "../../utilities/UI/image.ui";
import { LayoutComponent } from "../layouts/layout.general";
import loginImg from "../../assets/signImg.png";
import vextorImg from "../../assets/Vector.png";
import { TextUIComponent } from "../../utilities/UI/texts.ui";
import { FormUIComponent } from "../../utilities/UI/form.ui";
import { InputUIComponent } from "../../utilities/UI/input.ui";
import { ButtonUIComponent } from "../../utilities/UI/button.ui";
import { useCustomQuery, useHttpFetcher } from "../../hooks/custom.hook";
import { loginData } from "../../utilities/data";
import { useContext, useState } from "react";
import type {
  customInputOnchangeDataAttributes,
  LoginComponentStateAttributes,
  LoginDataAttributes,
  userAttributes,
  userRoleAttributes,
} from "../../utilities/types.declarationts";
import { UserContext } from "../../contexts/user/user.context";
import { useNavigate } from "react-router-dom";
import { isAdminValidation } from "../../utilities/helper.function";
import { GoogleAuthComponent } from "./google.auth";

export function LoginComponent() {
  const { generateQuery } = useCustomQuery();
  const { userDispatch } = useContext(UserContext);
  const { fetchIt } = useHttpFetcher();
  const navigate = useNavigate();
  const [loginComponentState, setLoginComponentState] =
    useState<LoginComponentStateAttributes>({
      logInData: { email: "", password: "" },
    });

  const handleForgot = async () => {
    generateQuery({ path: `/auth/otp`, query: { screenname: "sendOtp" } });
  };

  const handleLogin = async () => {
    const reqData = {
      email: loginComponentState?.logInData?.email,
      password: loginComponentState?.logInData?.password,
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
      const { isValid } = isAdminValidation({
        userRole: payload?.user?.role as userRoleAttributes,
      });

      if (isValid) {
        navigate("/dashboard/subscription");
      } else {
        navigate("/dashboard/user");
      }
      return;
    } catch (error) {
      return;
    }
  };

  return (
    <LayoutComponent>
      <section className="w-full h-full flex justify-center">
        <div className="w-full lg:w-3/5">
          <span className="w-full h-14 flex !px-[150px]  max-[380px]:!px-0 max-[380px]:justify-center">
            <OptimizedImage
              imageData={vextorImg}
              alt="MIT+ vextor"
              style={{ objectFit: "contain" }}
              className="w-14"
            />
          </span>

          <TextUIComponent
            type="h2"
            text="Welcome Back "
            className="!text-primary"
          />
          <TextUIComponent
            type="p"
            text="Please sign in to continue"
            className="!mt-5 !text-primay-very-dark"
          />

          <FormUIComponent
            onSubmit={handleLogin}
            className="w-full h-fit !pt-[40px]"
          >
            {loginData?.map((item, index) => (
              <span key={index}>
                <InputUIComponent
                  key={String(index)}
                  isRequired={false}
                  label={item.name}
                  value={
                    loginComponentState.logInData[
                      item?.type as keyof LoginDataAttributes
                    ]
                  }
                  type={
                    item.type === "password"
                      ? "password"
                      : item.type === "email"
                      ? "email"
                      : "text"
                  }
                  placeholder={item.placeholder}
                  name={item.type}
                  onChange={(data: customInputOnchangeDataAttributes) =>
                    setLoginComponentState((prev) => ({
                      ...prev,
                      logInData: {
                        ...prev?.logInData,
                        [item?.type]: data?.value,
                      },
                    }))
                  }
                  className="w-full h-[55px] border-gray-300 bg-white !rounded-[12px] text-[17px] !placeholder-black"
                />
              </span>
            ))}

            <div className="w-full h-10 !mt-3 flex items-center justify-end gap-4">
                <TextUIComponent
                  type="p"
                  text="Forgot password?"
                  onClick={handleForgot}
                  className="!text-primary cursor-pointer"
                />
            </div>

            <div className="w-full h-[52px] !mt-5">
              <ButtonUIComponent
                type="submit"
                text="Log In"
                className="w-full !rounded-[13px]"
              />
            </div>
          </FormUIComponent>

          <span className="w-full h-10 flex !mt-10 items-center !space-x-5 justify-center">
            <hr className="h-[1.5px] w-[200px] max-[557px]:w-[130px] max-[446px]:w-[80px] bg-gray-500" />
            <TextUIComponent
              type="p"
              className="!text-primay-very-dark"
              text={`or log in with`}
            />
            <hr className="h-[1.5px] w-[200px] max-[557px]:w-[130px] max-[446px]:w-[80px] bg-gray-500" />
          </span>
<GoogleAuthComponent />
          <div className="w-full h-5 flex justify-center items-center !mt-10">
            <TextUIComponent type="p" text={`Don't have an account?`} />
            <TextUIComponent
              onClick={() => navigate(`/auth/register`)}
              type="h4"
              text={`Sign up`}
              className="!text-primary !ml-2 cursor-pointer"
            />
          </div>
        </div>

        <div className="w-2/5 h-full hidden lg:flex lg:items-center justify-center">
          <OptimizedImage
            imageData={loginImg}
            alt="MIT+ Login"
            className="w-3/4"
            style={{ objectFit: "cover" }}
          />
        </div>
      </section>
    </LayoutComponent>
  );
}
