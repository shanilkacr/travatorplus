/**
 * Heading → anchor id. Shared by the MDX renderer and the table of contents so
 * both sides derive the same id from the same text; if they drift, ToC links
 * silently stop scrolling.
 */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[’'"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Pull plain text out of MDX heading children (string, array, or element). */
export function headingText(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(headingText).join("");
  if (
    node &&
    typeof node === "object" &&
    "props" in node &&
    (node as { props?: { children?: React.ReactNode } }).props
  ) {
    return headingText(
      (node as { props: { children?: React.ReactNode } }).props.children
    );
  }
  return "";
}
