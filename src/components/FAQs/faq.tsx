import { faqsData } from "../../utilities/data";
import type { userRoleAttributes } from "../../utilities/types.declarationts";
import { AccordionUI } from "../../utilities/UI/accordion.ui";
import { TitleUIComponent } from "../../utilities/UI/texts.ui";

export function FrequentAskQuestionsHome(props: {
  userRole: userRoleAttributes;
}) {
  const { userRole } = props;
  return (
    <section className="w-full  customContainerModified ">
      <TitleUIComponent
        text={`Frequently Asked Questions`}
        type="h2"
        className=" text-center"
      />
      <div className="flex flex-col w-full  border border-dark-very-light-50 !p-4 !mt-7">
        <div className={` w-full`}>
          <AccordionUI data={faqsData || []} userRole={userRole} />
        </div>
      </div>
    </section>
  );
}
