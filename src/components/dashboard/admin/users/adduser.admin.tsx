import { NonBTNModalUIComponent } from "../../../../utilities/UI/modal.ui";

import { useState } from "react";
import { TitleUIComponent } from "../../../../utilities/UI/texts.ui";
import { ToggleUIComponent } from "../../../../utilities/UI/toggle.ui";
import { ButtonUIComponent } from "../../../../utilities/UI/button.ui";
import { FormUIComponent } from "../../../../utilities/UI/form.ui";
import { InputUIComponent } from "../../../../utilities/UI/input.ui";
import type { inputTypeAttributes } from "../../../../utilities/types.declarationts";
import { useHttpFetcher } from "../../../../hooks/custom.hook";
import { mutate } from "swr";

export function AddUserAdminManagament(props: {
  modalState: boolean;
  closeModal: () => void;
}) {
  const { modalState, closeModal } = props;
  const { fetchIt } = useHttpFetcher();

  const handleCloseModal = () => {
    if (!closeModal) return;
    closeModal();
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    mitAffiliateID: "",
    isMITAffiliate: false,
    isAggreedTermsAndCondition: true,
  });

  const updateField = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const inputFields: {
    key: keyof typeof formData;
    label: string;
    placeholder: string;
    type?: string;
  }[] = [
    { key: "firstName", label: "First Name", placeholder: "Enter first name" },
    { key: "lastName", label: "Last Name", placeholder: "Enter last name" },
    { key: "email", label: "Email", placeholder: "Enter email", type: "email" },
    {
      key: "phoneNumber",
      label: "Phone Number",
      placeholder: "Enter phone number",
    },
    {
      key: "mitAffiliateID",
      label: "Affiliate ID",
      placeholder: "Enter affiliate ID",
    },
  ];

  const handleSubmit = async () => {
    await fetchIt({
      apiEndPoint: "platform/user/add",
      httpMethod: "post",
      reqData: formData,
      isSuccessNotification: {
        notificationText: "Success",
        notificationState: true,
      },
    });
    mutate(`platform/users/records`);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      mitAffiliateID: "",
      isMITAffiliate: false,
      isAggreedTermsAndCondition: true,
    });
    handleCloseModal();
  };

  return (
    <NonBTNModalUIComponent
      modalText="Add User"
      disableOutSideBoxClose={false}
      modalState={modalState}
      closeModalCustomFunc={handleCloseModal}
    >
      <FormUIComponent onSubmit={handleSubmit} className="space-y-4">
        {inputFields.map((field) => (
          <div
            key={field.key}
            className={`flex flex-col !mt-3 ${
              field?.key === "mitAffiliateID" &&
              !formData?.isMITAffiliate &&
              "hidden"
            }`}
          >
            <TitleUIComponent text={field.label} type="h6" className="!pb-2" />
            <InputUIComponent
              name={field.key}
              type={(field.type as inputTypeAttributes) || "text"}
              value={String(formData[field.key] ?? "")}
              onChange={(data) => updateField(field.key, data.value)}
              placeholder={field.placeholder}
              isRequired={field?.key !== "mitAffiliateID"}
            />
          </div>
        ))}

        <div className={`flex flex-col !mt-4 `}>
          <TitleUIComponent text="MIT Affiliate" type="h6" className="!pb-1" />
          <ToggleUIComponent
            isToggleState={formData.isMITAffiliate}
            onClick={(data) => updateField("isMITAffiliate", data.value)}
          />
        </div>

        <div className="!pt-4 flex justify-center">
          <ButtonUIComponent text="Add User" type="submit" />
        </div>
      </FormUIComponent>
    </NonBTNModalUIComponent>
  );
}
