export type TocItem = {
  depth: number;
  text: string;
  slug: string;
  children: TocItem[];
};


export function renderTocItem(item: TocItem, parentIndex: number): string {
  // 使用 encodeURIComponent 确保特殊字符在 URL 中正确编码
  const safeSlug = encodeURIComponent(item.slug);
  // 使用 DOMPurify 或类似的方法转义文本内容，防止 XSS
  const safeText = item.text.replace(/[<>"&]/g, (char) => {
    const entities: { [key: string]: string } = {
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "&": "&amp;",
    };
    return entities[char];
  });

  return `
      <li>
        <div class="toc-item">
          ${
            item.children.length > 0
              ? `<button
                class="toggle-btn"
                data-index="${parentIndex}"
                aria-label="Toggle section"
                type="button">
                <span class="icon-expand" aria-hidden="true">+</span>
                <span class="icon-collapse hidden" aria-hidden="true">−</span>
              </button>`
              : `<span class="toggle-placeholder"></span>`
          }
          <a
            href="#${safeSlug}"
            class="toc-link"
            data-text="${safeText.toLowerCase()}"
            data-depth="${item.depth}"
          >
            ${safeText}
          </a>
        </div>
        ${
          item.children.length > 0
            ? `<ul class="nested" data-index="${parentIndex}">
              ${item.children.map((child) => renderTocItem(child, parentIndex)).join("")}
            </ul>`
            : ""
        }
      </li>
    `;
}
