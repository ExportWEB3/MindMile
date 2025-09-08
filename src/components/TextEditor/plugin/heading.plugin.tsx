import { useState } from "react";
import { customToggle } from "../../../hooks/custom.hook";
import { headingTagData } from "../../../utilities/data";
import type { headerStringValues } from "../../../utilities/types.declarationts";
import { TextUIComponent } from "../../../utilities/UI/texts.ui";
import { Editor } from "@tiptap/react";

const Headerplugin = (props: { editor: Editor }) => {
  const { editor } = props;

  const { toggle, handleToggle } = customToggle();

  const [headingState, setHeadingState] =
    useState<headerStringValues>("Normal");

  if (!editor) {
    return null;
  }

  const handleHeadingEvents = (eventType: headerStringValues) => {
    if (eventType === "H1") {
      editor.chain().focus().toggleHeading({ level: 1 }).run();
      setHeadingState(eventType);
    }
  };

  return (
    <>
      <div className={` w-36  cursor-pointer  relative flex flex-col`}>
        <div
          onClick={() => handleToggle(!toggle)}
          className="w-full flex items-center justify-between !px-3 h-full"
        >
          <TextUIComponent text={headingState} type="p" className="" />
        </div>

        {toggle && (
          <div
            className={`cursor-pointer w-full h-auto absolute top-9 bg-white z-[3] shadow-md rounded-lg !py-1`}
          >
            {headingTagData?.map((item, index) => {
              if (item === "H1") {
                return (
                  <p
                    key={index}
                    className={` !px-3  cursor-pointer !mt-2 ${
                      editor.isActive("heading", { level: 1 })
                        ? "is-active"
                        : ""
                    }`}
                    onClick={() => handleHeadingEvents(item)}
                  >
                    H1 Heading 1
                  </p>
                );
              }

              if (item === "H2") {
                return (
                  <p
                    key={index}
                    className={` !px-3 cursor-pointer !mt-2 ${
                      editor.isActive("heading", { level: 2 })
                        ? "is-active"
                        : ""
                    }`}
                    onClick={() => {
                      editor.chain().focus().toggleHeading({ level: 2 }).run();
                      setHeadingState(item);
                    }}
                  >
                    H2 Heading 2
                  </p>
                );
              }

              if (item === "H3") {
                return (
                  <p
                    key={index}
                    className={` !px-3  cursor-pointer !mt-2 ${
                      editor.isActive("heading", { level: 3 })
                        ? "is-active"
                        : ""
                    }`}
                    onClick={() => {
                      editor.chain().focus().toggleHeading({ level: 3 }).run();
                      setHeadingState(item);
                    }}
                  >
                    H3 Heading 3
                  </p>
                );
              }

              if (item === "Normal") {
                return (
                  <p
                    key={index}
                    className={` !px-3 cursor-pointer !mt-2  ${
                      editor.isActive("heading", { level: 4 })
                        ? "is-active"
                        : ""
                    }`}
                    onClick={() => {
                      editor.chain().focus().toggleHeading({ level: 4 }).run();
                      setHeadingState(item);
                    }}
                  >
                    Normal
                  </p>
                );
              }
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Headerplugin;
