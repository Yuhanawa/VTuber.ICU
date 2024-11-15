// TODO: refactor
// !!! IMPORTANT !!! WARNING !!!
// Very bad code, needs to be refactored
// This code is generated by AI and can work normally(?) after human modification
// Poor quality and difficult to understand
// Don't modify if you are not absolutely sure
// !!! IMPORTANT !!! WARNING !!!

interface TocItem {
  slug: string;
  text: string;
  depth: number;
  children: TocItem[];
}

interface SafeContentOptions {
  stripHTML?: boolean;
  lowercase?: boolean;
}

class TocRenderer {
  private static readonly ENTITIES: Readonly<Record<string, string>> = {
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "&": "&amp;",
    "'": "&#39;",
    "/": "&#x2F;",
    "`": "&#x60;",
    "=": "&#x3D;",
  };

  private static makeSafeContent(content: string, options: SafeContentOptions = {}): string {
    let result = content.replace(/[&<>"'`=\/]/g, (char) => this.ENTITIES[char] || char);

    if (options.stripHTML) {
      result = result.replace(/<[^>]*>/g, "");
    }

    if (options.lowercase) {
      result = result.toLowerCase();
    }

    return result;
  }

  private static generateId(prefix: string, index: number): string {
    return `${prefix}-${index}`;
  }

  public static renderTocItem(item: TocItem, parentIndex: number): string {
    const safeSlug = encodeURIComponent(item.slug);
    const safeText = this.makeSafeContent(item.text);
    const dataText = this.makeSafeContent(item.text, { lowercase: true });
    const buttonId = this.generateId("toc-btn", parentIndex);
    const sectionId = this.generateId("toc-section", parentIndex);

    const hasChildren = item.children.length > 0;

    return `
      <li class="toc-item-container">
        <div class="toc-item" role="presentation">
          ${
            hasChildren && false
              ? `<button
                id="${buttonId}"
                class="toggle-btn"
                aria-expanded="false"
                aria-controls="${sectionId}"
                type="button">
                <span class="icon-expand">+</span>
                <span class="icon-collapse">−</span>
                <span class="sr-only">Toggle section</span>
              </button>`
              : `<span class="toggle-placeholder"></span>`
          }
          <a
            href="#${safeSlug}"
            class="toc-link depth-${item.depth}"
            data-text="${dataText}"
            data-depth="${item.depth}"
            role="treeitem"
          >
            ${safeText}
          </a>
        </div>
        ${
          hasChildren
            ? `<ul 
              id="${sectionId}"
              class="nested"
              role="group" 
              aria-labelledby="${buttonId}"
            >
              ${item.children
                .map((child, index) => this.renderTocItem(child, parentIndex + index + 1))
                .join("")}
            </ul>`
            : ""
        }
      </li>
    `.trim();
  }

  public static renderToc(items: TocItem[]): string {
    return `
      <nav aria-label="Table of contents" class="toc-navigation">
        <ul role="tree">
          ${items.map((item, index) => this.renderTocItem(item, index)).join("")}
        </ul>
      </nav>
    `.trim();
  }
}

export { TocRenderer, type TocItem };
