import {
  activeSessions,
  personalInfo,
  pointsRedemptionData,
  profilePointsSummary,
  subscriptionInfo,
} from "../../../../utilities/data";
import { ButtonUIComponent } from "../../../../utilities/UI/button.ui";
import { TableUIComponent } from "../../../../utilities/UI/table.ui";
import { TextUIComponent, TitleUIComponent } from "../../../../utilities/UI/texts.ui";
import { LayoutComponent } from "../../../layouts/layout.general";
import { ProfileHeaderTabs } from "./profile.header";

export function ProfileComponent() {
  return (
    <LayoutComponent>
      <section className="w-full h-full">
        <ProfileHeaderTabs />

        <div className="w-full h-full flex flex-col">
          {/* Profile Title */}
          <TitleUIComponent
            type="h4"
            text="Profile"
            className="!text-primay-very-dark !mt-14"
          />

          {/* Personal Information */}
          <div className="w-full h-[200px] bg-white border border-gray-300 rounded-xl !pt-7 !mt-10 !px-5 max-[600px]:!px-2">
            <span className="w-full flex justify-between items-center">
              <TextUIComponent
                type="h5"
                text="Personal Information"
                className="!text-primay-very-dark"
              />
              <ButtonUIComponent
                type="button"
                text="Edit Profile"
                className="h-10 w-[150px] rounded-xl"
              />
            </span>

            <div className="w-full h-[120px] flex items-center gap-12 max-[390px]:gap-3 ">
              <div className="bg-primary text-white w-[80px] h-[80px] max-[390px]:w-[50px] max-[390px]:h-[50px] flex flex-col items-center justify-center rounded-full "></div>
              <div className="!space-y-1">
                {personalInfo.map((item, idx) => (
                  <TextUIComponent
                    key={idx}
                    type="p"
                    text={`${item.label}: ${item.value}`}
                    className="!text-primay-very-dark"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Current Subscription */}
        <div className="w-full h-[700px]  max-[768px]:h-[950px]  bg-white border rounded-xl border-gray-300 !pt-7 !mt-10 !px-5 max-[600px]:!px-2">
          <div className="w-full h-12 flex justify-between">
            <TextUIComponent
              type="h3"
              text="Current Subscription"
              className="!text-primay-very-dark"
            />
            {activeSessions.map((item, index) => (
              <ButtonUIComponent
                key={index}
                type="button"
                text={`${item.activeStatus}`}
                isBorder={true}
                className="w-32 max-[361px]:w-20 h-10 rounded-full bg-white"
              />
            ))}
          </div>

          <div className="!space-y-1">
            {subscriptionInfo.map((item, index) => (
              <TextUIComponent
                key={index}
                type="p"
                text={`${item.label} ${item.value}`}
                className="!text-primay-very-dark"
              />
            ))}
          </div>

          {/* Subscription Actions */}
          <div className="w-[50%] max-[1277px]:w-[60%] max-[1058px]:w-[70%] max-[910px]:w-[100%] !p-5 max-[515px]:!p-2 h-[120px] max-[515px]:h-[160px] !mt-20 border border-gray-300 rounded-xl">
            <TextUIComponent
              type="h5"
              text="Subscription Actions"
              className="!text-primay-very-dark"
            />
            <div className="w-full h-10 gap-3 !mt-4 flex max-[515px]:gap-[2px] max-[515px]:grid max-[515px]:grid-cols-3">
              <ButtonUIComponent
                type="button"
                text="Downgrade"
                className="bg-primary-dark h-10 w-full rounded-[11px]"
              />
              <ButtonUIComponent
                type="button"
                text="Upgrade"
                className="bg-primary h-10 w-full rounded-[11px]"
              />
              <ButtonUIComponent
                type="button"
                text="Cancel"
                className="bg-secondary-red h-10 w-full rounded-[11px]"
              />
            </div>
          </div>

          {/* Points Summary & Redemption History */}
          <div className="w-full h-[250px] !mt-14 md:flex gap-4 max-[768px]:!space-y-2">
            {/* Points Summary */}
            <div className="w-full h-full border border-gray-300 p-4 rounded-lg">
              <div className="w-full h-14 !px-5 bg-red-100 flex items-center rounded-t-lg">
                <TextUIComponent
                  type="h5"
                  text="Points Summary"
                  className="!text-primay-very-dark"
                />
              </div>
              <div className="!px-5 h-44 !space-y-2 flex flex-col justify-center">
                {profilePointsSummary.map((item, index) => (
                  <TextUIComponent
                    key={index}
                    type="p"
                    text={`${item.label}: ${item.value}`}
                    className="!text-primay-very-dark"
                  />
                ))}
              </div>
            </div>

            {/* Points Redemption History */}
            <div className="w-full h-full border border-gray-300 p-4 rounded-lg">
              <div className="w-full h-14 flex rounded-t-lg items-center !px-5 bg-red-100">
                <TextUIComponent
                  type="h5"
                  text="Points Redemption History"
                  className="!text-primay-very-dark"
                />
              </div>
              <TableUIComponent
                columnKeys={["date", "trip", "pointsUsed"]}
                headerData={["Date", "Trip", "Points Used"]}
                data={pointsRedemptionData?.pointsTable}
              /> 
            </div>
          </div>
        </div>

        {/* Save Changes Button */}
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
