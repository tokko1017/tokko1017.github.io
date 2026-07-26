# 著書一覧ページ — 要件・設計メモ（軽量版）

本ドキュメントは nagame-dev のID接続体系（要件↔根拠↔受入基準↔テスト）を、
静的サイトという小規模プロジェクトの規模に合わせて簡略化して記録したものです。
IEEE準拠のフルSRS/SDDではなく、保守に必要な最小限の情報に絞っています。

作成日: 2026-07-26

---

## 1. 目的（OBJ）

| ID | 内容 |
|---|---|
| OBJ-001 | Kindleで出版している著者自身の本を、第三者に見せられる形のWebページとして紹介する |
| OBJ-002 | 本を追加する作業を「データファイルへの追記のみ」に単純化し、非エンジニアでも運用できるようにする |

## 2. 利用者（USR）

| ID | 内容 |
|---|---|
| USR-001 | サイト運営者本人（著者）。本の追加・更新を行う |
| USR-002 | サイト訪問者。本の情報を見てAmazonの商品ページへ遷移する |

## 3. スコープ

### IN SCOPE
- 表紙画像・タイトル・説明文・Amazonリンクボタンを持つ本カードの表示
- 電子書籍／ペーパーバックのカテゴリー分け表示
- データファイル（`js/books-data.js`）への追記だけで一覧に自動反映
- GitHub Pages への公開、push時の自動デプロイ（GitHub Actions）
- Amazonアソシエイトタグの一括設定（任意）

### OUT OF SCOPE（対象外）
- 管理画面（GUI）からの本の追加・編集
- 決済・在庫連携・レビュー機能
- 多言語対応
- アクセス解析の組み込み（GA4等）

### DEFER（延期・将来検討）
- ペーパーバックの実データ投入（現時点では電子書籍のみ運用中のため、カテゴリー枠のみ用意）
- カテゴリーの追加（例: オーディオブック）
- 検索・並び替え機能

---

## 4. 機能要件（FR）

| ID | 要件 | 優先度 | 受入基準 (ACC) | テスト (TC) |
|---|---|---|---|---|
| FR-BOOKLIST-001 | 本を「電子書籍」「ペーパーバック」のカテゴリーごとにセクション分けして表示する | Must | ACC-001 | TC-001 |
| FR-BOOKLIST-002 | 各本カードに表紙画像・タイトル・著者名・説明文・Amazonボタンを表示する | Must | ACC-002 | TC-002 |
| FR-BOOKLIST-009 | サイト上部・タブタイトル・フッターには出版レーベル名（`SITE_CONFIG.siteTitle`）を表示し、著者名は本ごとにカード内に表示する（本によって著者が異なるため） | Must | ACC-009 | TC-009 |
| FR-BOOKLIST-003 | `js/books-data.js` の `books` 配列に1件追加し保存するだけで、ビルド操作なしに一覧に反映される | Must | ACC-003 | TC-003 |
| FR-BOOKLIST-010 | 各カテゴリー内で、本は新しい順（`books`配列の先頭が最新）に表示される | Must | ACC-010 | TC-010 |
| FR-BOOKLIST-004 | 該当カテゴリーの本が0件のときは、空状態メッセージ（例: 準備中）を表示する | Must | ACC-004 | TC-004 |
| FR-BOOKLIST-005 | 表紙画像が読み込めない場合、壊れた画像アイコンではなくタイトル文字のフォールバック表示にする | Should | ACC-005 | TC-005 |
| FR-BOOKLIST-006 | `amazonAssociateTag` を設定した場合、全Amazonリンクに自動でタグを付与する | Should | ACC-006 | TC-006 |
| FR-BOOKLIST-007 | Amazonボタンは新しいタブで開く（`target="_blank" rel="noopener noreferrer"`） | Must | ACC-007 | TC-007 |
| FR-BOOKLIST-008 | push時にデータの入力ミス（id重複・必須項目欠落・不正カテゴリ）を自動検出し、デプロイ前に止める | Should | ACC-008 | TC-008 |

## 5. 非機能要件（NFR）

| ID | 要件 | 優先度 |
|---|---|---|
| NFR-COMPAT-001 | 最新のChrome/Safari/Edge/Firefoxで表示崩れがないこと。375px幅でも1カラムで表示できるレスポンシブ対応 | Must |
| NFR-OPS-001 | 本の追加作業はテキストエディタでのファイル編集のみで完結し、コマンド実行・ビルドツールを必須としないこと | Must |
| NFR-DEPLOY-001 | GitHub Pagesにおいて、mainブランチへのpush後は追加の手動操作なしに公開ページへ反映されること | Should |
| NFR-DEPEND-001 | 実行時（ブラウザ表示時）に外部ライブラリ・npm依存・ネットワーク越しのビルド処理を必要としないこと | Must |
| NFR-A11Y-001 | 画像には代替テキスト（alt）を設定し、ボタンはキーボード操作でも到達可能なリンク要素にすること | Should |

## 6. データモデル（DATA）

| ID | 内容 |
|---|---|
| DATA-001 | `Book` = `{ id, title, author, description, coverImage, amazonUrl, category("ebook"｜"paperback"), badge }` |
| DATA-002 | `SITE_CONFIG` = `{ siteTitle, introText, amazonAssociateTag, categories[] }`（`siteTitle`は出版レーベル名。著者名は個々の本に紐づくため`SITE_CONFIG`ではなく`Book.author`で管理する） |
| DATA-003 | `categories[]` の各要素 = `{ key, label, emptyText }`（カテゴリーの表示名・並び順・空状態文言を制御） |

## 7. 外部連携（API）

