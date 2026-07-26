/*
 * ============================================================
 *  本の情報はこのファイルだけを編集すればOKです。
 *  コマンド実行やビルド作業は一切不要です。
 *
 *  【本を1冊追加する手順】
 *   1. 下の `books` 配列の最後に、カンマ区切りで1ブロック追加する
 *   2. 表紙画像を images フォルダに入れて、coverImage にファイル名を書く
 *   3. ファイルを保存して index.html をブラウザで開く（更新する）
 *      → 自動的にカテゴリーの一覧に追加されます
 *
 *  【各項目の説明】
 *   id          : 他の本と重複しない半角英数字のID（例: "book-002"）
 *   title       : 本のタイトル
 *   author      : その本の著者名（本によって異なる場合はそれぞれ入力）
 *   description : タイトルの下に表示する短い紹介文（40〜80文字程度が目安）
 *   coverImage  : 表紙画像のパス（images フォルダに置いた画像ファイルを指定）
 *   amazonUrl   : Amazon の商品ページ（購入 or Kindle Unlimited で読めるページ）のURL
 *   category    : "ebook"（電子書籍） または "paperback"（ペーパーバック）
 *   badge       : （任意）"Kindle Unlimited 対象" など、カードに表示したいタグ文言。
 *                 不要な場合は空文字 "" のままでOK
 * ============================================================
 */

const SITE_CONFIG = {
  // ページ上部に表示するサイトタイトル（レーベル/出版社名）と紹介文
  // 著者名はサイト全体ではなく、本ごとに books 配列内の author に入力します
  siteTitle: "アラト出版",
  introText: "アラト出版が出版している本をご紹介しています。気になる本があれば、下のボタンからAmazonのページをご覧ください。",

  // Amazonアソシエイト（アフィリエイト）タグ。
  // 例: "yourid-22" のように設定すると、すべてのAmazonリンクに自動で
  // ?tag=yourid-22 が付与されます。使わない/まだ持っていない場合は空文字のままでOK。
  amazonAssociateTag: "",

  // カテゴリーの表示名（並び順もこの配列の順番で決まる）
  categories: [
    { key: "ebook", label: "電子書籍（Kindle）", emptyText: "現在、電子書籍の準備中です。" },
    { key: "paperback", label: "ペーパーバック", emptyText: "ペーパーバック版は準備中です。今後追加予定です。" }
  ]
};

const books = [
  {
    id: "sample-ebook-1",
    title: "（サンプル）本のタイトルをここに入力してください",
    author: "（サンプル）著者名をここに入力",
    description: "本の内容を一言で紹介する説明文をここに書きます。読者が気になるポイントを簡潔にまとめましょう。",
    coverImage: "images/sample-cover.svg",
    amazonUrl: "https://www.amazon.co.jp/dp/XXXXXXXXXX",
    category: "ebook",
    badge: "Kindle Unlimited 対象"
  }
];
