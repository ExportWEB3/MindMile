import {
  convertDate,
  formatToTitleCase,
} from "../../../../utilities/helper.function";
import type { UsersResponseTableAttributes } from "../../../../utilities/types.declarationts";
import { CardUIComponent } from "../../../../utilities/UI/card.ui";
import { NonBTNModalUIComponent } from "../../../../utilities/UI/modal.ui";
import { ProfilePictureComponent } from "../../../../utilities/UI/profile.ui";
import {
  TextUIComponent,
  TitleUIComponent,
} from "../../../../utilities/UI/texts.ui";

export function ManageUserDetailsAdmin(props: {
  modalState: boolean;
  closeModal: () => void;
  userDetails: UsersResponseTableAttributes;
}) {
  const { modalState, closeModal, userDetails } = props;

  const handleClose = () => {
    if (!closeModal) return;
    closeModal();
  };

  return (
    <NonBTNModalUIComponent
      disableOutSideBoxClose={false}
      modalText="User Details"
      modalState={modalState}
      closeModalCustomFunc={handleClose}
    >
      <section className="flex flex-col gap-6 !p-4 w-full">
        {/* Header with picture + name */}
        <div className="flex items-center gap-4">
          <ProfilePictureComponent
            displayDetails={false}
            isReview={false}
            imgURL={userDetails?.picture}
            className="!w-16 !h-16 rounded-full shadow-md"
            iconClassName="!text-primary-30"
          />
          <div className="flex flex-col">
            <TitleUIComponent
              type="h3"
              text={userDetails?.name}
              className="text-lg font-semibold text-color-primary-dark"
            />
            <TextUIComponent
              type="p"
              text={userDetails?.email}
              className="text-sm text-color-dark-light"
            />
            <TextUIComponent
              type="p"
              text={userDetails?.phoneNumber}
              className="text-sm text-color-dark-light"
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <CardUIComponent
            title="Total Points"
            value={userDetails?.totalPoint}
            valueClassName="text-color-primary"
          />
          <CardUIComponent
            title="Expired Points"
            value={userDetails?.expiredPoint}
            valueClassName="text-color-secondary-red"
          />
          <CardUIComponent
            title="Total Spent"
            value={userDetails?.totalSpent}
            valueClassName="text-color-primary-dark"
          />
          <CardUIComponent
            title="User Type"
            value={userDetails?.userType}
            valueClassName="text-color-dark-light"
          />
        </div>

        {/* User Details Section */}

        <div className=" !pt-4 border-t border-dark-light-38">
          <TitleUIComponent
            type="h4"
            text="User Information"
            className="text-base font-semibold text-color-primary-dark !mb-3"
          />

          <div className="grid grid-cols-2 gap-x-6 gap-y-3 bg-color-primary-white rounded-lg border border-dark-light-38 !p-4 shadow-sm">
            <div>
              <TextUIComponent
                type="p"
                text="Joined Date"
                className="text-xs text-color-dark-light"
              />
              <TextUIComponent
                type="p"
                text={userDetails?.joinedDate || "N/A"}
                className="text-sm font-medium text-color-primary-dark"
              />
            </div>
            <div>
              <TextUIComponent
                type="p"
                text="Last Login"
                className="text-xs text-color-dark-light"
              />
              <TextUIComponent
                type="p"
                text={userDetails?.lastLogin || "N/A"}
                className="text-sm font-medium text-color-primary-dark"
              />
            </div>
            <div>
              <TextUIComponent
                type="p"
                text="Address"
                className="text-xs text-color-dark-light"
              />
              <TextUIComponent
                type="p"
                text={userDetails?.address || "N/A"}
                className="text-sm font-medium text-color-primary-dark"
              />
            </div>
            <div>
              <TextUIComponent
                type="p"
                text="Affiliate"
                className="text-xs text-color-dark-light"
              />
              <TextUIComponent
                type="p"
                text={
                  userDetails?.isAffiliate ? "MIT Affiliate" : "Not Affiliate"
                }
                className={`text-sm font-medium ${
                  userDetails?.isAffiliate
                    ? "text-color-primary"
                    : "text-color-dark-light"
                }`}
              />
            </div>
          </div>
        </div>

        {/* Subscription Section */}
        <div className=" !pt-4 border-t border-dark-light-38">
          <TitleUIComponent
            type="h4"
            text="Subscription"
            className="text-base font-semibold text-color-primary-dark !mb-3"
          />

          <div className="grid grid-cols-2 gap-x-6 gap-y-3 bg-color-primary-white rounded-lg border border-dark-light-38 !p-4 shadow-sm">
            <div>
              <TextUIComponent
                type="p"
                text="Plan"
                className="text-xs text-color-dark-light"
              />
              <TextUIComponent
                type="p"
                text={formatToTitleCase(userDetails?.subsriptionPlan) || "N/A"}
                className="text-sm font-medium text-color-primary-dark"
              />
            </div>
            <div>
              <TextUIComponent
                type="p"
                text="Monthly Fee"
                className="text-xs text-color-dark-light"
              />
              <TextUIComponent
                type="p"
                text={userDetails?.monthlyFee || "N/A"}
                className="text-sm font-medium text-color-primary-dark"
              />
            </div>
            <div>
              <TextUIComponent
                type="p"
                text="Last Payment"
                className="text-xs text-color-dark-light"
              />
              <TextUIComponent
                type="p"
                text={userDetails?.lastPayment || "N/A"}
                className="text-sm font-medium text-color-primary-dark"
              />
            </div>
            <div>
              <TextUIComponent
                type="p"
                text="Next Billing"
                className="text-xs text-color-dark-light"
              />
              <TextUIComponent
                type="p"
                text={userDetails?.nextBillingDate || "N/A"}
                className="text-sm font-medium text-color-primary-dark"
              />
            </div>
          </div>
        </div>

        {/* Activity Logs */}
        <div className="border-t border-dark-light-38 !pt-4">
          <TitleUIComponent
            type="h4"
            text="Activity Logs"
            className="text-base font-semibold text-color-primary-dark !mb-2"
          />

          {/* Point Activity */}
          <div className="!mb-3">
            <TextUIComponent
              type="p"
              text="Point Activity"
              className="text-sm font-medium text-color-dark-light !mb-1"
            />
            <div className="max-h-32 overflow-y-auto border rounded !p-2 bg-color-primary-white">
              {userDetails?.pointActivityLog.length > 0 ? (
                userDetails?.pointActivityLog.map((log) => (
                  <TextUIComponent
                    key={log._id}
                    type="p"
                    text={`${convertDate({
                      date: log.logDate,
                      isFortmat: true,
                    })}: ${log.logMessage}`}
                    className="text-xs text-color-dark-light"
                  />
                ))
              ) : (
                <TextUIComponent
                  type="p"
                  text="No point activity."
                  className="text-xs text-color-dark-very-light"
                />
              )}
            </div>
          </div>

          {/* User Activity */}
          <div className="!mb-3">
            <TextUIComponent
              type="p"
              text="User Activity"
              className="text-sm font-medium text-color-dark-light !mb-1"
            />
            <div className="max-h-32 overflow-y-auto border rounded !p-2 bg-color-primary-white">
              {userDetails?.userActivityLog?.length > 0 ? (
                userDetails?.userActivityLog?.map((log) => (
                  <TextUIComponent
                    key={log?._id}
                    type="p"
                    text={`${convertDate({
                      date: log.logDate,
                      isFortmat: true,
                    })}: ${log.logMessage}`}
                    className="text-xs text-color-dark-light"
                  />
                ))
              ) : (
                <TextUIComponent
                  type="p"
                  text="No user activity."
                  className="text-xs text-color-dark-very-light"
                />
              )}
            </div>
          </div>

          {/* Email History */}
          <div>
            <TextUIComponent
              type="p"
              text="Email History"
              className="text-sm font-medium text-color-dark-light !mb-1"
            />
            <div className="max-h-32 overflow-y-auto border rounded !p-2 bg-color-primary-white">
              {userDetails?.emailHistry?.length > 0 ? (
                userDetails?.emailHistry?.map((log) => (
                  <TextUIComponent
                    key={log._id}
                    type="p"
                    text={`${convertDate({
                      date: log.logDate,
                      isFortmat: true,
                    })}: ${log.logMessage}`}
                    className="text-xs text-color-dark-light"
                  />
                ))
              ) : (
                <TextUIComponent
                  type="p"
                  text="No email history."
                  className="text-xs text-color-dark-very-light"
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </NonBTNModalUIComponent>
  );
}
