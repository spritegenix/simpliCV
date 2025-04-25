// RichTextEditor.tsx
import React, { useEffect } from "react";
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Quote,
  MessageSquareQuote,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Undo,
  Redo,
  SeparatorHorizontal,
  SeparatorVertical,
  Heading,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Highlighter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import {
  BubbleMenu,
  EditorContent,
  FloatingMenu,
  useEditor,
} from "@tiptap/react";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import ColorPicker from "@/app/(main)/editor/ColorPicker";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  isBubbleButtons?: boolean;
  isFloatingButtons?: boolean;
}

export function RichTextEditor({
  value,
  onChange,
  className,
  isBubbleButtons = false,
  isFloatingButtons = false,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Update editor content when value prop changes
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [editor, value]);

  if (!editor) {
    return null;
  }

  return (
    <div className={cn("overflow-hidden rounded-md border", className)}>
      <MenuButtons editor={editor} />
      {isBubbleButtons && <BubbleMenuButtons editor={editor} />}
      {isFloatingButtons && <FloatingMenuButtons editor={editor} />}
      <div className="min-h-32 max-w-none p-2">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function MenuButtons({ editor }: { editor: any }) {
  return (
    <div className="flex flex-wrap gap-1 border-b bg-muted/50 p-1">
      {/* Heading DropDown  */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Heading />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {[
            <Heading1 key={1} />,
            <Heading2 key={2} />,
            <Heading3 key={3} />,
            <Heading4 key={4} />,
            <Heading5 key={5} />,
            <Heading6 key={6} />,
          ].map((item, index) => (
            <DropdownMenuItem
              key={index}
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .toggleHeading({ level: index + 1 })
                  .run()
              }
            >
              {item}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* bold  */}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className={cn(
          "h-8 px-2 py-1",
          editor.isActive("bold") && "border bg-muted",
        )}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="size-4" />
      </Button>
      {/* Italic  */}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className={cn(
          "h-8 px-2 py-1",
          editor.isActive("italic") && "border bg-muted",
        )}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="size-4" />
      </Button>
      {/* Strike  */}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className={cn(
          "h-8 px-2 py-1",
          editor.isActive("italic") && "border bg-muted",
        )}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="size-4" />
      </Button>
      {/* Text Left  */}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className={cn(
          "h-8 px-2 py-1",
          editor.isActive("left") && "border bg-muted",
        )}
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
      >
        <AlignLeft className="size-4" />
      </Button>
      {/* Text Right  */}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className={cn(
          "h-8 px-2 py-1",
          editor.isActive("right") && "border bg-muted",
        )}
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
      >
        <AlignRight className="size-4" />
      </Button>
      {/* Text Center  */}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className={cn(
          "h-8 px-2 py-1",
          editor.isActive("center") && "border bg-muted",
        )}
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
      >
        <AlignCenter className="size-4" />
      </Button>
      {/* Text Justify  */}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className={cn(
          "h-8 px-2 py-1",
          editor.isActive("justify") && "border bg-muted",
        )}
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
      >
        <AlignJustify className="size-4" />
      </Button>
      {/* Text Highlight  */}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className={cn(
          "h-8 px-2 py-1",
          editor.isActive("highlight") && "border bg-muted",
        )}
        onClick={() => editor.chain().focus().toggleHighlight().run()}
      >
        <Highlighter className="size-4" />
      </Button>
      {/* Code  */}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className={cn(
          "h-8 px-2 py-1",
          editor.isActive("code") && "border bg-muted",
        )}
        onClick={() => editor.chain().focus().toggleCode().run()}
      >
        <Code className="size-4" />
      </Button>
      {/* Quote  */}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className={cn(
          "h-8 px-2 py-1",
          editor.isActive("blockquote") && "border bg-muted",
        )}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <Quote className="size-4" />
      </Button>
      {/* Blockquote */}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className={cn(
          "h-8 px-2 py-1",
          editor.isActive("blockquote") && "border bg-muted",
        )}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <MessageSquareQuote className="size-4" />
      </Button>
      {/* Horizontal rule  */}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className={cn(
          "h-8 px-2 py-1",
          editor.isActive("horizontalRule") && "border bg-muted",
        )}
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <SeparatorHorizontal className="size-4" />
      </Button>
      {/* Hard break  */}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className={cn(
          "h-8 px-2 py-1",
          editor.isActive("hardBreak") && "border bg-muted",
        )}
        onClick={() => editor.chain().focus().setHardBreak().run()}
      >
        <SeparatorVertical className="size-4" />
      </Button>
      {/* Undo  */}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className={cn(
          "h-8 px-2 py-1",
          editor.isActive("undo") && "border bg-muted",
        )}
        onClick={() => editor.chain().focus().undo().run()}
      >
        <Undo className="size-4" />
      </Button>
      {/* Redo */}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className={cn(
          "h-8 px-2 py-1",
          editor.isActive("redo") && "border bg-muted",
        )}
        onClick={() => editor.chain().focus().redo().run()}
      >
        <Redo className="size-4" />
      </Button>
      {/* Text Color  */}
      <ColorPicker
        color={editor.getAttributes("text")?.color}
        onChange={(color) => {
          editor.chain().focus().setColor(color.hex).run();
        }}
      />
      {/* Bullet List  */}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className={cn(
          "h-8 px-2 py-1",
          editor.isActive("bulletList") && "bg-muted",
        )}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="size-4" />
      </Button>
      {/* Order List  */}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className={cn(
          "h-8 px-2 py-1",
          editor.isActive("orderedList") && "border bg-muted",
        )}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="size-4" />
      </Button>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function BubbleMenuButtons({ editor }: { editor: any }) {
  return (
    <>
      {editor && (
        <BubbleMenu
          className="flex flex-wrap gap-1 rounded-md border bg-muted/50 p-1"
          tippyOptions={{ duration: 100 }}
          editor={editor}
        >
          {/* bold  */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className={cn(
              "h-8 px-2 py-1",
              editor.isActive("bold") && "border bg-muted",
            )}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <Bold className="size-4" />
          </Button>
          {/* Italic  */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className={cn(
              "h-8 px-2 py-1",
              editor.isActive("italic") && "border bg-muted",
            )}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <Italic className="size-4" />
          </Button>
          {/* strike  */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className={cn(
              "h-8 px-2 py-1",
              editor.isActive("italic") && "border bg-muted",
            )}
            onClick={() => editor.chain().focus().toggleStrike().run()}
          >
            <Strikethrough className="size-4" />
          </Button>
        </BubbleMenu>
      )}
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function FloatingMenuButtons({ editor }: { editor: any }) {
  return (
    <>
      {editor && (
        <FloatingMenu
          className="relative flex flex-wrap gap-1 rounded-md border bg-zinc-100 p-1"
          tippyOptions={{ duration: 100 }}
          editor={editor}
        >
          {/* Italic  */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className={cn(
              "h-8 px-2 py-1",
              editor.isActive("italic") && "border bg-muted",
            )}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <Italic className="size-4" />
          </Button>
          {/* Blockquote */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className={cn(
              "h-8 px-2 py-1",
              editor.isActive("blockquote") && "border bg-muted",
            )}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
          >
            <Quote className="size-4" />
          </Button>
        </FloatingMenu>
      )}
    </>
  );
}
