/*
 * js/books-data.js の内容に問題がないかチェックする補助スクリプト（任意・実行しなくてもサイトは動作します）。
 *
 * 使い方:
 *   node scripts/validate-books.js
 *
 * このスクリプトは GitHub Actions (.github/workflows/deploy.yml) からも
 * デプロイ前チェックとして自動実行されます。
 */
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const DATA_FILE = path.join(__dirname, "..", "js", "books-data.js");
const IMAGES_DIR = path.join(__dirname, "..", "images");

const REQUIRED_FIELDS = ["id", "title", "author", "description", "coverImage", "amazonUrl", "category"];
const VALID_CATEGORIES = ["ebook", "paperback"];

function loadBooksData() {
  const code = fs.readFileSync(DATA_FILE, "utf8");
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(code + "\n;this.__SITE_CONFIG = SITE_CONFIG; this.__books = books;", sandbox, {
    filename: "books-data.js"
  });
  return { books: sandbox.__books, config: sandbox.__SITE_CONFIG };
}

function main() {
  const errors = [];
  const warnings = [];

  let books, config;
  try {
    const loaded = loadBooksData();
    books = loaded.books;
    config = loaded.config;
  } catch (e) {
    console.error("✗ js/books-data.js の読み込みに失敗しました（構文エラーの可能性があります）:");
    console.error("  " + e.message);
    process.exit(1);
  }

  if (!Array.isArray(books)) {
    errors.push("books は配列である必要があります。");
  } else {
    const seenIds = new Set();

    books.forEach((book, index) => {
      const label = `books[${index}]${book && book.id ? ` (id: ${book.id})` : ""}`;

      REQUIRED_FIELDS.forEach((field) => {
        if (!book || book[field] === undefined || book[field] === null || book[field] === "") {
          errors.push(`${label}: 必須項目 "${field}" が未設定です。`);
        }
      });

      if (book && book.id) {
        if (seenIds.has(book.id)) {
          errors.push(`${label}: id "${book.id}" が他の本と重複しています。`);
        }
        seenIds.add(book.id);
      }

      if (book && book.category && !VALID_CATEGORIES.includes(book.category)) {
        errors.push(`${label}: category は ${VALID_CATEGORIES.join(" / ")} のいずれかにしてください（現在: "${book.category}"）。`);
      }

      if (book && book.amazonUrl && !/^https?:\/\//.test(book.amazonUrl)) {
        errors.push(`${label}: amazonUrl は http(s):// から始まるURLにしてください。`);
      }

      if (book && book.coverImage && !/^https?:\/\//.test(book.coverImage)) {
        const imgPath = path.join(__dirname, "..", book.coverImage);
        if (!fs.existsSync(imgPath)) {
          warnings.push(`${label}: 画像ファイルが見つかりません -> ${book.coverImage}`);
        }
      }
    });
  }

  if (!config) {
    warnings.push("SITE_CONFIG が定義されていません。");
  }

  if (warnings.length) {
    console.warn("--- 警告 ---");
    warnings.forEach((w) => console.warn("⚠ " + w));
  }

  if (errors.length) {
    console.error("--- エラー ---");
    errors.forEach((e) => console.error("✗ " + e));
    console.error(`\n${errors.length}件のエラーが見つかりました。修正してください。`);
    process.exit(1);
  }

  console.log(`✓ 本のデータは正常です（${Array.isArray(books) ? books.length : 0}冊を確認）。`);
}

main();
