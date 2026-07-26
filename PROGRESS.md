# PROGRESS

## 現在の状態: 公開中・運用フェーズ

公開URL: https://tokko1017.github.io/
GitHubリポジトリ: https://github.com/tokko1017/tokko1017.github.io

## 完了チェックリスト (DoD)

- [x] Phase 0 ヒアリング完了（公開方法=GitHub Pages / 運用=データファイル追記 / アソシエイトは後決め）
- [x] 要件・設計メモ作成（`docs/SPEC.md`、FR/NFR/ACC/TC/RISK ID接続済み）
- [x] 実装: index.html / css / js（本の一覧・カテゴリー分け・空状態・画像フォールバック・アソシエイトタグ合成）
- [x] データ検証スクリプト作成（`node scripts/validate-books.js`）
- [x] GitHub Actions ワークフロー作成（push時: validate → deploy to GitHub Pages）
- [x] README.md（プレビュー方法・本の追加手順・GitHub Pages初期設定手順・バナー差し替え手順）
- [x] 実際の書籍データ15冊を投入（表紙・タイトル・著者・紹介文・Amazon URL・Kindle Unlimitedバッジ）
- [x] GitHubリポジトリ作成・push・Pages有効化（GitHub Actions経由で自動デプロイ確認済み）
- [x] リポジトリ名を `tokko1017.github.io` にリネームし、フォルダ名のない短いURLに変更
- [x] 並び順を「売れ筋3冊固定＋最新刊1枠＋新しい順」の運用ルールに変更、コメント/README/CLAUDE.mdに明記
- [x] サイトタイトルをフォント「Zen Maru Gothic」に変更
- [x] ヘッダーを、社長デザインのバナー画像（images/banner.jpg）を1枚差し込む方式に変更
- [ ] Amazonアソシエイトタグの設定（使う場合。現時点で未定のため保留、`amazonAssociateTag` は空欄のまま運用可能）
- [ ] ペーパーバック版の投入（現在は電子書籍のみ。ペーパーバックが出たら空状態から自動的に表示に切り替わる）

## RYG判定
**Green**（本番公開・運用中）。
コード検証（validate-books.js）・実データでのデプロイ・実URLでの動作確認まで完了。
破壊的操作（削除・課金・自動投稿等）は本サイトの機能に含まれないため、運用上のリスクは低い。

## 運用ルール（今後の担当者向け）
- 本を追加する手順は `js/books-data.js` 冒頭のコメント、および `README.md` の「2. 本を1冊追加する手順」「並び順のルール」を参照
- バナー画像を差し替える場合は `images/banner.jpg` を同じファイル名で上書きするだけでよい（`README.md` セクション5）
- 本追加・バナー差し替えのどちらも、Claudeにcoverイラスト・Amazon URL等の情報を渡せば代行可能（本セッションで運用済み）

## 変更履歴
- 2026-07-26: 初版作成（要件定義〜実装〜ローカル検証まで完了）
- 2026-07-26: 実際の著書15冊のデータ投入、Kindle Unlimitedバッジ追加、表紙表示の切れ修正
- 2026-07-26: ヘッダーデザインを複数回改訂（グラデーション→本棚イラスト→線画イラスト→キャラクター＋イラスト→社長デザインのバナー画像1枚差し込み方式で確定）
- 2026-07-26: 並び順を新しい順→「売れ筋3冊固定＋最新刊1枠」の運用ルールに変更
- 2026-07-26: リポジトリ名を `Kindle_mybooks` → `tokko1017.github.io` にリネームし、公開URLからフォルダ名を除去
- 2026-07-26: フォントを「Zen Maru Gothic」（丸ゴシック系）に変更
