import React from "react";
import { onboardingSteps } from "../../utilities/data";
import type { StepItem } from "../../utilities/types.declarationts";
import { useCustomQuery } from "../../hooks/custom.hook";
import { IconUIComponent } from "../../utilities/UI/icon.ui";

export function Steps() {
  const { getQueryValue } = useCustomQuery();
  const currentStepId = (getQueryValue("screenname") as string) || "welcome";

  const currentIndex = onboardingSteps.findIndex(
    (step) => step.id === currentStepId
  );

 return (
  <div className="flex justify-center items-center h-20 w-full px-4 customContainerModified">
    <div className="flex w-full justify-center items-center gap-2">
      {onboardingSteps.map((step: StepItem, index: number) => {
        const isCompleted = index < currentIndex;
        const isActive = index === currentIndex;

        return (
          <React.Fragment key={step.id}>
            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <div
                className={`flex items-center justify-center rounded-full border-2 transition-all duration-300
                  w-7 h-7 text-sm
                  sm:w-8 sm:h-8 sm:text-base
                  ${
                    isCompleted
                      ? "bg-primary border-primary text-white"
                      : isActive
                      ? "bg-primary text-white"
                      : "border-gray-300 text-gray-400"
                  }`}
              >
                {isCompleted ? (
                  <IconUIComponent
                    icon="ri-check-line"
                    className="text-white text-lg"
                  />
                ) : (
                  index + 1
                )}
              </div>
              <span
                className={`text-[10px] sm:text-xs !mt-3 ${
                  isActive ? "text-primary font-medium" : "text-gray-500"
                }`}
              >
                {step.label}
              </span>
            </div>

{/* Connecting Line */}
{index < onboardingSteps.length - 1 && (
  <div
    className={`h-[2px] transition-all duration-300
      w-[250px] lg:w-[250px] md:w-[200px] sm:w-[150px]
      max-[510px]:w-[120px]
      max-[400px]:w-[100px]
      max-[350px]:w-[80px]
      ${index < currentIndex ? "bg-primary" : "bg-gray-300"}`}
  ></div>
)}
          </React.Fragment>
        );
      })}
    </div>
  </div>
);

}
