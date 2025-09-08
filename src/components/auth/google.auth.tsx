import { useNavigate } from "react-router-dom";
import { useHttpFetcher, useNotificationHook, useStateHook } from "../../hooks/custom.hook";
import type { userAttributes } from "../../utilities/types.declarationts";
import { useContext, useRef } from "react";
import { UserContext } from "../../contexts/user/user.context";
import { TitleUIComponent } from "../../utilities/UI/texts.ui";
import { GoogleLogin } from "@react-oauth/google";
import OptimizedImage from "../../utilities/UI/image.ui";
import googleImg from "../../assets/googleImg.png";

export function GoogleAuthComponent() {
  const { fetchIt } = useHttpFetcher();
  const googleLoginRef = useRef<HTMLDivElement>(null);
  const { dispatch, state } = useContext(UserContext) as any;
  const { customUseState, setFalseFunc, setTrueFunc } = useStateHook();
  const navigate = useNavigate();
  const { notify } = useNotificationHook();

const googleSignIn = () => {
  const btn = googleLoginRef.current?.querySelector(
    'div[role="button"]'
  ) as HTMLElement | null;
  if (btn) btn.click();
};

const handleSuccess = async (response: any) => {
  const idToken = response?.credential;

  if (!idToken || typeof idToken !== "string") {
    return notify({
      notificationText: "Google sign-in failed. Please try again.",
    });
  }

  let decodedEmail: string | null = null;
  try {
    const decodedPayload = JSON.parse(atob(idToken.split(".")[1]));
    decodedEmail = decodedPayload?.email || null;
  } catch {
    return
  }

  const reqData = {
    strategy: "google",
    googleToken: idToken,
    email: decodedEmail,
  };

  try {
    const res = await fetchIt({
      apiEndPoint: "google/auth",
      httpMethod: "post",
      reqData,
      isSuccessNotification: {
        notificationText: "",
        notificationState: false,
      },
    });

    if (res?.statusCode === 200) {
      const payload = res?.payload as {
        token: string;
        user: userAttributes;
      };

      dispatch({ type: "SET_USER", payload: payload?.user });
      dispatch({ type: "SET_TOKEN", payload: payload?.token });

      navigate("/dashboard/user");
    }
    return;
  } catch (error) {
    return
  }
};


  return (
    <>
      <div className={`w-full flex flex-col`}>
        <div
          onMouseEnter={() => setTrueFunc()}
          onMouseLeave={() => setFalseFunc()}
          onClick={googleSignIn}
          className={`!mt-10 w-full h-16 transition duration-300 ease-in-out py-1 cursor-pointer border border-gray-300 !px-5 flex justify-center items-center bg-white  rounded-lg ${
            customUseState && "border-2"
          }`}
        >
          <span className="w-10">
            <OptimizedImage
              imageData={googleImg}
              alt="MIT+ google"
              className="w-[40px]"
            />          
            </span>
          <span className="w-11/12 flex justify-center items-center flex-col">
            <TitleUIComponent
              
              className=""
              type="h4"
              text="Sign in with Google"
            />
          </span>
        </div>
        <div
          className="absolute opacity-0 pointer-events-none"
          ref={googleLoginRef}
        >
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => notify({ notificationText: "Google login failed" })}
          />
        </div>
      </div>
    </>
  );
}