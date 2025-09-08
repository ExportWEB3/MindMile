import { featuresData } from "../../utilities/data";
import { IconUIComponent } from "../../utilities/UI/icon.ui";
import { TextUIComponent, TitleUIComponent } from "../../utilities/UI/texts.ui";

export function WelcomeScreenComponent() {
  return (
    <section className="w-full flex flex-col customContainerModified">
      <div className="w-full flex flex-col items-center">
        <TitleUIComponent
          text="Welcome to our Subscription Platform!"
          type="h2"
          className={`!text-primary`}
        />

        <span className="w-[100%] !mt-9">
          <TextUIComponent
            type="p"
            text="Seamlessly subscribe, explore premium travel perks, and enjoy hassle-free trip planning
with our exclusive membership benefits"
            className={` text-center`}
          />
        </span>

        <div
          className={`w-full h-10 bg-gray-300 flex justify-center items-center rounded-[5px] !mt-10`}
        >
          <TextUIComponent type="h6" text="What’s in for you?" />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16 lg:gap-[120px] !mt-20 !mb-20 w-full">
          {featuresData.map((feature) => (
            <div
              key={feature.id}
              className="w-[180px] border border-gray-300 h-[150px] bg-white flex flex-col items-center justify-center p-6"
            >
              <IconUIComponent
                icon={feature.icon}
                className="text-[80px] text-primary"
              />
              <TextUIComponent
                type="h6"
                text={feature.title}
                className="text-center font-medium mt-3"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
