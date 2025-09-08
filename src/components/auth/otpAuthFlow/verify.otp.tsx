import OptimizedImage from "../../../utilities/UI/image.ui";
import { LayoutComponent } from "../../layouts/layout.general";
import verifyLockImg from "../../../assets/verifylockimg.png";
import { TextUIComponent } from "../../../utilities/UI/texts.ui";
import { OtpInputComponent } from "./otpcodeinput";
import { resendText } from "../../../utilities/data";
import type { OtpProps  } from "../../../utilities/types.declarationts";

export function VerifyOtpComponent({ otp, setOtp, onResendClick }: OtpProps ) {
  return (
    <LayoutComponent>
      <section className="w-full h-full flex justify-center">
        <div className="w-full flex flex-col items-center">
          <span className="w-full h-14 flex justify-center">
            <OptimizedImage
              imageData={verifyLockImg}
              alt="MIT+ verify"
              className="w-9"
            />
          </span>

          <TextUIComponent
            type="h2"
            text="Verify OTP"
            className="!text-primary"
          />

          <TextUIComponent
            type="p"
            text="Enter the 4-digit code sent to your email"
            className="!text-primary-very-dark !mt-5"
          />

          <div className="w-full flex !mt-7 justify-center">
            <div className="w-[200px]">
              <OtpInputComponent otp={otp} setOtp={setOtp} />
            </div>
          </div>

          <div className="flex flex-wrap !mt-8 gap-1">
            {resendText.map((item, index) => (
              <TextUIComponent
                key={index}
                type="p"
                text={item.text}
                className={item.color}
                onClick={item.text === "Resend email" ? onResendClick : undefined}
              />
            ))}
          </div>
        </div>
      </section>
    </LayoutComponent>
  );
}
