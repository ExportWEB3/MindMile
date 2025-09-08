import { useSWRHook } from "../../../../hooks/custom.hook";
import type { UsersResponseDataAttributes } from "../../../../utilities/types.declarationts";
import { CardUIComponent } from "../../../../utilities/UI/card.ui";
import { ComponetDataDisplayer } from "../../../../utilities/UI/data.display.ui";

export function UsersGlobalStats() {
  const { fetchData, fetchIsLoading } = useSWRHook({
    apiEndPoint: `platform/users/global/record`,
    cacheKey: `platform/users/global/record`,
  });
  const { stats = [] } = (fetchData?.payload ||
    {}) as UsersResponseDataAttributes;

  return (
    <ComponetDataDisplayer
      error={
        !Array.isArray(stats) || stats.length < 1
          ? "Users global stats not available"
          : ""
      }
      loading={fetchIsLoading}
    >
      <section className="w-full !mt-5 flex-col flex flex-wrap md:flex-row justify-between">
        {stats?.map((item, index) => (
          <span
            key={index}
            className="relative w-full !mt-2 md:!mt-0 md:w-[23%] lg:w-[20%]"
          >
            <CardUIComponent
              title={item?.title}
              value={item?.value}
              valueClassName={` ${
                item?.slug === "expired" ? "!text-secondary-red" : ""
              }`}
            />
          </span>
        ))}
      </section>
    </ComponetDataDisplayer>
  );
}
