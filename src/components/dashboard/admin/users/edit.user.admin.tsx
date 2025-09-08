import { useEffect, useState } from "react";
import type {
  userEditDataAttributes,
  UsersResponseTableAttributes,
} from "../../../../utilities/types.declarationts";
import { FormUIComponent } from "../../../../utilities/UI/form.ui";
import { InputUIComponent } from "../../../../utilities/UI/input.ui";
import { NonBTNModalUIComponent } from "../../../../utilities/UI/modal.ui";
import { TitleUIComponent } from "../../../../utilities/UI/texts.ui";
import { ToggleUIComponent } from "../../../../utilities/UI/toggle.ui";
import { ButtonUIComponent } from "../../../../utilities/UI/button.ui";
import { userEditDataField } from "../../../../utilities/data";
import { useHttpFetcher } from "../../../../hooks/custom.hook";
import { mutate } from "swr";

export function EditUserManagementAdmin(props: {
  modalState: boolean;
  closeModal: () => void;
  userDetails: UsersResponseTableAttributes;
}) {
  const { modalState, closeModal, userDetails } = props;
  const { fetchIt } = useHttpFetcher();

  const [formData, setFormData] = useState<userEditDataAttributes>({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    isAffiliate: false,
    mitAffiliateID: "",
    firstName: "",
    lastName: "",
    password: "",
    _id: "",
  });

  useEffect(() => {
    if (userDetails) {
      setFormData({
        fullName: userDetails?.name || "",
        email: userDetails?.email || "",
        phoneNumber: userDetails?.phoneNumber || "",
        address: userDetails?.address || "",
        firstName: userDetails?.firstName || "",
        lastName: userDetails?.lastName || "",
        isAffiliate: (userDetails?.isAffiliate as boolean) || false,
        mitAffiliateID: userDetails?.mitAffiliateID || "None",
        password: "",
        _id: userDetails?._id,
      });
    }
  }, [userDetails, modalState]);

  const handleClose = () => {
    if (!closeModal) return;
    closeModal();
  };

  const updateField = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    await fetchIt({
      apiEndPoint: `platform/update/user`,
      httpMethod: "patch",
      reqData: formData,
      isSuccessNotification: {
        notificationText: "Updated",
        notificationState: true,
      },
    });
    mutate(`platform/users/records`);
    handleClose();
  };

  return (
    <NonBTNModalUIComponent
      disableOutSideBoxClose={false}
      modalText="Edit User"
      modalState={modalState}
      closeModalCustomFunc={handleClose}
    >
      <FormUIComponent onSubmit={handleSubmit} className="space-y-4 !p-4">
        {userEditDataField.map((field) => (
          <div
            key={field.key}
            className={`flex flex-col !mt-4 ${
              field?.key === "mitAffiliateID" &&
              !formData?.isAffiliate &&
              "hidden"
            }`}
          >
            <TitleUIComponent text={field.label} type="h6" className="!pb-1" />
            <InputUIComponent
              name={field?.key}
              type={"text"}
              value={String(formData[field.key as keyof typeof formData])}
              onChange={(data) => updateField(field.key, data.value)}
              placeholder={field.placeholder}
            />
          </div>
        ))}

        {/* Affiliate Toggle */}
        <div className="flex flex-col !mt-4">
          <TitleUIComponent text="MIT Affiliate" type="h6" className="!pb-1" />
          <ToggleUIComponent
            isToggleState={formData?.isAffiliate as boolean}
            onClick={(data) => updateField("isAffiliate", data.value)}
          />
        </div>

        {/* Save */}
        <div className="!pt-4 flex justify-center !mt-7">
          <ButtonUIComponent text="Save Changes" type="submit" />
        </div>
      </FormUIComponent>
    </NonBTNModalUIComponent>
  );
}
