import type { AccordionAttributes } from "../types.declarationts";
import { Accordion } from "rizzui/accordion";
import { TextUIComponent, TitleUIComponent } from "./texts.ui";
import { IconUIComponent } from "./icon.ui";

export function AccordionUI(props: AccordionAttributes) {
  const { data, onClick, userRole } = props;

  const handleDeleteItem = (params: { selectedItem: string }) => {
    if (!data || !onClick) return;

    const { selectedItem } = params;
    onClick({ faqId: selectedItem });
  };

  const handleEditTag = (params: { selectedItem: string }) => {
    if (!data || !onClick) return;

    const { selectedItem } = params;
    onClick({ faqId: selectedItem });
  };

  return (
    <>
      {data?.map((item, index) => (
        <div className="!mb-3  w-full relative ">
          <Accordion
            key={item.FAQ + index}
            className="last-of-type:border-b-0 !pb-1 "
          >
            <Accordion.Header>
              {({ open }) => (
                <div className="flex w-full cursor-pointer bg-dark-very-light-50 relative items-center justify-between !p-3 text-xl">
                  <span className="text-primary-dark">
                    {" "}
                    <TitleUIComponent
                      type="h6"
                      text={item?.FAQ}
                      className="flex "
                    />
                  </span>

                  <IconUIComponent
                    icon={` ${open ? "ri-subtract-line" : "ri-add-line"}`}
                    className="text-primary-dark"
                  />
                </div>
              )}
            </Accordion.Header>

            <Accordion.Body>
              <div className="w-full flex items-center bg-white !p-3">
                <span
                  onClick={() => handleDeleteItem({ selectedItem: item?.FAQ })}
                  className={` flex cursor-pointer border-b ${
                    userRole !== "super_user_mit" &&
                    userRole !== "admin_mit" &&
                    "hidden"
                  }`}
                >
                  <IconUIComponent
                    icon={`ri-delete-bin-7-fill`}
                    className="text-primary-dark text-base"
                  />
                </span>

                <span
                  className={`!ml-5 cursor-pointer ${
                    userRole !== "super_user_mit" &&
                    userRole !== "admin_mit" &&
                    "hidden"
                  }`}
                  onClick={() => handleEditTag({ selectedItem: item?._id })}
                >
                  <IconUIComponent
                    icon={`ri-edit-fill`}
                    className="text-primary-lighter text-xl"
                  />
                </span>
              </div>
              <TextUIComponent
                text={item?.answer}
                type="p"
                className="text-primary-headerTextColor py-1"
              />
            </Accordion.Body>
          </Accordion>
        </div>
      ))}
    </>
  );
}
