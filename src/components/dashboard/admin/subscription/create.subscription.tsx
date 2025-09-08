import { useEffect, useState } from "react";
import { NonBTNModalUIComponent } from "../../../../utilities/UI/modal.ui";
import type {
  applicationActionEvent,
  customInputOnchangeDataAttributes,
  customTierAttributes,
  durationMonthAttributes,
  SubscriptionToggleOptionAttributes,
  Tier,
} from "../../../../utilities/types.declarationts";
import { tierFields } from "../../../../utilities/data";
import { InputUIComponent } from "../../../../utilities/UI/input.ui";
import {
  TextUIComponent,
  TitleUIComponent,
} from "../../../../utilities/UI/texts.ui";
import { DropDownComponent } from "../../../../utilities/UI/dropdown.ui";
import { ToggleUIComponent } from "../../../../utilities/UI/toggle.ui";
import {
  convertDate,
  displayCurrency,
  formatToTitleCase,
  isValidDate,
  removeNonDigits,
  validateNumericString,
} from "../../../../utilities/helper.function";
import { ButtonUIComponent } from "../../../../utilities/UI/button.ui";
import { FormUIComponent } from "../../../../utilities/UI/form.ui";
import {
  useHttpFetcher,
  useNotificationHook,
} from "../../../../hooks/custom.hook";
import { mutate } from "swr";

