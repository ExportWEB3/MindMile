import { subscriptionData } from "../../utilities/data";
import { ButtonUIComponent } from "../../utilities/UI/button.ui";
import { TextUIComponent, TitleUIComponent } from "../../utilities/UI/texts.ui";
import { FrequentAskQuestionsHome } from "../FAQs/faq";
import { EarningFooterSection } from "../footer/footer";

export function HomeComponent() {
  return (
    <section className="w-full flex flex-col bg-white ">
      <div className="w-full customContainerModified h-full md:!mt-10 flex flex-col justify-center items-center">
        <span className=" sm:w-[65%]  2xl:w-[45%] flex flex-col">
          <TitleUIComponent
            text="Enhance Your Experience with a Smart Subscription"
            type="h1"
            className="text-center uppercase"
          />

          <TextUIComponent
            text="Earn points with every subscription payment."
            type="h6"
            className="text-center !mt-3"
          />

          <span className="!mt-4 flex w-full justify-center">
            <ButtonUIComponent
              text="Learn More"
              icon="ri-arrow-right-line"
              className="lg:w-[283px] rounded-[5px] "
              iconClassName="!text-white !mt-1 !ml-2"
            />
          </span>
        </span>

        <div className="w-full lg:w-[97%]  rounded-[10px] items-center justify-center flex flex-col h-[100px] lg:h-[130px] border border-primary !mt-16 md:!mt-20">
          <TitleUIComponent
            text="Choose Your Subscription Plan"
            type="h2"
            className="text-center !text-primay-very-dark"
          />
          <TitleUIComponent
            text="Select a plan that fits your needs."
            type="h6"
          />
        </div>
      </div>

      <section className="!mt-20 ">
        <FrequentAskQuestionsHome userRole="customer_mit" />
      </section>

      <section className="!mt-20 ">
        <EarningFooterSection />
      </section>
    </section>
  );
}
