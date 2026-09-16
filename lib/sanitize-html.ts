import DOMPurify from "isomorphic-dompurify";

const ALLOWED_TAGS = [
  "p",
  "h2",
  "h3",
  "h4",
  "strong",
  "em",
  "ul",
  "ol",
  "li",
  "a",
  "img",
  "blockquote",
  "br",
  "code",
  "pre",
];

const ALLOWED_ATTR = ["href", "target", "rel", "src", "alt", "width", "height"];

export function sanitizeBlogHtml(html: string): string {
  return DOMPurify.sanitize(html, { ALLOWED_TAGS, ALLOWED_ATTR });
}