export function CreateSubscriptionPlans(props: {
  modalState: boolean;
  closeModalState: Function;
  tier: customTierAttributes | null;
  event: applicationActionEvent;
}) {
  const { modalState, closeModalState, tier, event } = props;
  const { fetchIt } = useHttpFetcher();
  const { notify } = useNotificationHook();
  const [formData, setFormData] = useState<customTierAttributes>({
    _id: "",
    name: "",
    monthlyFee: "",
    pointsPerMonth: "",
    newMemberBonus: {
      isActive: false,
      reward: "",
      durationCondition: "1",
      type: "point",
    },
    loyaltyBonus: {
      isActive: false,
      reward: "",
      durationCondition: "0",
      type: "point",
    },
    birthdayBonus: {
      isActive: false,
      reward: "",
      durationCondition: "0",
      type: "point",
    },
    perks: [],
    tangibleGiftsFrequency: { frequency: "none" },
    redeemableAfterDays: "0",
    referralBonus: {
      isActive: false,
      reward: "",
      durationCondition: "0",
      type: "point",
    },
    isActive: true,
    dateCreated: new Date().toISOString(),
    domesticFlightComplimentary: {
      reward: "",
      type: "point",
      isActive: false,
      durationCondition: "0",
    },
    subscribers: "0",
    totalActiveSubscribers: "0",
    totalAmount: "0",
    createdBy: "",
    updatedAt: "",
  });

  const updateField = (key: keyof Omit<Tier, "_id">, value: any) => {
    if (event === "readOnly") {
      notify({
        notificationText:
          "You are on View Only Mode, you can not edit, close here and click Edit Icon to edit your plan!",
      });
      return;
    }
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  function validateTierBonuses(tier: Tier): string | null {
    const bonuses = [
      {
        key: "newMemberBonus",
        value: tier.newMemberBonus,
        label: "New Member bonus",
      },
      {
        key: "loyaltyBonus",
        value: tier.loyaltyBonus,
        label: "Loyalty bonus",
      },
      {
        key: "birthdayBonus",
        value: tier.birthdayBonus,
        label: "Birthday bonus",
      },
      {
        key: "referralBonus",
        value: tier.referralBonus,
        label: "Referral bonus",
      },
      {
        key: "domesticFlightComplimentary",
        value: tier.domesticFlightComplimentary,
        label: "Domestic Flight Complimentary",
      },
    ];

    for (const bonus of bonuses) {
      const b = bonus.value;
      if (!b || !b.isActive) continue; // skip inactive

      // Reward required if active
      if (!b.reward || b.reward.trim() === "") {
        return `${bonus.label} is turned on, the Reward field is required!`;
      }

      // Determine if decimal is allowed
      const allowDecimal = b.type === "money";
      const result = validateNumericString(b.reward, { allowDecimal });

      if (result !== true) {
        return `${bonus.label}: ${result}`;
      }
    }

    return null;
  }

  const handleSubmit = async () => {
    if (event === "readOnly") return;
    const error = validateTierBonuses(formData);
    if (error) {
      notify({ notificationText: error, notificationState: true });
      return;
    }

    const result = validateNumericString(formData?.monthlyFee, {
      allowDecimal: true,
    });

    if (result !== true) {
      notify({
        notificationText: `Montly Fee must be a valid numerical value`,
        notificationState: true,
      });
      return;
    }

    const pointResult = validateNumericString(formData?.pointsPerMonth, {
      allowDecimal: false,
    });

    if (pointResult !== true) {
      notify({
        notificationText: `Monthly Point value must be a valid numerical value`,
        notificationState: true,
      });
      return;
    }
    try {
      await fetchIt({
        apiEndPoint: `platform/create/tier`,
        httpMethod: "post",
        reqData: formData,
        isSuccessNotification: {
          notificationText: "Success",
          notificationState: true,
        },
      });
      mutate(`platform/tierplans/record`);
      setFormData({
        totalActiveSubscribers: "",
        subscribers: "",
        createdBy: "",
        totalAmount: "",

        _id: "",
        name: "",
        monthlyFee: "",
        pointsPerMonth: "",
        newMemberBonus: {
          isActive: false,
          reward: "",
          durationCondition: "1",
          type: "point",
        },
        loyaltyBonus: {
          isActive: false,
          reward: "",
          durationCondition: "0",
          type: "point",
        },
        birthdayBonus: {
          isActive: false,
          reward: "",
          durationCondition: "0",
          type: "point",
        },
        perks: [],
        tangibleGiftsFrequency: { frequency: "none" },
        redeemableAfterDays: "0",
        referralBonus: {
          isActive: false,
          reward: "",
          durationCondition: "0",
          type: "point",
        },
        isActive: true,
        domesticFlightComplimentary: {
          reward: "",
          type: "point",
          isActive: false,
          durationCondition: "0",
        },
      });
      closeModalState && closeModalState();
      return;
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    if (!tier) return;
    setFormData((prev) => ({
      ...prev,
      _id: tier?._id,
      name: tier?.name as string,
      monthlyFee: removeNonDigits(tier?.monthlyFee as string),
      pointsPerMonth: tier?.pointsPerMonth as string,
      newMemberBonus: tier?.newMemberBonus,
      loyaltyBonus: tier?.loyaltyBonus,
      birthdayBonus: tier?.birthdayBonus,
      perks: tier?.perks as string[],
      tangibleGiftsFrequency: tier?.tangibleGiftsFrequency,
      redeemableAfterDays: tier?.redeemableAfterDays as durationMonthAttributes,
      referralBonus: tier?.referralBonus,
      isActive: tier?.isActive as boolean,
      dateCreated: tier?.dateCreated as string,
      domesticFlightComplimentary: tier?.domesticFlightComplimentary,
      totalActiveSubscribers: tier?.totalActiveSubscribers,
      subscribers: tier?.subscribers,
      totalAmount: tier?.totalAmount,
      createdBy: tier?.createdBy,
      updatedAt: tier?.updatedAt,
    }));
  }, [modalState]);

  const handleClose = () => {
    if (!closeModalState) return;
    setFormData({
      totalActiveSubscribers: "",
      subscribers: "",
      createdBy: "",
      totalAmount: "",

      _id: "",
      name: "",
      monthlyFee: "",
      pointsPerMonth: "",
      newMemberBonus: {
        isActive: false,
        reward: "",
        durationCondition: "1",
        type: "point",
      },
      loyaltyBonus: {
        isActive: false,
        reward: "",
        durationCondition: "0",
        type: "point",
      },
      birthdayBonus: {
        isActive: false,
        reward: "",
        durationCondition: "0",
        type: "point",
      },
      perks: [],
      tangibleGiftsFrequency: { frequency: "none" },
      redeemableAfterDays: "0",
      referralBonus: {
        isActive: false,
        reward: "",
        durationCondition: "0",
        type: "point",
      },
      isActive: true,
      domesticFlightComplimentary: {
        reward: "",
        type: "point",
        isActive: false,
        durationCondition: "0",
      },
    });
    closeModalState();
  };

  return (
    <NonBTNModalUIComponent
      closeModalCustomFunc={handleClose}
      modalText={event === "readOnly" ? "View Plan" : "Create Plan"}
      disableOutSideBoxClose={false}
      modalState={modalState}
      className=""
    >
      <div
        className={`${event !== "readOnly" && "hidden"} w-full flex flex-col  `}
      >
        <div className="flex flex-col ">
          <TitleUIComponent
            text={`Total Subscribers`}
            type="h6"
            className="!pb-1"
          />

          <span className="border !p-2 rounded-[5px] !mt-2">
            <TextUIComponent
              text={formData?.subscribers as string}
              type="p"
              className="text-xs !pb-1"
            />
          </span>
        </div>

        <div className="flex flex-col !mt-3">
          <TitleUIComponent
            text={`Active Subscribers`}
            type="h6"
            className="!pb-1"
          />

          <span className="border !p-2 rounded-[5px] !mt-2">
            <TextUIComponent
              text={formData?.totalActiveSubscribers as string}
              type="p"
              className="text-xs !pb-1"
            />
          </span>
        </div>

        <div className="flex flex-col  !mt-3 ">
          <TitleUIComponent text={`Revenue`} type="h6" className="!pb-1" />

          <span className="border !p-2 rounded-[5px] !mt-2">
            <TextUIComponent
              text={displayCurrency(formData?.totalAmount as string) as string}
              type="p"
              className="text-xs !pb-1"
            />
          </span>
        </div>

        <div
          className={`flex flex-col  !mt-3  ${
            !isValidDate(tier?.dateCreated as string) && "hidden"
          }`}
        >
          <TitleUIComponent text={`Date Created`} type="h6" className="!pb-1" />

          <span className="border !p-2 rounded-[5px] !mt-2">
            <TextUIComponent
              text={convertDate({
                date: tier?.dateCreated as string,
                isFortmat: true,
              })}
              type="p"
              className="text-xs !pb-1"
            />
          </span>
        </div>

        <div
          className={`flex flex-col  !mt-3  ${
            !isValidDate(tier?.dateCreated as string) && "hidden"
          }`}
        >
          <TitleUIComponent text={`Last Updated`} type="h6" className="!pb-1" />

          <span className="border !p-2 rounded-[5px] !mt-2">
            <TextUIComponent
              text={convertDate({
                date: tier?.updatedAt as string,
                isFortmat: true,
              })}
              type="p"
              className="text-xs !pb-1"
            />
          </span>
        </div>

        <div className="flex flex-col !mt-3 !pb-1">
          <TitleUIComponent text={`Author`} type="h6" className="!pb-1" />

          <span className="border !p-2 rounded-[5px] !mt-2">
            <TextUIComponent
              text={formatToTitleCase(formData?.createdBy as string) as string}
              type="p"
              className="text-xs !pb-1"
            />
          </span>
        </div>
      </div>
      <FormUIComponent onSubmit={handleSubmit} className="space-y-4 ">
        {tierFields?.map((field) => {
          const value = formData[field.key];

          if (field.type === "text") {
            return (
              <div key={field.key} className="flex flex-col !mt-4">
                <TitleUIComponent
                  text={field.label}
                  type="h6"
                  className="!pb-1"
                />

                <span>
                  <TextUIComponent
                    text={field?.description as string}
                    type="p"
                    className="text-xs !pb-1"
                  />
                </span>

                <InputUIComponent
                  type="text"
                  value={value as any}
                  name={field?.label}
                  isDisable={event === "readOnly"}
                  onChange={(data: customInputOnchangeDataAttributes) =>
                    updateField(field.key, data?.value)
                  }
                  placeholder={field?.placeHolder}
                />
              </div>
            );
          }

          if (field.type === "select" && field.options) {
            return (
              <div key={field.key} className="flex flex-col !mt-4">
                <TitleUIComponent
                  text={field.label}
                  type="h6"
                  className="!pb-1"
                />
                <DropDownComponent
                  disabled={event === "readOnly"}
                  value={
                    field?.key === "tangibleGiftsFrequency"
                      ? (value as { frequency: string }).frequency
                      : formatToTitleCase(value as string)
                  }
                  onChange={(data: customInputOnchangeDataAttributes) =>
                    updateField(
                      field.key,
                      field?.key === "tangibleGiftsFrequency"
                        ? {
                            frequency: data?.value,
                          }
                        : data?.value
                    )
                  }
                  options={field.options || []}
                />
              </div>
            );
          }

          if (field.type === "toggle") {
            return (
              <div key={field.key} className="flex flex-col !mt-4 ">
                <TitleUIComponent
                  text={field.label}
                  type="h6"
                  className="!pb-1"
                />

                <ToggleUIComponent
                  disabled={event === "readOnly"}
                  isToggleState={value as boolean}
                  onClick={(data: customInputOnchangeDataAttributes) =>
                    updateField(field.key, data?.value)
                  }
                />
              </div>
            );
          }

          if (field.type === "bonus") {
            const bonusValue = value as SubscriptionToggleOptionAttributes;

            return (
              <div
                key={field?.key}
                className=" border-dark-very-light-50 border  shadow-sm rounded-[10px] !p-3  space-y-2  !mt-5"
              >
                <div className="flex flex-col ">
                  <TitleUIComponent
                    text={field.label}
                    type="h6"
                    className="!pb-1"
                  />

                  <span className="!mt-2">
                    <ToggleUIComponent
                      disabled={event === "readOnly"}
                      isToggleState={bonusValue.isActive as boolean}
                      onClick={(data: customInputOnchangeDataAttributes) =>
                        updateField(field.key, {
                          ...bonusValue,
                          isActive: data?.value,
                        })
                      }
                    />
                  </span>
                </div>

                <div className={`${!bonusValue?.isActive && "hidden"}`}>
                  <div className={`!mt-5 `}>
                    <TitleUIComponent
                      text={"Reward Value"}
                      type="h6"
                      className="!pb-1 !text-xs"
                    />

                    <span>
                      <TextUIComponent
                        text={field?.description as string}
                        type="p"
                        className="text-xs !pb-1"
                      />
                    </span>
                    <InputUIComponent
                      type="text"
                      value={bonusValue?.reward}
                      name={""}
                      isDisable={!bonusValue?.isActive ? true : false}
                      isReadOnly={!bonusValue?.isActive ? true : false}
                      onChange={(data: customInputOnchangeDataAttributes) =>
                        updateField(field.key, {
                          ...bonusValue,
                          reward: data?.value,
                        })
                      }
                      placeholder={`Enter Reword Value`}
                    />
                  </div>

                  <div className="!mt-3">
                    <TitleUIComponent
                      text={"Duration (Monthly)"}
                      type="h6"
                      className="!pb-1 !text-xs"
                    />

                    <DropDownComponent
                      disabled={event === "readOnly"}
                      value={bonusValue?.durationCondition as any}
                      onChange={(data: customInputOnchangeDataAttributes) =>
                        updateField(field.key, {
                          ...bonusValue,
                          durationCondition: data?.value,
                        })
                      }
                      options={field.options || []}
                    />
                  </div>

                  <div className="!mt-3">
                    <TitleUIComponent
                      text={"Reward Type"}
                      type="h6"
                      className="!pb-1 !text-xs"
                    />
                    <DropDownComponent
                      disabled={event === "readOnly"}
                      value={formatToTitleCase(bonusValue?.type)}
                      onChange={(data: customInputOnchangeDataAttributes) =>
                        updateField(field.key, {
                          ...bonusValue,
                          type: String(data?.value || "")?.toLowerCase(),
                        })
                      }
                      options={[
                        formatToTitleCase("point"),
                        formatToTitleCase("money"),
                      ]}
                    />
                  </div>
                </div>
              </div>
            );
          }

          if (field.type === "tags") {
            const tags = (value as string[]) || [];
            return (
              <div key={field.key} className="flex flex-col !mt-5">
                <TitleUIComponent
                  text={field.label}
                  type="h6"
                  className="!pb-1"
                />
                <span>
                  <TextUIComponent
                    text={field?.description as string}
                    type="p"
                    className="text-xs !pb-1"
                  />
                </span>
                <InputUIComponent
                  type="text"
                  name={""}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.currentTarget.value.trim()) {
                      updateField(field.key, [
                        ...tags,
                        e.currentTarget.value.trim(),
                      ]);
                      e.currentTarget.value = "";
                    }
                  }}
                  className={`${event === "readOnly" && "hidden"}`}
                  placeholder={`Type and press Enter`}
                />

                <div className="flex flex-wrap gap-2 !mt-2">
                  {tags?.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-primary-23 text-primary !px-2 !py-1 rounded-full text-sm cursor-pointer"
                      onClick={() =>
                        updateField(
                          field.key,
                          tags?.filter((_, i) => i !== idx)
                        )
                      }
                    >
                      {tag} ×
                    </span>
                  ))}
                </div>
              </div>
            );
          }

          if (field.type === "domestic") {
            const domesticValue = value as SubscriptionToggleOptionAttributes;

            return (
              <div
                key={field.key}
                className=" border-dark-very-light-50 border  shadow-sm rounded-[10px] !p-3  space-y-2  !mt-5"
              >
                <div className="flex flex-col ">
                  <TitleUIComponent
                    text={field.label}
                    type="h6"
                    className="!pb-3"
                  />

                  <ToggleUIComponent
                    disabled={event === "readOnly"}
                    isToggleState={domesticValue?.isActive as boolean}
                    onClick={(data: customInputOnchangeDataAttributes) =>
                      updateField(field.key, {
                        ...domesticValue,
                        isActive: String(data?.value || "")?.toLowerCase(),
                      })
                    }
                  />
                </div>

                <div className={`${!domesticValue?.isActive && "hidden"}`}>
                  <div className="!mt-5">
                    <TitleUIComponent
                      text={"Reward Value"}
                      type="h6"
                      className="!pb-1 !text-xs"
                    />

                    <span>
                      <TextUIComponent
                        text={field?.description as string}
                        type="p"
                        className="text-xs !pb-1"
                      />
                    </span>
                    <InputUIComponent
                      type="text"
                      value={domesticValue?.reward}
                      name={""}
                      onChange={(data: customInputOnchangeDataAttributes) =>
                        updateField(field.key, {
                          ...domesticValue,
                          reward: data?.value,
                        })
                      }
                      placeholder={`Enter Reword Value`}
                    />
                  </div>
                  <div className="!mt-3">
                    <TitleUIComponent
                      text={"Duration"}
                      type="h6"
                      className="!pb-1 !text-xs"
                    />

                    <DropDownComponent
                      disabled={event === "readOnly"}
                      value={domesticValue?.durationCondition as any}
                      onChange={(data: customInputOnchangeDataAttributes) =>
                        updateField(field.key, {
                          ...domesticValue,
                          durationCondition: data?.value,
                        })
                      }
                      options={field.options || []}
                    />
                  </div>

                  <div className="!mt-3">
                    <TitleUIComponent
                      text={"Reward Type"}
                      type="h6"
                      className="!pb-1 !text-xs"
                    />
                    <DropDownComponent
                      disabled={event === "readOnly"}
                      value={formatToTitleCase(domesticValue?.type)}
                      onChange={(data: customInputOnchangeDataAttributes) =>
                        updateField(field.key, {
                          ...domesticValue,
                          type: data?.value,
                        })
                      }
                      options={[
                        formatToTitleCase("point"),
                        formatToTitleCase("money"),
                      ]}
                    />
                  </div>
                </div>
              </div>
            );
          }

          return null;
        })}

        <div className="!pt-4 flex justify-center">
          <ButtonUIComponent
            text="Save Plan"
            type="submit"
            className={`${event === "readOnly" && "hidden"}`}
          />
        </div>
      </FormUIComponent>
    </NonBTNModalUIComponent>
  );
}
