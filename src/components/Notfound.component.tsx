import { ButtonUIComponent } from "../utilities/UI/button.ui";
import { TextUIComponent, TitleUIComponent } from "../utilities/UI/texts.ui";
import { LayoutComponent } from "./layouts/layout.general";
import { useNavigate } from "react-router-dom";

export function NotFoundComponent() {
  const navigate = useNavigate();
  return (
    <LayoutComponent>
      <section className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="max-w-md">
          <TitleUIComponent type="h2" text="404" className="!text-primary" />

          <TitleUIComponent
            type="h4"
            text="Page Not Found"
            className="!text-secondary-dark !mt-5"
          />

          <TextUIComponent
            type="p"
            className="!mt-5"
            text="The page you’re looking for doesn’t exist or has been moved."
          />

          <span className="w-full flex justify-center !mt-6">
            <ButtonUIComponent
              onClick={() => navigate("/")}
              text="Go Back Home"
            />
          </span>
        </div>
      </section>
    </LayoutComponent>
  );
}
