"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import { Button } from "@/components/ui/button";
import {
  FaBold,
  FaItalic,
  FaStrikethrough,
  FaHeading,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
} from "react-icons/fa";
import { JSX, useEffect } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const TiptapEditor = ({ value, onChange }: Props) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Highlight,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none',
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) return null;

  const button = (
    icon: JSX.Element,
    onClick: () => void,
    isActive = false
  ) => (
    <Button
      type="button"
      onClick={onClick}
      size="sm"
      variant={isActive ? "default" : "outline"}
    >
      {icon}
    </Button>
  );

  return (
    <div className="space-y-2">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2">
        {button(
          <div className="flex items-center"><FaHeading size={16} /><span className="ml-1">1</span></div>,
          () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
          editor.isActive("heading", { level: 1 })
        )}
        {button(
          <div className="flex items-center"><FaHeading size={15} /><span className="ml-1">2</span></div>,
          () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
          editor.isActive("heading", { level: 2 })
        )}
        {button(
          <div className="flex items-center"><FaHeading size={14} /><span className="ml-1">3</span></div>,
          () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
          editor.isActive("heading", { level: 3 })
        )}
        {button(
          <FaAlignLeft size={16} />,
          () => editor.chain().focus().setTextAlign("left").run(),
          editor.isActive({ textAlign: "left" })
        )}
        {button(
          <FaAlignCenter size={16} />,
          () => editor.chain().focus().setTextAlign("center").run(),
          editor.isActive({ textAlign: "center" })
        )}
        {button(
          <FaAlignRight size={16} />,
          () => editor.chain().focus().setTextAlign("right").run(),
          editor.isActive({ textAlign: "right" })
        )}
        {button(
          <FaAlignJustify size={16} />,
          () => editor.chain().focus().setTextAlign("justify").run(),
          editor.isActive({ textAlign: "justify" })
        )}
        {button(
          <FaBold size={16} />,
          () => editor.chain().focus().toggleBold().run(),
          editor.isActive("bold")
        )}
        {button(
          <FaItalic size={16} />,
          () => editor.chain().focus().toggleItalic().run(),
          editor.isActive("italic")
        )}
        {button(
          <FaStrikethrough size={16} />,
          () => editor.chain().focus().toggleStrike().run(),
          editor.isActive("strike")
        )}
        {button(
          <span className="px-1 py-0.5 bg-yellow-200 text-xs rounded">Highlight</span>,
          () => editor.chain().focus().toggleHighlight().run(),
          editor.isActive("highlight")
        )}
      </div>

      {/* Editor area with styling for headings */}
      <div className="border rounded-md bg-white p-3 min-h-[200px]">
        <style jsx global>{`
          .ProseMirror h1 {
            font-size: 1.75rem;
            font-weight: bold;
            margin-top: 0.5rem;
            margin-bottom: 0.5rem;
          }
          .ProseMirror h2 {
            font-size: 1.5rem;
            font-weight: bold;
            margin-top: 0.5rem;
            margin-bottom: 0.5rem;
          }
          .ProseMirror h3 {
            font-size: 1.25rem;
            font-weight: bold;
            margin-top: 0.5rem;
            margin-bottom: 0.5rem;
          }
          .ProseMirror p {
            margin-top: 0.5rem;
            margin-bottom: 0.5rem;
          }
          .ProseMirror {
            min-height: 180px;
            outline: none;
          }
        `}</style>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TiptapEditor;