import { ComponetDataDisplayer } from "../../../../utilities/UI/data.display.ui";

import { PaginationUIComponent } from "../../../../utilities/UI/pagination.ui";
import { TextUIComponent } from "../../../../utilities/UI/texts.ui";
import { AdminLayOutComponent } from "../../../layouts/layout.admin";

import { customPageHook, useSWRHook } from "../../../../hooks/custom.hook";
import { UsersGlobalStats } from "./user.global.stats";
import type {
  adminManageUserStateAttributes,
  UsersResponseDataAttributes,
  UsersResponseTableAttributes,
} from "../../../../utilities/types.declarationts";
import { useState, type Dispatch, type SetStateAction } from "react";
import { UsersAdminTableList } from "./user.admin.table";
import { ManageUserDetailsAdmin } from "./userdetails.admin";
import { EditUserManagementAdmin } from "./edit.user.admin";
import { AddUserAdminManagament } from "./adduser.admin";

export function AdminManageUsers() {
  const { pageNumber, handlePage } = customPageHook();
  const [userManagementComponentState, setUserManagementComponentState] =
    useState<adminManageUserStateAttributes>({
      modalState: false,
      userDetails: null,
      eventType: "readOnly",
      addUserModalState: false,
    });
  const { fetchData, fetchIsLoading } = useSWRHook({
    apiEndPoint: "platform/users/records",
    cacheKey: "platform/users/records",
  });
  const { users = [], pagination } = (fetchData?.payload ||
    {}) as UsersResponseDataAttributes;

  return (
    <>
      <AddUserAdminManagament
        modalState={userManagementComponentState?.addUserModalState as boolean}
        closeModal={() =>
          setUserManagementComponentState((prev) => ({
            ...prev,
            addUserModalState: false,
          }))
        }
      />

      <ManageUserDetailsAdmin
        modalState={
          userManagementComponentState?.modalState &&
          userManagementComponentState?.eventType === "readOnly"
        }
        userDetails={
          userManagementComponentState?.userDetails as UsersResponseTableAttributes
        }
        closeModal={() =>
          setUserManagementComponentState((prev) => ({
            ...prev,
            modalState: false,
          }))
        }
      />

      <EditUserManagementAdmin
        modalState={
          userManagementComponentState?.modalState &&
          userManagementComponentState?.eventType === "writeOnly"
        }
        userDetails={
          userManagementComponentState?.userDetails as UsersResponseTableAttributes
        }
        closeModal={() =>
          setUserManagementComponentState((prev) => ({
            ...prev,
            modalState: false,
            eventType: "readOnly",
          }))
        }
      />

      <AdminLayOutComponent
        btnFunction={() =>
          setUserManagementComponentState((prev) => ({
            ...prev,
            addUserModalState: true,
          }))
        }
        title="Admin Dashboard"
        btnText="Add User"
      >
        <ComponetDataDisplayer loading={fetchIsLoading}>
          <section className="flex flex-col">
            <UsersGlobalStats />

            <TextUIComponent
              type="h4"
              text="User Management"
              className="!text-primay-very-dark !mt-10"
            />
            <section className="w-full !mt-7">
              <UsersAdminTableList
                setUserManagementComponentState={
                  setUserManagementComponentState as Dispatch<
                    SetStateAction<adminManageUserStateAttributes>
                  >
                }
                users={users}
              />
            </section>
            <div className="w-full h-fit !pb-12 !mt-10">
              <PaginationUIComponent
                setPageNumber={handlePage}
                pageNumber={pageNumber}
                totalPages={pagination?.totalPageSize || 1}
              />
            </div>
          </section>
        </ComponetDataDisplayer>
      </AdminLayOutComponent>
    </>
  );
}
