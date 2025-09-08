import OptimizedImage from "../../../utilities/UI/image.ui";
import { LayoutComponent } from "../../layouts/layout.general";
import resetPassImg from "../../../assets/lockimage.png";
import { TextUIComponent } from "../../../utilities/UI/texts.ui";
import { InputUIComponent } from "../../../utilities/UI/input.ui";
import type { ForgotPasswordProps } from "../../../utilities/types.declarationts";


export function ForgotPasswordOtpComponent({ email, setEmail }: ForgotPasswordProps) {


  return (
    <LayoutComponent>
      <section className="w-full h-full flex justify-center">
        <div className="w-full">
          <div className="w-full h-14 flex justify-center">
            <OptimizedImage
              imageData={resetPassImg}
              alt="MIT+ reset"
              style={{ objectFit: "contain" }}
              className="w-9"
            />
          </div>

          <TextUIComponent
            type="h2"
            text="Reset your password"
            className="!text-primary"
          />

          <TextUIComponent
            type="p"
            text="Enter your email to reset your password"
            className="!text-primary-very-dark !mt-5"
          />

          <div className="w-full h-24 !mt-5">
            <InputUIComponent
              type="text"
              name="email"
              label="Email Address"
              onChange={(data) => setEmail(data.value as string)}
              className="!text-primary-very-dark bg-white"
              placeholder="your@email.com"
            />
          </div>

          <TextUIComponent
            type="p"
            text="A 4-digit code will be sent to the email you provide."
            className="!text-primary-very-dark !mt-5"
          />
        </div>
      </section>
    </LayoutComponent>
  );
}
