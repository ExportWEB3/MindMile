import OptimizedImage from "../../../utilities/UI/image.ui";
import { LayoutComponent } from "../../layouts/layout.general";
import passwordStarredImg from "../../../assets/password-broken.png";
import { TextUIComponent } from "../../../utilities/UI/texts.ui";
import { passwordResetData } from "../../../utilities/data";
import { InputUIComponent } from "../../../utilities/UI/input.ui";
import type { ResetPasswordProps } from "../../../utilities/types.declarationts";
import { useState } from "react";

export function ResetPasswordOtpComponent({ newPassword, setNewPassword }: ResetPasswordProps) {
  const [inputs, setInputs] = useState<{ [key: string]: string }>({});

  const handleChange = (name: string, value: string) => {
    setInputs(prev => ({ ...prev, [name]: value }));

    if (name.toLowerCase().includes("password")) {
      setNewPassword(value);
    }
  };

  return (
    <LayoutComponent>
      <section className="w-full h-full flex justify-center">
        <div className="w-full">
          <span className="w-full h-14 flex justify-center">
            <OptimizedImage
              imageData={passwordStarredImg}
              alt="MIT+ password"
              className="w-10"
            />
          </span>

          <TextUIComponent
            type="h2"
            text="Set new password"
            className="!text-primary"
          />

          <TextUIComponent
            type="p"
            text="Must be at least 8 characters."
            className="!text-primary-very-dark"
          />

          <div className="w-full h-[200px] !mt-5">
            {passwordResetData?.map((item, index) => (
              <div key={index}>
                <InputUIComponent
                  label={item.name}
                  type={item.type === "password" ? "password" : "text"}
                  name={item.name}
                  placeholder={item.placeholder}
                  className="bg-white rounded-2xl"
                  onChange={(data) => handleChange(item.name, String(data.value))}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </LayoutComponent>
  );
}
