# 著書一覧ページ

Kindleで出版している本を紹介するための、シンプルな静的Webページです。
電子書籍とペーパーバックをカテゴリー分けして表示し、それぞれAmazonへのリンクボタンを付けられます。

## 特徴

- 表紙画像・タイトル・説明文・Amazonボタンをカードで表示
- 「電子書籍」「ペーパーバック」をカテゴリーごとに自動でグループ表示
- **本を追加するときは `js/books-data.js` に1件追記するだけ**（コマンド操作・ビルド不要）
- GitHub Pages にpushすると自動で公開ページに反映（GitHub Actions）

---

## 1. 手元で見た目を確認する

このフォルダの `index.html` をダブルクリックしてブラウザで開くだけで確認できます。
（ブラウザで直接ファイルを開いても動作するように作ってあります）

もしブラウザで崩れて見える場合は、簡易サーバーを使うとより安定します。

```bash
# Node.js がある場合
npx serve .

# または Python がある場合
python -m http.server 8000
```

---

## 2. 本を1冊追加する手順

**並び順のルール**: `books` 配列の1〜3番目は売れ筋・人気作として固定表示する枠、
4番目は「最新刊」の指定席です。新刊が出たら、4番目のブロックを新刊の内容に入れ替え、
それまで4番目にあった本は5番目（先頭）に移動してください。5番目以降は新しい順に並びます。
詳しくは `js/books-data.js` 冒頭のコメントを参照してください。

1. `js/books-data.js` を開く
2. `images/` フォルダに、その本の表紙画像を入れる（jpg/png/svgなど）
3. 新刊の場合は`books` 配列の**4番目（最新刊の指定席）**に新しい本のブロックを入れ、
   それまで4番目にあった本を5番目（先頭）に移動する

```js
{
  id: "book-002",                                  // 他の本と重複しないID
  title: "本のタイトル",
  author: "その本の著者名",                          // 本によって著者が異なる場合、それぞれ入力する
  description: "本の紹介文をここに書きます。",
  coverImage: "images/book-002-cover.jpg",         // 表紙画像のファイル名
  amazonUrl: "https://www.amazon.co.jp/dp/XXXXXXXXXX",
  category: "ebook",                                // "ebook" または "paperback"
  badge: "Kindle Unlimited 対象"                     // 不要なら "" にする
}
```

サイト上部のタイトル（現在「アラト出版」）は出版レーベル名として全ページ共通で表示され、
著者名は本ごとにカード内（タイトルの下）に表示されます。

4. 保存して `index.html` をブラウザで再読み込みすれば、自動的に一覧に表示されます
5. （任意）保存前に内容チェックしたい場合は、ターミナルで以下を実行

```bash
node scripts/validate-books.js
```

   id の重複や必須項目の入力漏れがあれば、ここでエラーとして教えてくれます。

---

## 3. GitHub Pages で公開する（無料・初回のみ設定）

1. GitHub で新しいリポジトリを作成する（例: `my-kindle-books`）
2. このフォルダの内容をそのリポジトリにpushする

```bash
git init
git add .
git commit -m "Initial commit: 著書一覧ページ"
git branch -M main
git remote add origin https://github.com/【あなたのアカウント】/【リポジトリ名】.git
git push -u origin main
```

3. GitHubのリポジトリ画面で `Settings → Pages` を開く
4. 「Build and deployment」の **Source** を `GitHub Actions` に変更する
5. `Actions` タブでワークフローが完了すると、
   `https://【あなたのアカウント】.github.io/【リポジトリ名】/` で公開されます

### 以降、本を追加したいとき

1と2の手順で `js/books-data.js` を編集して、以下を実行するだけです。

```bash
git add .
git commit -m "本を追加"
git push
```

pushすると自動でチェック（validate-books.js）が走り、問題がなければ数分で公開ページに反映されます。

---

## 4. サイト全体の設定を変える

`js/books-data.js` の先頭にある `SITE_CONFIG` で、サイトタイトル・著者名・紹介文・
Amazonアソシエイトタグを変更できます。

```js
const SITE_CONFIG = {
  siteTitle: "アラト出版",   // ページ上部・タブタイトル・フッターに表示される出版レーベル名
  introText: "紹介文をここに入力",
  amazonAssociateTag: "", // 例: "yourid-22"（設定すると全リンクに自動で付与されます）
  categories: [ ... ]      // カテゴリーの表示名・並び順・空状態の文言
};
```

著者名は `SITE_CONFIG` ではなく、本ごとに `books` 配列内の `author` に入力します。

---

## フォルダ構成

```
index.html              メインページ（通常は編集不要）
css/style.css            見た目のスタイル
js/books-data.js         本のデータ ★ここを編集して本を追加する
js/main.js               表示ロジック（通常は編集不要）
images/                  表紙画像を置く場所
scripts/validate-books.js  本データの入力ミスをチェックする補助スクリプト（任意）
.github/workflows/deploy.yml  GitHub Pagesへの自動デプロイ設定
docs/SPEC.md             要件・設計の記録（開発メモ）
```

## 動作環境

- 最新のChrome / Safari / Edge / Firefox で動作確認済みのシンプルなHTML/CSS/JSのみで構成
- スマートフォン幅でも1カラムで表示されるレスポンシブ対応
- ビルドツール・フレームワーク・npm依存パッケージは使用していません（`node` はチェック用スクリプトの実行にのみ必要）
