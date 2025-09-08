
import { useSearchParams } from "react-router-dom";
import { useCustomQuery } from "../../../../hooks/custom.hook";
import { ButtonUIComponent } from "../../../../utilities/UI/button.ui";
import { tabs } from "../../../../utilities/data";

export function ProfileHeaderTabs() {
  const { generateQuery } = useCustomQuery();
const [searchParams] = useSearchParams();
const currentTab = searchParams.get("screenname") || "profile";



  const handleTabClick = (tab: any) => {
    generateQuery({
      path: tab.path,
      query: { screenname: tab.key },
    });
  };

  return (
    <section className="flex items-center rounded-xl !mt-10 !px-10 w-full h-14 gap-[500px] max-[950px]:gap-[200px] max-[665px]:gap-[50px] max-[490px]:gap-10 bg-gray-200">
      {tabs.map((tab) => (
        <ButtonUIComponent
          key={tab.key}
          text={`${tab.label}`}
          onClick={() => handleTabClick(tab)}
          className={`h-8 max-[490px]:w-24 border-none ${
            currentTab === tab.key
              ? " !bg-primary text-white"
              : "!text-primay-very-dark bg-gray-200"
          }`}
        />
      ))}
    </section>
  );
}
