import { useEffect, useState } from "react";
import { useCustomQuery, useHttpFetcher } from "../../../hooks/custom.hook";
import type { onboardingScreenEventAttributes } from "../../../utilities/types.declarationts";
import { LayoutComponent } from "../../layouts/layout.general";
import { VerifyOtpComponent } from "./verify.otp";
import { ResetPasswordOtpComponent } from "./resetpassword";
import { AllDoneComponent } from "./alldone";
import { ForgotPasswordOtpComponent } from "./forgotpassword";
import { NotFoundComponent } from "../../Notfound.component";
import { ButtonUIComponent } from "../../../utilities/UI/button.ui";
import { NonBTNModalUIComponent } from "../../../utilities/UI/modal.ui";
import { useNavigate } from "react-router-dom";

export function OtpIndexComponent() {
  const { getQueryValue, generateQuery } = useCustomQuery();
  const { fetchIt } = useHttpFetcher();
  const [modalState, setModalState] = useState(false);
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string>("");

  const getScreenName = getQueryValue("screenname") as string;

  const [formState, setFormState] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });

  const { email, otp, newPassword } = formState;

  const handleCloseModal = () => {
    setModalState(false);
    navigate("/auth/login");
  };

  useEffect(() => {
    if (["sendOtp", "verifyOtp", "resetPassword", "done"].includes(getScreenName)) {
      setModalState(true);
    } else {
      setModalState(false);
    }
  }, [getScreenName]);

  const handleScreenNavigation = (data: { eventName: onboardingScreenEventAttributes }) => {
    const { eventName } = data;
    if (!eventName) return;

    const stepMap: Record<string, number> = {
      sendOtp: 1,
      verifyOtp: 2,
      resetPassword: 3,
      done: 4,
    };
    const currentStep = stepMap[getScreenName] || 1;
    let nextStep = currentStep;

    if (eventName === "goback") {
      nextStep = Math.max(1, currentStep - 1);
    } else if (eventName === "goforward") {
      nextStep = Math.min(6, currentStep + 1);
    }

    const reverseStepMap: Record<number, string> = {
      1: "sendOtp",
      2: "verifyOtp",
      3: "resetPassword",
      4: "done",
    };

    return generateQuery({
      path: `/auth/otp`,
      query: { screenname: reverseStepMap[nextStep] },
    });
  };

  const handleSubmitOtp = async () => {
    try {
      let res: any;
      // send OTP
      if (getScreenName === "sendOtp") {
        res = await fetchIt({
          apiEndPoint: "auth/otp/send",
          reqData: { email },
          httpMethod: "post",
          isSuccessNotification: { notificationText: "", notificationState: false },
        });

        if (res?.statusCode === 200) {
          generateQuery({ path: "/auth/otp", query: { screenname: "verifyOtp" } });
        }
        // verify OTP
      } else if (getScreenName === "verifyOtp") {
        res = await fetchIt({
          apiEndPoint: "auth/otp/verify",
          reqData: { email, otp },
          httpMethod: "post",
          isSuccessNotification: { notificationText: "", notificationState: false },
        });

        const payload = res?.payload as { verified: boolean; userId: string };

        if (res?.statusCode === 200 && payload?.userId) {
          generateQuery({
            path: "/auth/otp",
            query: { screenname: "resetPassword", userId: payload.userId },
          });
        }
        // reset password
      } else if (getScreenName === "resetPassword") {
        const getUserId = getQueryValue("userId") as string;

        if (!getUserId) {
          return;
        }
        res = await fetchIt({
          apiEndPoint: "auth/passreset",
          reqData: { userId: getUserId, newPassword },
          httpMethod: "post",
          isSuccessNotification: { notificationText: "", notificationState: false },
        });

        if (res?.statusCode === 200) {
          generateQuery({ path: "/auth/otp", query: { screenname: "done" } });
        }
      }

      setFormState({ email: "", otp: "", newPassword: "" });
    } catch (error) {
      return;
    }
  };

  return (
    <LayoutComponent>
      <NonBTNModalUIComponent
        modalState={modalState}
        closeModalCustomFunc={handleCloseModal}
        modalText={
          getScreenName === "sendOtp"
            ? "Send OTP"
            : getScreenName === "verifyOtp"
            ? "Verify OTP"
            : getScreenName === "resetPassword"
            ? "Reset Password"
            : getScreenName === "done"
            ? "All Done"
            : "Not Found"
        }
        disableOutSideBoxClose={false}
      >
        {getScreenName === "sendOtp" && (
          <ForgotPasswordOtpComponent
            email={email}
            setEmail={(value) =>
    setFormState((prev) => ({ ...prev, email: typeof value === "function" ? value(prev.email) : value }))
  }
          />
        )}
        {getScreenName === "verifyOtp" && (
          <VerifyOtpComponent
            otp={otp}
            setOtp={(value) =>
    setFormState((prev) => ({ ...prev, otp: typeof value === "function" ? value(prev.otp) : value }))
  }
            onResendClick={() => generateQuery({ path: "/auth/otp", query: { screenname: "sendOtp" } })}
          />
        )}
        {getScreenName === "resetPassword" && (
          <ResetPasswordOtpComponent
            newPassword={newPassword}
            setNewPassword={(value) =>
    setFormState((prev) => ({ ...prev, newPassword: typeof value === "function" ? value(prev.newPassword) : value }))
  }
          />
        )}
        {getScreenName === "done" && <AllDoneComponent />}
        {!["sendOtp", "verifyOtp", "resetPassword", "done"].includes(getScreenName) && <NotFoundComponent />}

        <div className="md:w-[60 gap-3 w-full flex flex-col justify-center !mt-5">
          {getScreenName !== "done" && (
            <>
              <ButtonUIComponent
                className="w-full h-14"
                onClick={handleSubmitOtp}
                text={
                  getScreenName === "sendOtp"
                    ? "Send Email"
                    : getScreenName === "verifyOtp"
                    ? "Verify"
                    : getScreenName === "resetPassword"
                    ? "Reset Password"
                    : ""
                }
              />
              <ButtonUIComponent
                className={`w-full h-14 bg-white border-primary text-primary-dark hover:text-white ${["sendOtp", "done"].includes(getScreenName) ? "hidden" : ""}`}
                onClick={() => handleScreenNavigation({ eventName: "goback" })}
                text="Go Back"
              />
            </>
          )}
        </div>
      </NonBTNModalUIComponent>
    </LayoutComponent>
  );
}
