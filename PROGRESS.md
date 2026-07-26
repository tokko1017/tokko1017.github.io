# PROGRESS

## 完了チェックリスト (DoD)

- [x] Phase 0 ヒアリング完了（公開方法=GitHub Pages / 運用=データファイル追記 / アソシエイトは後決め）
- [x] 要件・設計メモ作成（`docs/SPEC.md`、FR/NFR/ACC/TC/RISK ID接続済み）
- [x] 実装: index.html / css / js（本の一覧・カテゴリー分け・空状態・画像フォールバック・アソシエイトタグ合成）
- [x] データ検証スクリプト作成・実行確認（`node scripts/validate-books.js` → PASS、1冊確認）
- [x] GitHub Actions ワークフロー作成（push時: validate → deploy to GitHub Pages）
- [x] README.md（プレビュー方法・本の追加手順・GitHub Pages初期設定手順）
- [ ] 実際の書籍データへの差し替え（サンプルデータのままのため、ユーザー側での作業が必要）
- [ ] Amazonアソシエイトタグの設定（使う場合。未定のため保留）
- [ ] GitHub リポジトリ作成・push・Pages有効化（ユーザーのGitHubアカウントでの操作が必要なため未実施）
- [ ] 実ブラウザでの最終目視確認（レスポンシブ・画像フォールバックなど）

## RYG判定
**Yellow相当**（本番=公開URL発行の一歩手前）。
理由: コードとローカル検証（validate-books.js）はGreenだが、実際のGitHubリポジトリへのpush・
Pages設定・実データ投入はユーザー環境での操作が必要なため未実施。破壊的操作は含まない
（新規リポジトリへの初回pushのみで、既存データの上書き・削除は発生しない）。

## 残作業（ユーザー側）
1. `js/books-data.js` を実際の本の情報に差し替える
2. `images/` に実際の表紙画像を配置する
3. GitHubにリポジトリを作成し、README.md セクション3の手順でpush・Pages有効化
4. Amazonアソシエイトを使う場合、タグ確定後に `amazonAssociateTag` へ設定

## 変更履歴
- 2026-07-26: 初版作成（要件定義〜実装〜ローカル検証まで完了）
