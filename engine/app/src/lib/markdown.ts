import { marked } from "marked";

marked.use({
  gfm: true,
  breaks: false,
});

/**
 * Wrap tables in .table-wrap so they can scroll on narrow screens.
 */
export function renderMarkdown(source: string): string {
  const html = marked.parse(source);
  return String(html)
    .replace(/<table>/g, '<div class="table-wrap"><table>')
    .replace(/<\/table>/g, "</table></div>");
}
