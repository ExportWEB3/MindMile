import { Editor } from "@tiptap/react";
import { IconUIComponent } from "../../../utilities/UI/icon.ui";
import { useCallback } from "react";

export function BoldTextPlugin(props: { editor: Editor }) {
  const { editor } = props;

  if (!editor) {
    return null;
  }

  return (
    <span onClick={() => editor.chain().focus().toggleBold().run()}>
      <IconUIComponent
        icon="ri-bold"
        className={`${
          editor.isActive("bold") ? "is-active" : ""
        } text-primary-grayWhite font-semibold cursor-pointer !text-xl`}
      />
    </span>
  );
}

export function ItalicTextPlugin(props: { editor: Editor }) {
  const { editor } = props;

  if (!editor) {
    return null;
  }

  return (
    <>
      <span
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`${
          editor.isActive("italic") ? "is-active" : ""
        } text-primary-grayWhite font-semibold cursor-pointer`}
      >
        <IconUIComponent icon="ri-italic" className="!text-xl" />
      </span>
    </>
  );
}

export function UnderlineTextPlugin(props: { editor: Editor }) {
  const { editor } = props;

  if (!editor) {
    return null;
  }

  return (
    <span
      onClick={() => editor.chain().focus().toggleUnderline().run()}
      className={`${
        editor.isActive("underline") ? "is-active" : ""
      } text-primary-grayWhite font-semibold cursor-pointer `}
    >
      <IconUIComponent icon="ri-underline" className="!text-xl" />
    </span>
  );
}

export function TextLinkPlugin(props: { editor: Editor }) {
  const { editor } = props;

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url.startsWith("http") ? url : `http://${url}` })
      .run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <>
      <div className="flex !px-2 !py-1">
        <div className={`!px-2`}>
          <span
            onClick={setLink}
            className={`${
              editor.isActive("link") ? "is-active" : ""
            }text-primary-grayWhite font-semibold cursor-pointer`}
          >
            <IconUIComponent icon="ri-link" className="!text-xl" />
          </span>
        </div>

        <div className={` !px-2`}>
          <span
            onClick={() => editor.chain().focus().unsetLink().run()}
            className={`${!editor.isActive(
              "link"
            )} text-primary-grayWhite font-semibold cursor-pointer`}
          >
            <IconUIComponent icon="ri-link-unlink" className="!text-xl" />
          </span>
        </div>
      </div>
    </>
  );
}
