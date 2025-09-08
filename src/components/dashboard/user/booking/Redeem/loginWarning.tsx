import type { customInputOnchangeDataAttributes } from "../../../../../utilities/types.declarationts";
import { ButtonUIComponent } from "../../../../../utilities/UI/button.ui";
import { InputUIComponent } from "../../../../../utilities/UI/input.ui";
import { NonBTNModalUIComponent } from "../../../../../utilities/UI/modal.ui";

import { useState } from "react";
import { TitleUIComponent } from "../../../../../utilities/UI/texts.ui";

type Credentials = {
  email: string;
  password: string;
};

export function LogInWarning(props: {
  logInWarningModal: boolean;
  closeLogInModal: () => void;
  onClick: (credentials: { email: string; password: string }) => void;
}) {
  const { logInWarningModal, closeLogInModal, onClick } = props;

  const [credentials, setCredentials] = useState<Credentials>({
    email: "",
    password: "",
  });

  const handleClose = () => {
    if (!closeLogInModal) return;
    closeLogInModal();
  };

  const handleInput = (data: customInputOnchangeDataAttributes) => {
    const { name, value } = data;
    setCredentials((prev) => ({
      ...prev,
      [name as keyof Credentials]: value,
    }));
  };

  const handleSubmit = () => {
    if (!credentials.email || !credentials.password) {
      alert("Please fill in both fields.");
      return;
    }
    onClick(credentials);
  };

  return (
    <NonBTNModalUIComponent
      disableOutSideBoxClose={false}
      modalText="Login / Create an Account"
      modalState={logInWarningModal}
      closeModalCustomFunc={handleClose}
    >
      <div className="flex flex-col gap-5 w-full ">
        {/* Warning Message */}
        <TitleUIComponent
          type="h5"
          text="You need to log in or create an account to proceed with booking."
        />

        {/* Email Input */}
        <InputUIComponent
          type="text"
          name="email"
          placeholder="Enter your email"
          value={credentials.email}
          onChange={handleInput}
        />

        {/* Password Input */}
        <InputUIComponent
          type="password"
          name="password"
          placeholder="Enter your password"
          value={credentials.password}
          onChange={handleInput}
        />

        {/* Submit Button */}
        <div className="w-full flex justify-center">
          <ButtonUIComponent
            text="Login"
            className="bg-primary text-white !py-2 rounded-md"
            onClick={handleSubmit}
          />
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center">
          <span className="text-xs text-gray-500">OR</span>
        </div>

        {/* Register Link */}
        <div className="w-full flex justify-center">
          <ButtonUIComponent
            text="Create New Account"
            isBorder={true}
            className=" text-primary w-auto !py-2 rounded-md"
            onClick={
              () => window.open("/auth/register", "_blank") // opens blank tab
            }
          />
        </div>
      </div>
    </NonBTNModalUIComponent>
  );
}
