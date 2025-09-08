import {
  activeSessions,
  paymentMethods,
  securityPasswordInput,
} from "../../../../utilities/data";
import { ButtonUIComponent } from "../../../../utilities/UI/button.ui";
import { FormUIComponent } from "../../../../utilities/UI/form.ui";
import { InputUIComponent } from "../../../../utilities/UI/input.ui";
import {
  TextUIComponent,
  TitleUIComponent,
} from "../../../../utilities/UI/texts.ui";
import { ToggleUIComponent } from "../../../../utilities/UI/toggle.ui";
import { LayoutComponent } from "../../../layouts/layout.general";
import { ProfileHeaderTabs } from "./profile.header";

export function ProfileSecurityComponent() {
  const handleToggle = (data: any) => {
    console.log("Clicked toggle:", data);
  };

  return (
    <LayoutComponent>
      <section className="w-full h-full">
        <ProfileHeaderTabs />

        {/* Password Management */}
        <div className="w-full">
          <TextUIComponent
            type="h5"
            text="Password Management"
            className="!text-primay-very-dark !mt-14"
          />
          <FormUIComponent
            onSubmit={() => {}}
            className=" w-full rounded-xl !mt-8 !px-5 max-[625px]:!px-2 !pt-5 h-[200px] max-[450px]:h-[300px] bg-white border border-gray-300"
          >
            <div className="w-full flex !space-x-[400px] max-[800px]:!space-x-[200px] max-[625px]:!space-x-[50px] max-[450px]:flex-col">
              {securityPasswordInput?.map((item, index) => (
                <div key={index} className="w-[50%] max-[450px]:w-full">
                  <InputUIComponent
                    type="password"
                    name={item.name}
                    placeholder={item.placeholder}
                    label={item.label}
                    className=""
                  />
                </div>
              ))}
            </div>

            <span className="w-full flex justify-end">
              <ButtonUIComponent
                type="button"
                text="Update password"
                className="!mt-5 w-[180px] h-12 rounded-lg"
              />
            </span>
          </FormUIComponent>
        </div>

        <div className="w-full h-[200px] !px-5 !space-y-[14px] !py-7 max-[625px]:!px-2 bg-white rounded-xl border border-gray-300 !mt-10">
          <TitleUIComponent
            type="h5"
            text="Two-Factor Authentication"
            className="!text-primay-very-dark"
          />
          <TextUIComponent
            type="p"
            text="Add an extra layer of security to your account"
            className="!text-primay-very-dark"
          />
          <ToggleUIComponent
            isToggleState={true}
            data={{ id: "123" }}
            onClick={handleToggle}
          />
        </div>

        {/* Payment Methods */}
        <div className="bg-white max-[625px]:!px-2 w-full !px-5 !py-7 h-[300px] border border-gray-300 rounded-lg !mt-10">
          <TitleUIComponent
            type="h4"
            text="Payment Methods"
            className="!text-primay-very-dark"
          />
          <span className="!space-y-12">
            {paymentMethods.map((pm, i) => (
              <div
                key={i}
                className="w-full h-[60px] max-[700px]:h-[80px] max-[700px]:!py-2 max-[355px]:!px-5 !mt-5 !px-10 flex max-[700px]:flex-col justify-between border rounded-lg border-gray-500 items-center bg-gray-300 "
              >
                <TextUIComponent
                  type="p"
                  text={`${pm.type}- ${pm.details}`}
                  className="!text-primay-very-dark"
                />
                {pm.primary ? (
                  <span className="flex">
                    <ButtonUIComponent
                      type="button"
                      text="Primary"
                      className="bg-primary w-full h-10 rounded-full border-none"
                    />
                  </span>
                ) : (
                  <span className="flex">
                    <ButtonUIComponent
                      type="button"
                      text="Remove"
                      className="bg-secondary-red w-full h-10 rounded-lg border-none"
                    />
                  </span>
                )}
              </div>
            ))}
          </span>
        </div>

        {/* Active Sessions */}
        <div className="bg-white max-[625px]:!px-2 border w-full h-[200px] border-gray-300 !px-5 !py-6 rounded-lg  !mt-10">
          <TextUIComponent
            type="h5"
            text="Active Sessions"
            className="!text-primay-very-dark"
          />
          <div className="w-full h-[70px] max-[700px]:h-[100px] max-[350px]:h-[120px] bg-gray-300 !mt-5 !px-5 border max-[700px]:grid grid-col-2 border-gray-500 rounded-lg flex items-center justify-between">
            {activeSessions.map((session, i) => (
              <div key={i} className="flex !space-x-5">
                <TextUIComponent
                  type="p"
                  text={`current Session: ${session.device}`}
                  className="!text-primay-very-dark"
                />
                <TextUIComponent
                  type="p"
                  text={`Started: ${session.time}`}
                  className="!text-primay-very-dark"
                />
              </div>
            ))}
            <ButtonUIComponent
              type="button"
              text="Sign out"
              className="bg-secondary-red max-[575px]:w-24 w-36 h-10 rounded-lg border-none"
            />
          </div>
        </div>

        <div className="w-full h-12 flex justify-end !mt-20">
          <ButtonUIComponent
            type="button"
            text="Save changes"
            className="w-[180px] h-12 rounded-lg"
          />
        </div>
      </section>
    </LayoutComponent>
  );
}
