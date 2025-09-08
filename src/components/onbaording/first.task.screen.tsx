import { TextUIComponent, TitleUIComponent } from "../../utilities/UI/texts.ui";
import defaultLogo from "../../assets/signImg.png";
import OptimizedImage from "../../utilities/UI/image.ui";
import { LayoutComponent } from "../layouts/layout.general";

export function ThankYouScreenComponent() {
  return (
    <LayoutComponent>
      <section className="w-full flex flex-col">
        <div className="w-full flex flex-col items-center">
          <TitleUIComponent
            className="!text-primary !text-center"
            text="Thank you for your interest in our Subscription platform, we will email you regarding the status of your payment"
            type="h5"
          />
          <TitleUIComponent
            type="h6"
            text="Enjoy exclusive benefits"
            className="!text-primary !mt-3"
          />
          <TextUIComponent
            type="p"
            text="Welcome to MIT Travels! Your journey starts now!"
            className="!text-primary !mt-10 text-center"
          />
          <OptimizedImage
            imageData={defaultLogo}
            alt="MIT+ Logo"
            style={{ objectFit: "contain" }}
            className="w-[30%] !mb-20"
          />
        </div>
      </section>
    </LayoutComponent>
  );
}
