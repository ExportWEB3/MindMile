import { useContext, useEffect, useMemo, useState } from "react";
import type {
  OrderLineItem,
  participantDataAttributes,
  pointRedeemptionReqAttributes,
  RedeemDraftState,
  redeemIndexComponentState,
  tripAddOnAttributes,
  tripSubPackages,
  tripSubscriptionPlatformResponseData,
  userAttributes,
} from "../../../../../utilities/types.declarationts";
import { NonBTNModalUIComponent } from "../../../../../utilities/UI/modal.ui";

import { RedeemPointCheckOut } from "./redeem.point.check";
import {
  useCustomQuery,
  useHttpFetcher,
  useNotificationHook,
} from "../../../../../hooks/custom.hook";
import { BookingHeader } from "./header.booking";
import { PackageSelection } from "./package.selection";
import { CheckoutSummary } from "./summary.booking";
import { ParticipantInformation } from "./participants.info";
import { TextUIComponent } from "../../../../../utilities/UI/texts.ui";
import { UserContext } from "../../../../../contexts/user/user.context";
import { AddOnSelection } from "./addon.selection";
import { EsignatureComponent } from "../../../../esignature/esignature";

export function RedeemCheckOut(props: {
  modalState: boolean;
  tripsData: tripSubscriptionPlatformResponseData;
  closeModal: () => void;
}) {
  const { modalState, closeModal, tripsData } = props;
  const { userState } = useContext(UserContext);
  const { notify } = useNotificationHook();
  const { getQueryValue } = useCustomQuery();
  const [componentState, setComponentState] =
    useState<redeemIndexComponentState>({
      pointInputState: false,
      selectedScreen: 0,
      hasSignedContract: false,
      signatureState: false,
      esignatureImgURL: "",
      esignaturePublicURL: "",
    });

  const tripId = getQueryValue("tripid");
  const [participantData, setParticipantData] = useState<
    participantDataAttributes[]
  >([]);
  const { fetchIt } = useHttpFetcher();

  const maxQty = Math.max(
    1,
    Number(
      tripsData?.tripMaximumGroupSize ?? tripsData?.tripMinimumGroupSize ?? 10
    )
  );

  // quantity options for dropdowns (0..maxQty) as simple string[]
  const qtyOptions = useMemo(
    () => Array.from({ length: maxQty + 1 }, (_, i) => i.toString()),
    [maxQty]
  );

  const [redeemDraft, setRedeemDraft] = useState<RedeemDraftState>({
    items: [],
    selectedPackageId: null,
  });

  const handleCloseModal = () => {
    if (!closeModal) return;
    setRedeemDraft({
      items: [],
      selectedPackageId: null,
    });
    setComponentState({ pointInputState: false, selectedScreen: 0 });
    setParticipantData([]);
    closeModal();
  };

  const upsertItem = (
    item: OrderLineItem,
    quantity: string,
    itemType: "package" | "add_on"
  ) => {
    setRedeemDraft((prev) => {
      let newItems = [...prev.items];

      // find if this item already exists
      const existingIndex = newItems.findIndex(
        (it) => it.itemType === itemType && it.itemId === item?.itemId
      );

      if (Number(quantity) === 0) {
        if (existingIndex > -1) {
          newItems.splice(existingIndex, 1);
        }
      } else {
        if (existingIndex > -1) {
          newItems[existingIndex] = {
            ...newItems[existingIndex],
            quantity,
          };
        } else {
          newItems.push({
            itemType,
            itemId: item?.itemId,
            itemName: item?.itemName,
            unitPrice: item?.unitPrice,
            quantity,
            packageId: item?.packageId,
            installmentFeePrice: item?.installmentFeePrice,
            isInstallmentFee: item?.isInstallmentFee,
          });
        }
      }

      return {
        ...prev,
        items: newItems,
        selectedPackageId:
          itemType === "package" && Number(quantity) > 0
            ? item?.itemId
            : prev.selectedPackageId,
      };
    });
  };

  const handleConfirmRedeemption = async (committedPoint: string) => {
    if (!committedPoint)
      return notify({
        notificationText: "You need to commit at least a point to proceed",
      });
    const reqData: pointRedeemptionReqAttributes = {
      committedPoint: committedPoint,
      tripId: String(tripId) as string,
      selectedItems: redeemDraft?.items,
      participantData,
      orderId: "",
      esignatureImgURL: componentState?.esignatureImgURL,
      esignaturePublicURL: componentState?.esignaturePublicURL,
    };
    try {
      await fetchIt({
        apiEndPoint: `customer/redeem/order`,
        reqData: reqData,
        httpMethod: "post",
        isSuccessNotification: {
          notificationText: "Success",
          notificationState: true,
        },
      });
      notify({
        notificationText:
          "Thank you for your order, we will send you email regarding your transaction",
        notificationState: true,
        icon: "ri-user-smile-line",
      });
      closeModal();
      return;
    } catch (error) {
      return;
    }
  };

  const handlePointMondalToggle = () => {
    const validatePackage = redeemDraft?.items?.some(
      (item) => item?.itemType === "package"
    );
    if (!validatePackage) {
      return notify({
        notificationText:
          "You need to select at least one package before proceeding",
        notificationState: true,
      });
    }
    // Check participant details before moving to next screen
    if (Number(componentState?.selectedScreen) === 2) {
      const incompleteParticipant = participantData.some((participant) => {
        const { participantFirstName, participantLastName, participantEmail } =
          participant.participantNameInfo;
        return (
          !participantFirstName?.trim() ||
          !participantLastName?.trim() ||
          !participantEmail?.trim()
        );
      });

      if (incompleteParticipant) {
        return notify({
          notificationText:
            "Please fill in all participant details before proceeding",
          notificationState: true,
        });
      }
    }
    if (
      Number(componentState?.selectedScreen) == 2 &&
      !componentState?.hasSignedContract
    ) {
      setComponentState((prev) => ({ ...prev, signatureState: true }));
      return;
    }

    if (Number(componentState?.selectedScreen) === 3) return;
    setComponentState((prev) => ({
      ...prev,
      selectedScreen: Number(componentState?.selectedScreen) + 1,
    }));
  };

  const handleScreenSelection = (index: number) => {
    if (Number(index) > componentState?.selectedScreen) {
      notify({
        notificationText: "Use the Next Button to navigate forward",
        notificationState: true,
      });
      return;
    }
    setComponentState((prev) => ({ ...prev, selectedScreen: index }));
  };

  const updateParticipantData = () => {
    const user = (userState?.user as userAttributes) || {};

    // Copy previous participant data
    const existingData = [...participantData];

    const newParticipantData: participantDataAttributes[] = [];

    redeemDraft.items
      .filter((item) => item.itemType === "package")
      .forEach((pkg) => {
        for (let i = 0; i < Number(pkg.quantity || 0); i++) {
          // Check if this participant already exists in existingData
          const existingParticipant = existingData.find(
            (p) =>
              p.packageName === pkg.itemName && i === existingData.indexOf(p)
          );

          if (existingParticipant) {
            // Keep the existing participant data
            newParticipantData.push(existingParticipant);
          } else {
            // Create a new participant
            const isFirstParticipant = newParticipantData.length === 0; // first participant overall
            newParticipantData.push({
              participantNameInfo: {
                participantFirstName: isFirstParticipant
                  ? user?.fullName || user?.firstName || ""
                  : "",
                participantLastName: isFirstParticipant
                  ? user?.fullName || user?.lastName || ""
                  : "",
                participantEmail: isFirstParticipant ? user?.email || "" : "",
                participantPhoneNumber: isFirstParticipant
                  ? user?.phoneNumber || ""
                  : "",
              },
              packageName: pkg.itemName,
              packageId: pkg?.packageId,
              questions: [],
              textAnswer: [],
              checkBoxAnser: [],
              multipleChoiceAnswer: [],
              dateQuestionType: [],
              fileQuestionType: [],
            });
          }
        }
      });

    setParticipantData(newParticipantData);
  };

  const handleESignature = async (value: boolean) => {
    if (!value)
      return notify({
        notificationText:
          "You need to sign the E-Contract before proceeding with your order",
      });

    const reqData = {
      contractOwnerId: tripsData?.contractEsignature?.contractUserId,
      signeeName: userState?.user?.fullName
        ? userState?.user?.fullName
        : `${userState?.user?.firstName} ${userState?.user?.lastName}`,
    };

    try {
      const res = await fetchIt({
        apiEndPoint: "customer/contract/sign",
        httpMethod: "post",
        reqData: reqData,
        isSuccessNotification: {
          notificationText: "Click Next to Complete your Order",
          notificationState: true,
          isTimer: true,
          timer: 3000,
        },
      });
      const payload = res?.payload as {
        esignatureImgURL: string;
        esignaturePublicURL: string;
      };
      setComponentState((prev) => ({
        ...prev,
        hasSignedContract: true,
        signatureState: false,
        esignatureImgURL: payload?.esignatureImgURL,
        esignaturePublicURL: payload?.esignaturePublicURL,
      }));
      return;
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    updateParticipantData();
  }, [redeemDraft.items]);

  return (
    <>
      <EsignatureComponent
        signatureState={componentState?.signatureState as boolean}
        closeSignatureState={() => {}}
        onSign={(value: boolean) => handleESignature(value)}
        contractPayload={{
          contractTitle:
            tripsData?.contractEsignature?.header?.headerTitle || "",
          contractBody: tripsData?.contractEsignature?.text || "",
          contractLogo: tripsData?.contractEsignature?.img || "",
        }}
        signeeeName={
          userState?.user?.fullName
            ? userState?.user?.fullName
            : `${userState?.user?.firstName} ${userState?.user?.lastName}`
        }
      />{" "}
      <NonBTNModalUIComponent
        modalText={``}
        modalState={modalState}
        disableOutSideBoxClose={false}
        closeModalCustomFunc={handleCloseModal}
        headerDivClassName="bg-primary w-full"
        hederTextClassName="!text-white"
        containerClassName=" "
        className=""
        closeButtonClassName="!text-white !px-2 sm:!p-4"
      >
        <div
          className={`flex flex-col  h-full ${
            componentState?.signatureState && "opacity-0"
          }`}
        >
          {/* Main scrollable content */}
          <div className="flex flex-col  flex-grow overflow-y-auto no-scrollbar">
            <BookingHeader
              onScreenChange={(index) => handleScreenSelection(index)}
              tripName={tripsData?.tripName}
              startDate={tripsData?.startDate as string}
              endDate={tripsData?.endDate as string}
              selectedScreen={componentState?.selectedScreen}
            />

            <div className="!mt-10">
              {componentState?.selectedScreen === 0 ? (
                <PackageSelection
                  tripPackages={tripsData?.tripPackages as tripSubPackages[]}
                  redeemDraft={redeemDraft}
                  qtyOptions={qtyOptions}
                  upsertItem={upsertItem}
                />
              ) : componentState?.selectedScreen === 1 ? (
                <div className="!px-3">
                  <AddOnSelection
                    tripAddOns={tripsData?.tripAddOns as tripAddOnAttributes[]}
                    upsertItem={upsertItem}
                    qtyOptions={qtyOptions}
                    redeemDraft={redeemDraft}
                  />
                </div>
              ) : componentState?.selectedScreen === 2 ? (
                <div>
                  <ParticipantInformation
                    setParticipantData={setParticipantData}
                    participantData={participantData}
                  />
                </div>
              ) : componentState?.selectedScreen == 3 ? (
                <div>
                  <RedeemPointCheckOut
                    onConfirm={(committedPoint: string) =>
                      handleConfirmRedeemption(committedPoint)
                    }
                    userTotalPoints={tripsData?.userTotalPoint}
                    items={redeemDraft?.items}
                  />
                </div>
              ) : (
                <div className="w-full h-full flex justify-center items-center">
                  <TextUIComponent type="p" text="Page Not Found" />
                </div>
              )}
            </div>
          </div>

          {/* Sticky summary at the bottom */}
          <div
            className={`${componentState?.selectedScreen === 3 && "hidden"}`}
          >
            <CheckoutSummary
              items={redeemDraft?.items}
              onRedeemClick={handlePointMondalToggle}
              btnText="Next"
            />
          </div>
        </div>
      </NonBTNModalUIComponent>
    </>
  );
}
