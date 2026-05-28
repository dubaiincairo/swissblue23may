import DOMPurify from "isomorphic-dompurify";
import { Fragment, type ReactNode } from "react";

const BOLD_REGEX = /\*\*([^*]+)\*\*/g;

const SANITIZE_CONFIG = {
  ALLOWED_TAGS: ["strong", "b", "em", "i", "u", "s", "strike", "del", "br"],
  ALLOWED_ATTR: [],
};

const HTML_TAG_TEST = /<\/?[a-z][^>]*>/i;

function htmlToInline(html: string): string {
  return html
    .replace(/<p[^>]*>\s*<\/p>/gi, "<br>")
    .replace(/<\/p>\s*<p[^>]*>/gi, "<br>")
    .replace(/^\s*<p[^>]*>/i, "")
    .replace(/<\/p>\s*$/i, "")
    .trim();
}

export function rich(text: string | number | null | undefined): ReactNode {
  if (text === null || text === undefined) return null;
  const str = String(text);
  if (str === "") return "";

  if (HTML_TAG_TEST.test(str)) {
    const inline = htmlToInline(str);
    const clean = DOMPurify.sanitize(inline, SANITIZE_CONFIG);
    return <span dangerouslySetInnerHTML={{ __html: clean }} />;
  }

  if (!str.includes("\n") && !str.includes("**")) return str;

  const lines = str.split("\n");
  return lines.map((line, lineIdx) => (
    <Fragment key={lineIdx}>
      {lineIdx > 0 ? <br /> : null}
      {parseBold(line)}
    </Fragment>
  ));
}

function parseBold(text: string): ReactNode {
  if (!text.includes("**")) return text;

  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  BOLD_REGEX.lastIndex = 0;
  while ((match = BOLD_REGEX.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(<strong key={key++}>{match[1]}</strong>);
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length === 0 ? text : parts;
}

export function RichText({ text }: { text: string | number | null | undefined }) {
  return <>{rich(text)}</>;
}
