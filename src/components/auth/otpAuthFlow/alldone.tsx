import OptimizedImage from "../../../utilities/UI/image.ui";
import { LayoutComponent } from "../../layouts/layout.general";
import logoImg from "../../../assets/signImg.png";
import polygonImg from "../../../assets/Polygon1.png";
import checkmarkImg from "../../../assets/checkmarkPolygon.png";
import { TextUIComponent } from "../../../utilities/UI/texts.ui";
import { ButtonUIComponent } from "../../../utilities/UI/button.ui";
import { useCustomQuery } from "../../../hooks/custom.hook";

export function AllDoneComponent() {
    const { generateQuery } = useCustomQuery();


  const handleToLogin = async () => {
    generateQuery({ path: `/auth/login`, query: {} });
  }


  return (
    <LayoutComponent>
      <section className="w-full h-full flex justify-center">
        <div className="w-full flex flex-col items-cente">
          <span className="w-full h-14 relative flex justify-center">
            <OptimizedImage 
              imageData={polygonImg}
              alt="MIT+ polygon"
              className="w-10"
            />
            <OptimizedImage 
              imageData={checkmarkImg}
              alt="MIT+ checkmark polygon"
              className="w-4 absolute -left-[30px] top-1.5"
            />
          </span>

          <TextUIComponent
            type="h2"
            text="All done!"
            className="!text-primary"
          />

          <TextUIComponent
            type="p"
            text="Your password has been reset."
            className="!text-primary-very-dark !mt-5"
          />

          <span className="w-full">
            <ButtonUIComponent
              type="button"
              text="Back to Login"
              onClick={handleToLogin}
              className="w-full rounded-2xl !mt-10"
            />
          </span>
        </div>
      </section>
    </LayoutComponent>
  );
}
