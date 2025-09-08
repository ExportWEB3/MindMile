import type { customTiptalEditor } from "../../utilities/types.declarationts";
import StarterKit from "@tiptap/starter-kit";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import {
  BoldTextPlugin,
  ItalicTextPlugin,
  TextLinkPlugin,
  UnderlineTextPlugin,
} from "./plugin/toolbar.plugin";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { useEffect } from "react";
import Headerplugin from "./plugin/heading.plugin";

export const TiptapEditor = (props: customTiptalEditor) => {
  const {
    textValue,
    setTextValue,
    tools,
    editorToolType = "full",
    editable,
    className,
    headClassName,
    editorDivClassName,
  } = props;

  const handleSetTextValue = setTextValue as React.Dispatch<
    React.SetStateAction<string>
  >;

  const editor = useEditor(
    {
      extensions: [
        StarterKit.configure({
          heading: { levels: [1, 2, 3, 4] },
        }),
        Underline,
        Link.configure({
          openOnClick: false,
          HTMLAttributes: { class: "customLink" },
        }),
      ],
      immediatelyRender: false,
      editorProps: {
        attributes: {
          class:
            "prose prose-sm max-w-none focus:outline-none text-gray-800 dark:text-gray-100 ",
        },
      },
      content: textValue,
      onUpdate: ({ editor }) => {
        if (editable) handleSetTextValue(editor.getHTML());
      },
      editable,
    },
    []
  );

  useEffect(() => {
    if (editor && textValue !== editor.getHTML()) {
      editor.commands.setContent(textValue || "", { emitUpdate: false });
    }
  }, [textValue, editor]);

  useEffect(() => {
    if (editor) editor.setEditable(editable);
  }, [editable, editor]);

  return (
    <div
      className={`w-full flex flex-col rounded-xl border ${
        editable
          ? "border-gray-200 dark:border-gray-700 shadow-sm"
          : "border-none "
      } ${className}`}
    >
      {editable && (
        <div
          className={`flex flex-wrap gap-2 items-center !px-3 !py-2 
      bg-gray-50 dark:bg-gray-800 
      border-b border-gray-200 dark:border-gray-700 
      rounded-t-xl shadow-sm ${headClassName}`}
        >
          {(editorToolType === "full" ||
            (editorToolType === "custom" && tools?.includes("heading"))) && (
            <div className="!px-2 !py-1 rounded-md bg-white dark:bg-gray-700 shadow hover:bg-gray-100 dark:hover:bg-gray-600 transition">
              <Headerplugin editor={editor as Editor} />
            </div>
          )}

          {(editorToolType === "full" ||
            (editorToolType === "custom" && tools?.includes("bold"))) && (
            <div className="!px-2 !py-1 rounded-md bg-white dark:bg-gray-700 shadow hover:bg-gray-100 dark:hover:bg-gray-600 transition">
              <BoldTextPlugin editor={editor as Editor} />
            </div>
          )}

          {(editorToolType === "full" ||
            (editorToolType === "custom" && tools?.includes("italic"))) && (
            <div className="!px-2 !py-1 rounded-md bg-white dark:bg-gray-700 shadow hover:bg-gray-100 dark:hover:bg-gray-600 transition">
              <ItalicTextPlugin editor={editor as Editor} />
            </div>
          )}

          {(editorToolType === "full" ||
            (editorToolType === "custom" && tools?.includes("underline"))) && (
            <div className="!px-2 !py-1 rounded-md bg-white dark:bg-gray-700 shadow hover:bg-gray-100 dark:hover:bg-gray-600 transition">
              <UnderlineTextPlugin editor={editor as Editor} />
            </div>
          )}

          {(editorToolType === "full" ||
            (editorToolType === "custom" && tools?.includes("link"))) && (
            <div className="!px-2 !py-1 rounded-md bg-white dark:bg-gray-700 shadow hover:bg-gray-100 dark:hover:bg-gray-600 transition">
              <TextLinkPlugin editor={editor as Editor} />
            </div>
          )}
        </div>
      )}

      {/* Editor Content */}
      <div
        className={`
      overflow-y-auto relative h-auto
     ${
       editable &&
       "min-h-[150px] !px-3 !py-2 max-h-[300px] bg-yellow-400 border border-dark-light-38 shadow-md"
     } ${editorDivClassName}`}
      >
        <EditorContent editor={editor} />
        {editable && !textValue && (
          <p className="text-gray-400 absolute top-2 left-3 pointer-events-none select-none">
            Start typing...
          </p>
        )}
      </div>
    </div>
  );
};
