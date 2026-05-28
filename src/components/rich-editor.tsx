"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

const EMPTY_HTML_VARIANTS = new Set(["", "<p></p>", "<p><br></p>"]);

function markdownLineToHtml(line: string) {
  const bolded = line.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  return bolded === "" ? "<p></p>" : `<p>${bolded}</p>`;
}

export function ensureHtml(text: string): string {
  if (!text) return "";
  if (/<\/?[a-z][^>]*>/i.test(text)) return text;
  return text.split("\n").map(markdownLineToHtml).join("");
}

export function RichEditor({
  value,
  onChange,
  dir,
  ariaLabel,
  language,
}: {
  value: string;
  onChange: (html: string) => void;
  dir?: "ltr" | "rtl";
  ariaLabel?: string;
  language: "ar" | "en";
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        bulletList: false,
        orderedList: false,
        listItem: false,
        blockquote: false,
        codeBlock: false,
        code: false,
        horizontalRule: false,
        link: false,
        listKeymap: false,
      }),
    ],
    content: ensureHtml(value),
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(EMPTY_HTML_VARIANTS.has(html) ? "" : html);
    },
    editorProps: {
      attributes: {
        class: "admin-rich-editor-area",
        "aria-label": ariaLabel ?? "",
        dir: dir ?? "ltr",
      },
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    const next = ensureHtml(value);
    if (next === current) return;
    if (EMPTY_HTML_VARIANTS.has(current) && value === "") return;
    editor.commands.setContent(next, { emitUpdate: false });
  }, [value, editor]);

  if (!editor) {
    return (
      <div className="admin-rich-editor">
        <div className="admin-rich-editor-toolbar" aria-hidden="true" />
        <div className="admin-rich-editor-area admin-rich-editor-loading">…</div>
      </div>
    );
  }

  const t = (ar: string, en: string) => (language === "ar" ? ar : en);

  return (
    <div className="admin-rich-editor">
      <div className="admin-rich-editor-toolbar" role="toolbar">
        <button
          type="button"
          className={editor.isActive("bold") ? "active" : ""}
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => editor.chain().focus().toggleBold().run()}
          title={t("غامق (Ctrl/Cmd+B)", "Bold (Ctrl/Cmd+B)")}
          aria-label={t("غامق", "Bold")}
          aria-pressed={editor.isActive("bold")}
        >
          <span style={{ fontWeight: 800 }}>B</span>
        </button>
        <button
          type="button"
          className={editor.isActive("italic") ? "active" : ""}
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          title={t("مائل (Ctrl/Cmd+I)", "Italic (Ctrl/Cmd+I)")}
          aria-label={t("مائل", "Italic")}
          aria-pressed={editor.isActive("italic")}
        >
          <span style={{ fontStyle: "italic", fontWeight: 600 }}>I</span>
        </button>
        <button
          type="button"
          className={editor.isActive("underline") ? "active" : ""}
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          title={t("تسطير (Ctrl/Cmd+U)", "Underline (Ctrl/Cmd+U)")}
          aria-label={t("تسطير", "Underline")}
          aria-pressed={editor.isActive("underline")}
        >
          <span style={{ textDecoration: "underline", fontWeight: 600 }}>U</span>
        </button>
        <button
          type="button"
          className={editor.isActive("strike") ? "active" : ""}
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          title={t("يتوسطه خط", "Strikethrough")}
          aria-label={t("يتوسطه خط", "Strikethrough")}
          aria-pressed={editor.isActive("strike")}
        >
          <span style={{ textDecoration: "line-through", fontWeight: 600 }}>S</span>
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
