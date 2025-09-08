import { useEffect, useState } from "react";
import type { readMoreAttributes } from "../types.declarationts";
import { TiptapEditor } from "../../components/TextEditor/texteditor";
import { TextUIComponent, TitleUIComponent } from "./texts.ui";

export function ReadMoreComponent(props: readMoreAttributes) {
  const { text, className, limit, readMoreClassName, textDisplayer } = props;

  const [readMore, setReadMore] = useState<"readMore" | "readLess" | null>(
    null
  );

  useEffect(() => {
    setReadMore(
      text?.length < (Number(limit) ? Number(limit) : 100) ? null : "readMore"
    );
  }, [text]);

  const handleReadMoreFunc = () => {
    setReadMore(readMore === "readLess" ? "readMore" : "readLess");
  };

  return (
    <div className={`w-full flex flex-col`}>
      {textDisplayer === "richText" ? (
        <div>
          <TiptapEditor
            editable={false}
            className=""
            textValue={`${
              readMore === "readLess"
                ? text
                : `${text?.slice(0, limit ? Number(limit) : 100)}`
            }`}
            editorToolType="no_heading"
          />
        </div>
      ) : (
        <TextUIComponent
          type="p"
          text={
            readMore === null || readMore === "readLess"
              ? text
              : text?.slice(0, limit ? Number(limit) : 100)
          }
          className={className}
        />
      )}

      <TitleUIComponent
        type="h6"
        text={readMore === "readMore" ? "Read More" : "Read less"}
        onClick={handleReadMoreFunc}
        className={`cursor-pointer !text-primary !mt-1 ${readMoreClassName} ${
          (text?.length < Number(limit) || !text) && "hidden"
        }`}
      />
    </div>
  );
}