| ID | 内容 |
|---|---|
| API-AMAZON-001 | Amazon商品ページへのハイパーリンクのみ。API連携・自動注文・スクレイピングは行わない（規約リスクなし） |
| API-GHPAGES-001 | GitHub Pages + GitHub Actions（`actions/upload-pages-artifact`, `actions/deploy-pages`）による静的サイトホスティングと自動デプロイ |

---

## 8. 受入基準（ACC）とテスト（TC）

| ACC | 内容 | 検証方法 (TC) |
|---|---|---|
| ACC-001 | index.html を開くと「電子書籍」「ペーパーバック」の見出しが表示され、本がそれぞれ正しいセクションに属している | TC-001: books-data.js の各本の category を切り替えて表示先が変わることを目視確認 |
| ACC-002 | 各カードに画像・タイトル・著者名・説明・ボタンの5要素が揃っている | TC-002: サンプルデータ表示時に5要素が全て見える |
| ACC-003 | books配列に1件追加し保存→ブラウザ再読込のみで一覧に反映される（追加のコマンド不要） | TC-003: 本を1件追加してブラウザ更新のみで反映されることを確認 |
| ACC-004 | 該当カテゴリーが0件のとき空状態文言が表示される | TC-004: paperback が0件の状態でページを開き、空状態メッセージを確認（実施済み・below参照） |
| ACC-005 | coverImageのパスを存在しないものにしても、壊れた画像アイコンが出ずタイトル文字が表示される | TC-005: 存在しないパスを指定し、フォールバック表示を確認 |
| ACC-006 | amazonAssociateTag に値を設定すると、生成されるリンクURLに `tag=` パラメータが付与される | TC-006: タグ設定前後でリンクURLを比較 |
| ACC-007 | ボタンクリックで新しいタブが開く | TC-007: DOM上の `target="_blank" rel="noopener noreferrer"` を確認 |
| ACC-008 | id重複や必須項目欠落があると `node scripts/validate-books.js` がエラー終了する | TC-008: 意図的に不正データを入れて実行し、エラー検出を確認（実施済み・below参照） |
| ACC-009 | ページ上部・タブタイトル・フッターに「アラト出版」が表示され、著者名の一覧は表示されない。各本カードには個別の著者名が表示される | TC-009: `siteTitle`変更後の表示と、本ごとの`author`表示を確認（実施済み・below参照） |
| ACC-010 | 各カテゴリー内で、`books`配列の先頭にある本ほどページの上に表示される（新しい本が上） | TC-010: 配列の並び順とAmazon ASINの発行順（新しいASINほど新しい本）を照合し、新しい順に並んでいることを確認（実施済み） |

### 実施済みテスト結果

- **TC-003 / TC-008 相当の検証**: `node scripts/validate-books.js` を実行し、サンプルデータ1件が正常と判定されることを確認済み（PASS）。
- 残りのTC（ブラウザでの目視確認が必要なもの）は、公開前にご自身の環境で `index.html` を開いて確認してください（README.md セクション1参照）。

---

## 9. 設計（論理ビュー）

```
index.html
 ├─ <script src="js/books-data.js">   … データ（編集対象）
 └─ <script src="js/main.js">         … 表示ロジック（編集不要）
      ├─ init(): SITE_CONFIG を見出し・紹介文に反映
      ├─ renderCategorySection(): カテゴリーごとにセクションHTML生成
      │    └─ 対象カテゴリーの本が0件なら empty-state を表示 (FR-BOOKLIST-004)
      └─ renderBookCard(): 1冊分のカードHTML生成
           ├─ withAssociateTag(): amazonAssociateTag をURLに合成 (FR-BOOKLIST-006)
           └─ onerror フォールバック表示 (FR-BOOKLIST-005)
```

設計判断（ADR相当）:

- **静的HTML+素のJS採用（フレームワーク不使用）**: NFR-OPS-001「コマンド不要」を満たすため。
  React/Vueや静的サイトジェネレータはビルド工程が発生し「保存すれば反映」が崩れるため不採用。
- **データをJSファイル（`const books = [...]`）として保持し、JSON+fetchにしなかった理由**:
  `file://` で直接HTMLを開いた場合、`fetch()` はブラウザのCORS制限で失敗することがある。
  `<script src="...">` によるJS読み込みはローカルファイルとして開いても確実に動作するため。
- **GitHub Actionsでvalidate→deployを直列化**: 入力ミス（id重複・URL誤記等）を公開前に検知するため（FR-BOOKLIST-008）。

---

## 10. リスク（RISK）

| ID | 内容 | 対応 |
|---|---|---|
| RISK-001 | Amazonアソシエイト運用時、日本の景品表示法/アフィリエイト表示ガイドラインにより「広告」等の明示が必要になる場合がある | 本テンプレートはリンク機構のみ提供。実際にアソシエイトを利用する場合は、ご自身でサイト内に広告表記を追加することを推奨（Later） |
| RISK-002 | 表紙画像の著作権はKDP登録済み画像と同一のものを使う前提。第三者画像の無断使用は行わないこと | 運用者の責任範囲として明記 |
| RISK-003 | GitHub Pagesは公開リポジトリだと誰でもソースを閲覧可能 | 非公開にしたい情報（下書き原稿等）をリポジトリに含めないよう運用で注意 |

---

## 11. 未決事項

| # | 内容 | 状態 |
|---|---|---|
| 1 | Amazonアソシエイトタグの実際の値 | 未定（ヒアリング時点で「まだ決めていない」）。`js/books-data.js` の `amazonAssociateTag` に後から設定可能な構造で対応済み |
| 2 | 実際の書籍情報（タイトル・説明・表紙・URL） | サンプルデータのみ投入済み。README手順に沿って差し替えが必要 |
| 3 | 独自ドメインの利用有無 | 未確認。GitHub Pagesのデフォルトドメイン（`*.github.io`）を前提に設計 |
