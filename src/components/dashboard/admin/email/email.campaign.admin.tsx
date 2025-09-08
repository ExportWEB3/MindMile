import { useMemo, useState } from "react";
import type { EmailCampaignTable } from "../../../../utilities/types.declarationts";

import {
  emailCampaignSummary,
  emailCampaignTableData,
} from "../../../../utilities/data";
import { AdminLayOutComponent } from "../../../layouts/layout.admin";

import { CardUIComponent } from "../../../../utilities/UI/card.ui";
import { ComponetDataDisplayer } from "../../../../utilities/UI/data.display.ui";
import { IconUIComponent } from "../../../../utilities/UI/icon.ui";
import { PaginationUIComponent } from "../../../../utilities/UI/pagination.ui";
import { TableUIComponent } from "../../../../utilities/UI/table.ui";
import { TextUIComponent } from "../../../../utilities/UI/texts.ui";
import { ButtonUIComponent } from "../../../../utilities/UI/button.ui";
import { customPageHook } from "../../../../hooks/custom.hook";

export function AdminEmailCampaign() {
  const [userPage] = useState(1);
  const { pageNumber, handlePage } = customPageHook();

  const userData: EmailCampaignTable[] = Array.from({ length: 25 }, (_, i) => {
    const baseUser = emailCampaignTableData[i % emailCampaignTableData.length];
    return {
      ...baseUser,
    };
  });

  const userRowsPerPage = 5;
  const userRows = userData;
  const userTotalPages = Math.ceil(userRows.length / userRowsPerPage);

  const paginatedUserRows = useMemo(
    () =>
      userRows.slice(
        (userPage - 1) * userRowsPerPage,
        userPage * userRowsPerPage
      ),
    [userRows, userPage]
  );

  return (
    <AdminLayOutComponent title="Admin Dashboard">
      <ComponetDataDisplayer loading={false}>
        <section className="flex flex-col">
          <section className="w-full flex flex-col md:flex-row justify-between">
            {emailCampaignSummary.map((item, index) => (
              <span
                key={index}
                className="w-full !mt-2 md:!mt-0 md:w-[23%] lg:w-[30%]"
              >
                <CardUIComponent
                  title={item?.label}
                  value={item?.value}
                  valueClassName="!text-primay-very-dark"
                />
              </span>
            ))}
          </section>

          <TextUIComponent
            type="h4"
            text="Email Campaigns"
            className="!mt-10 !text-primay-very-dark"
          />

          {/* Table Section */}
          <div className="w-full h-fit !mt-10 border border-gray-300 rounded-lg">
            <div className="w-full h-16 bg-primary-23 rounded-t-lg flex items-center !px-5">
              <TextUIComponent
                type="h4"
                text="Email Campaigns"
                className="!text-primay-very-dark"
              />
            </div>

            <TableUIComponent
              columnKeys={["name", "type", "status", "performance", "actions"]}
              headerData={[
                "Campaign Name",
                "Type",
                "Status",
                "Performance",
                "Actions",
              ]}
              data={paginatedUserRows}
              columnRenderers={{
                name: (row) => (
                  <div className="flex items-center gap-3">
                    <div>
                      <TextUIComponent
                        type="h6"
                        text={row.name?.campaignName}
                        className="!text-primay-very-dark"
                      />
                      <TextUIComponent type="p" text={row.name?.campaignStat} />
                    </div>
                  </div>
                ),
                type: (row) => (
                  <span className="flex items-center gap-2 !px-2 !py-[10px] bg-primary-23 justify-center rounded-full">
                    <TextUIComponent
                      type="h6"
                      text={row.type}
                      className={`${
                        row.type === "Alert"
                          ? "!text-primary"
                          : row.type === "Promotion"
                          ? "!text-primay-very-dark"
                          : row.type === "Onboard"
                          ? "!text-primary"
                          : ""
                      }`}
                    />
                  </span>
                ),
                status: (row) => (
                  <span className="flex items-center gap-2 !px-2 !py-[10px] bg-primary-23 justify-center rounded-full">
                    <TextUIComponent
                      type="h6"
                      text={row.status}
                      className={`${
                        row.status === "Active"
                          ? "!text-primary"
                          : row.status === "Inactive"
                          ? "!text-secondary-red"
                          : ""
                      }`}
                    />
                  </span>
                ),
                actions: () => (
                  <div className="flex gap-4">
                    <span className="cursor-pointer border !px-1 h-6 flex justify-center border-primary rounded-md">
                      <IconUIComponent
                        icon="ri-eye-line"
                        className="text-base"
                      />
                    </span>

                    <span className="cursor-pointer border !px-1 h-6 flex justify-center border-primary rounded-md">
                      <IconUIComponent
                        icon="ri-edit-line"
                        className="text-base"
                      />
                    </span>

                    <span className="cursor-pointer border !px-1 h-6 flex justify-center border-primary rounded-md">
                      <IconUIComponent
                        icon="ri-more-2-fill"
                        className="text-base"
                      />
                    </span>
                  </div>
                ),
              }}
            />
          </div>

          <div className="w-full h-fit flex flex-col items-end !mt-4">
            <PaginationUIComponent
              setPageNumber={handlePage}
              pageNumber={pageNumber}
              totalPages={userTotalPages}
            />
            <ButtonUIComponent
              type="button"
              text="Save Changes"
              className="w-[200px] h-14 !mt-10 rounded-lg"
            />
          </div>
        </section>
      </ComponetDataDisplayer>
    </AdminLayOutComponent>
  );
}