/*
 * 表示ロジック。books-data.js の内容を読み取ってページを組み立てます。
 * 通常はこのファイルを編集する必要はありません。
 */
(function () {
  "use strict";

  function escapeHtml(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  // Amazonアソシエイトタグをリンクに付与する（既にクエリがある場合も壊さない）
  function withAssociateTag(url, tag) {
    if (!tag) return url;
    try {
      const u = new URL(url, window.location.href);
      u.searchParams.set("tag", tag);
      return u.toString();
    } catch (e) {
      // URLとして不正な値が入っていた場合はそのまま返す（ページを壊さない）
      return url;
    }
  }

  function renderBookCard(book, associateTag) {
    const href = withAssociateTag(book.amazonUrl || "#", associateTag);
    const badgeHtml = book.badge
      ? `<span class="badge">${escapeHtml(book.badge)}</span>`
      : "";

    // 画像読み込み失敗時、タイトルを表示するフォールバックに切り替える（壊れた画像アイコンを出さない）
    const fallbackId = `fallback-${escapeHtml(book.id)}`;

    return `
      <article class="book-card">
        <div class="book-cover-wrap">
          <img
            src="${escapeHtml(book.coverImage)}"
            alt="${escapeHtml(book.title)} の表紙"
            loading="lazy"
            onerror="this.style.display='none'; document.getElementById('${fallbackId}').style.display='flex';"
          >
          <div class="book-cover-fallback" id="${fallbackId}" style="display:none;">
            ${escapeHtml(book.title)}
          </div>
          ${badgeHtml}
        </div>
        <div class="book-body">
          <h3 class="book-title">${escapeHtml(book.title)}</h3>
          <p class="book-desc">${escapeHtml(book.description)}</p>
          <a class="book-btn" href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">
            Amazonで見る
          </a>
        </div>
      </article>
    `;
  }

  function renderCategorySection(categoryDef, booksInCategory, associateTag) {
    const heading = `<h2>${escapeHtml(categoryDef.label)}</h2>`;
    if (!booksInCategory.length) {
      return `
        <section class="category-section">
          ${heading}
          <div class="empty-state">${escapeHtml(categoryDef.emptyText || "現在準備中です。")}</div>
        </section>
      `;
    }
    const cards = booksInCategory
      .map((b) => renderBookCard(b, associateTag))
      .join("");
    return `
      <section class="category-section">
        ${heading}
        <div class="book-grid">${cards}</div>
      </section>
    `;
  }

  function init() {
    const config = typeof SITE_CONFIG !== "undefined" ? SITE_CONFIG : {};
    const allBooks = typeof books !== "undefined" ? books : [];

    document.title = config.siteTitle || "著書一覧";
    const siteTitleEl = document.getElementById("site-title");
    const authorNameEl = document.getElementById("author-name");
    const introTextEl = document.getElementById("intro-text");
    const footerYearEl = document.getElementById("footer-year");
    const footerAuthorEl = document.querySelector(".footer-author");
    const sectionsEl = document.getElementById("book-sections");

    if (siteTitleEl) siteTitleEl.textContent = config.siteTitle || "著書一覧";
    if (authorNameEl) authorNameEl.textContent = config.authorName || "";
    if (introTextEl) introTextEl.textContent = config.introText || "";
    if (footerYearEl) footerYearEl.textContent = new Date().getFullYear();
    if (footerAuthorEl) footerAuthorEl.textContent = config.authorName || "";

    const categories = Array.isArray(config.categories) && config.categories.length
      ? config.categories
      : [
          { key: "ebook", label: "電子書籍（Kindle）", emptyText: "現在準備中です。" },
          { key: "paperback", label: "ペーパーバック", emptyText: "現在準備中です。" }
        ];

    const associateTag = config.amazonAssociateTag || "";

    const html = categories
      .map((cat) => {
        const inCategory = allBooks.filter((b) => b.category === cat.key);
        return renderCategorySection(cat, inCategory, associateTag);
      })
      .join("");

    if (sectionsEl) sectionsEl.innerHTML = html;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
