/**
 * Strips common Markdown and HTML syntax so a blog post can be shown as a
 * plain-text preview (the cards use line-clamp to cut it to length).
 */
export function toPlainText(markdown: string | null | undefined): string {
  if (!markdown) return '';
  return markdown
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')              // images
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')           // links -> their text
    .replace(/<[^>]+>/g, ' ')                          // HTML tags
    .replace(/^\s*([-*_])(\s*\1){2,}\s*$/gm, '')       // horizontal rules
    .replace(/^\s{0,3}(#{1,6}|>|[-*+]|\d+\.)\s+/gm, '') // headings, quotes, list markers
    .replace(/\*\*|__|~~|`+|\*/g, '')                  // bold, strikethrough, code, italics
    .replace(/(^|\s)_+|_+(?=\s|$)/g, '$1')             // _italics_ (keeps snake_case words)
    .replace(/\s+/g, ' ')
    .trim();
}
