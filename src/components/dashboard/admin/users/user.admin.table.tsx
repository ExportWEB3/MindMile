import type { Dispatch, SetStateAction } from "react";
import type {
  adminManageUserStateAttributes,
  UsersResponseTableAttributes,
} from "../../../../utilities/types.declarationts";
import { IconUIComponent } from "../../../../utilities/UI/icon.ui";
import { ProfilePictureComponent } from "../../../../utilities/UI/profile.ui";
import { TableUIComponent } from "../../../../utilities/UI/table.ui";
import { TextUIComponent } from "../../../../utilities/UI/texts.ui";

export function UsersAdminTableList(props: {
  users: UsersResponseTableAttributes[];
  setUserManagementComponentState: Dispatch<
    SetStateAction<adminManageUserStateAttributes>
  >;
}) {
  const { users, setUserManagementComponentState } = props;

  return (
    <section className="w-full flex flex-col ">
      <TableUIComponent
        columnKeys={[
          "name",
          "contact",
          "joinedDate",
          "userType",
          "subsriptionPlan",
          "lastPayment",
          "totalPoint",
          "actions",
        ]}
        headerData={[
          "Name",
          "Contact",
          "Joined Date",
          "Role",
          "Subscription",
          "Last Payment",
          "Total Points",
          "Actions",
        ]}
        data={users}
        columnRenderers={{
          name: (data) => (
            <div className="flex items-center ">
              <ProfilePictureComponent
                displayDetails={false}
                isReview={false}
                imgURL={data?.picture}
                className=""
                iconClassName="!text-primary-30"
              />
              <TextUIComponent text={data?.name} type="p" />
            </div>
          ),

          contact: (data) => (
            <div className="flex flex-col ">
              <TextUIComponent text={data?.name} type="p" />
              <TextUIComponent
                text={data?.phoneNumber}
                type="p"
                className="!mt-1"
              />
            </div>
          ),

          userType: (data) => (
            <div className="flex flex-col ">
              <TextUIComponent
                text={data?.userType}
                type="p"
                className={`!text-primary`}
              />
            </div>
          ),
          actions: (row) => (
            <div className="flex gap-4 ">
              <span
                onClick={() =>
                  setUserManagementComponentState((prev) => ({
                    ...prev,
                    modalState: true,
                    userDetails: row,
                    eventType: "readOnly",
                  }))
                }
                className="cursor-pointer border !px-1 h-6 flex  justify-center border-primary rounded-md"
              >
                <IconUIComponent icon="ri-eye-line" className="text-base" />
              </span>

              <span
                onClick={() =>
                  setUserManagementComponentState((prev) => ({
                    ...prev,
                    modalState: true,
                    userDetails: row,
                    eventType: "writeOnly",
                  }))
                }
                className="cursor-pointer border !px-1 h-6 flex  justify-center border-primary rounded-md"
              >
                <IconUIComponent icon="ri-edit-line" className="text-base" />
              </span>
            </div>
          ),
        }}
      />
    </section>
  );
}
