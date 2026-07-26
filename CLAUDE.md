# CLAUDE.md — 著書一覧ページ

## 1. プロジェクト概要
Kindle出版している著書を紹介する静的Webページ。電子書籍／ペーパーバックをカテゴリー分けし、
各本に表紙・タイトル・説明・Amazonリンクボタンを表示する。詳細要件は `docs/SPEC.md` 参照。

## 2. 技術スタック
素のHTML/CSS/JavaScriptのみ。フレームワーク・ビルドツール・npm依存パッケージなし。
チェック用スクリプト（`scripts/validate-books.js`）の実行にのみ Node.js を使う（サイト表示自体には不要）。

## 3. ディレクトリ構成
```
index.html / css/style.css / js/main.js   — 表示側（通常は編集不要）
js/books-data.js                           — 本のデータ ★編集対象
images/                                     — 表紙画像
scripts/validate-books.js                   — データ検証（任意実行、CIでも自動実行）
.github/workflows/deploy.yml                — GitHub Pages 自動デプロイ
docs/SPEC.md                                — 要件・設計メモ（軽量SRS/SDD）
```

## 4. 最重要の制約（絶対に壊さないこと）
- **本の追加はデータファイル追記のみで完結する**こと（NFR-OPS-001）。
  `js/books-data.js` にビルドステップ・コンパイル・npm installを要求する変更を入れない。
- **`file://` で直接開いても動作する**こと。`fetch()` によるJSON読み込みなど、
  ローカルファイルとして開いたときにCORSで壊れる実装を追加しない。
- 外部ライブラリ・CDN読み込みを追加しない（オフラインでも壊れないシンプル構成を維持）。

## 5. 本を追加する手順（このリポジトリでの正しい手順）
`README.md` の「2. 本を1冊追加する手順」を参照。要約すると:
1. `images/` に表紙を追加
2. `js/books-data.js` の `books` 配列に1ブロック追記
3. （任意）`node scripts/validate-books.js` で検証
4. コミットしてpush → GitHub Actionsが検証→自動デプロイ

## 6. データモデル
`Book`: `{ id, title, author, description, coverImage, amazonUrl, category: "ebook"|"paperback", badge }`
`SITE_CONFIG`: `{ siteTitle, introText, amazonAssociateTag, categories[] }`
`siteTitle` は出版レーベル名（例: 「アラト出版」）として全ページ共通表示。著者名は個々の本に紐づくため
`SITE_CONFIG` には持たせず `Book.author` で管理する（本ごとに著者が異なるため）。
詳細は `docs/SPEC.md` セクション6。

## 7. テスト・検証
- `node scripts/validate-books.js` … id重複/必須項目欠落/不正カテゴリ/URL形式/画像存在チェック
- ブラウザでの目視確認（レスポンシブ・空状態・画像フォールバック）は `docs/SPEC.md` セクション8のTC一覧を参照

## 8. デプロイ
GitHub Pages（GitHub Actions経由）。`main` へのpushで自動デプロイ。手順は `README.md` セクション3。

## 9. 既知の未決事項
- Amazonアソシエイトタグ未設定（`js/books-data.js` の `amazonAssociateTag` に後から追記可）
- 実データ未投入（サンプル本1件のみ。差し替えが必要）
- ペーパーバックは現時点で0件（空状態表示が正しく出ることを確認済み）

## 10. コーディング方針
- 依存追加は原則禁止。どうしても必要な場合はREADME/CLAUDE.mdを同時に更新すること。
- 変更時は `docs/SPEC.md` のFR/NFR/ACC/TCとの整合を確認し、必要なら該当IDを更新する。
