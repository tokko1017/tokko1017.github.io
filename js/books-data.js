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
    id: "nanobanana-nyumon",
    title: "3分でわかるAI画像のはじめ方 Nano Banana超入門 ―はじめてのAI画像生成―",
    author: "AIイラスト・クリエイティブナビゲーター しずく",
    description: "Googleの最新AI画像生成ツール「Nano Banana」の使い方が3分でわかる完全入門ガイド。基本操作から\"魅せる\"プロンプト設計まで解説。",
    coverImage: "images/1.png",
    amazonUrl: "https://www.amazon.co.jp/dp/B0FWQTTPFK",
    category: "ebook",
    badge: "Kindle Unlimited 対象"
  },
  {
    id: "kekkon-mibunkekata",
    title: "30代女性必読！「結婚してはいけない男」の脳科学的見分け方",
    author: "男性脳ナビゲーター 雫",
    description: "「また同じタイプに惹かれてしまった…」30代女性必読。脳科学的な見分け方を25項目のチェックリストと30日間アクションプランで解説。",
    coverImage: "images/2.png",
    amazonUrl: "https://www.amazon.co.jp/dp/B0G18LRW2M",
    category: "ebook",
    badge: "Kindle Unlimited 対象"
  },
  {
    id: "shodogai-bug",
    title: "衝動買いは脳のバグである ―最新脳科学が教える「損しない」お金の使い方―",
    author: "脳科学マネーアドバイザー 雫",
    description: "「また買っちゃった…」はあなたのせいじゃない。最新脳科学が教える、年間50万円を守る「損しない」お金の使い方。",
    coverImage: "images/3.png",
    amazonUrl: "https://www.amazon.co.jp/dp/B0G2T6JDR4",
    category: "ebook",
    badge: "Kindle Unlimited 対象"
  },
  {
    id: "zubora-kakuteishinkoku",
    title: "完全マンガ版 ズボラな私が、AIとふたりで「確定申告」を攻略した話",
    author: "しずく",
    description: "家事按分の境界線から青色申告65万円控除まで、AIと一緒に確定申告を攻略するフリーランス・個人事業主必読の一冊。",
    coverImage: "images/4.jpg",
    amazonUrl: "https://www.amazon.co.jp/dp/B0GBZFP912",
    category: "ebook",
    badge: "Kindle Unlimited 対象"
  },
  {
    id: "chatgpt-eigyojutsu",
    title: "成約率が「勝手に」上がるChatGPT営業術 ―実践プロンプト25―",
    author: "AIナビゲーター しずく",
    description: "準備10分で成約2倍。トップセールスの思考をコピーする実践プロンプト25で、成約率が「勝手に」上がる営業術。",
    coverImage: "images/5.png",
    amazonUrl: "https://www.amazon.co.jp/dp/B0GHMWQPC8",
    category: "ebook",
    badge: "Kindle Unlimited 対象"
  },
  {
    id: "iiko-yamete",
    title: "もう、「いい子」をやめてもいいですか？",
    author: "心理カウンセラー 雫",
    description: "我慢しすぎて、苦しいあなたへ。読むだけで心が軽くなる心理学。「いい子」をやめた瞬間、人生は動き出す7つのステップ。",
    coverImage: "images/6.png",
    amazonUrl: "https://www.amazon.co.jp/dp/B0GL4FBMGF",
    category: "ebook",
    badge: "Kindle Unlimited 対象"
  },
  {
    id: "wagaya-tenshi-01",
    title: "わが家の天使は、本業・破壊神でした。 ―離乳食は時速100kmで飛んでいく―",
    author: "水月 雫",
    description: "離乳食は時速100kmで飛んでいく。育児あるある満載のフルカラーコミックエッセイ、第1話。",
    coverImage: "images/7.jpg",
    amazonUrl: "https://www.amazon.co.jp/dp/B0GLM7932M",
    category: "ebook",
    badge: "Kindle Unlimited 対象"
  },
  {
    id: "wagaya-tenshi-02",
    title: "わが家の天使は、本業・破壊神でした 第2話 ―30万円の壁紙がキャンバスになった午後―",
    author: "水月 雫",
    description: "30万円の壁紙がキャンバスになった午後。育児あるある満載のコミックエッセイ第2話。",
    coverImage: "images/8.jpg",
    amazonUrl: "https://www.amazon.co.jp/dp/B0GM1PQNNM",
    category: "ebook",
    badge: "Kindle Unlimited 対象"
  },
  {
    id: "wagaya-tenshi-03",
    title: "わが家の天使は、本業・破壊神でした 第3話 ―深夜2時のパーティータイム、ママは白目―",
    author: "水月 雫",
    description: "深夜2時のパーティータイム、ママは白目。全国のママが共感する育児あるある満載の第3話。",
    coverImage: "images/9.jpg",
    amazonUrl: "https://www.amazon.co.jp/dp/B0GNCKH9FD",
    category: "ebook",
    badge: "Kindle Unlimited 対象"
  },
  {
    id: "googlemap-choshinkaron",
    title: "2026年版 Googleマップ超進化論 完全マニュアル ―AI時代の最強パートナー―",
    author: "AIアドバイザー 水月 雫",
    description: "探す・迷う・悩む時間はもう終わり。Geminiと歩く超・活用術。AI時代の最強パートナー、完全マニュアル。",
    coverImage: "images/11.png",
    amazonUrl: "https://www.amazon.co.jp/dp/B0FPD7GHFL",
    category: "ebook",
    badge: "Kindle Unlimited 対象"
  },
  {
    id: "kakuteishinkoku-wana",
    title: "3月16日まで！まだ間に合う確定申告の「罠」 ―2026年最新版―",
    author: "しずく",
    description: "変わった「基礎控除」と「特定親族控除」を攻略して、還付金を取り戻す最短ルート。初心者でも安心のフルカラー漫画解説。",
    coverImage: "images/10.png",
    amazonUrl: "https://www.amazon.co.jp/dp/B0GQXY2MM7",
    category: "ebook",
    badge: "Kindle Unlimited 対象"
  },
  {
    id: "code-ai-kakasero",
    title: "コードは、AIに書かせろ。 ―Claude Code×Groqで開発速度を10倍にする実践ガイド―",
    author: "AIアドバイザー 水月 雫",
    description: "Claude Code×Groqで開発速度を10倍にする実践ガイド。AI×開発者必携の一冊。",
    coverImage: "images/12.jpg",
    amazonUrl: "https://www.amazon.co.jp/dp/B0H3W8XZTP",
    category: "ebook",
    badge: "Kindle Unlimited 対象"
  },
  {
    id: "threads-note-ogonsendo",
    title: "フォロワー0から稼ぐ Threads×note黄金導線 ―2026年最新版―",
    author: "arato",
    description: "フォロワー0から稼ぐ。AIで投稿を伸ばし、note販売につなげる実践テンプレート集。投稿から収益化までの最短ルートを完全サポート。",
    coverImage: "images/13.jpg",
    amazonUrl: "https://www.amazon.co.jp/dp/B0H7WQMY3H",
    category: "ebook",
    badge: "Kindle Unlimited 対象"
  },
  {
    id: "kotoba-jinsei",
    title: "あなたの言葉が、人生を変える。 ―『言葉使い』になる4つの習慣―",
    author: "倉橋 芳幸",
    description: "『言葉使い』になる4つの習慣。あなたの言葉が、人生を変える。",
    coverImage: "images/14.jpg",
    amazonUrl: "https://www.amazon.co.jp/dp/B0H72MYJJ4",
    category: "ebook",
    badge: "Kindle Unlimited 対象"
  },
  {
    id: "kansatsuryoku-sainou",
    title: "観察力は、才能じゃない。 ―5つの技術で、相手の本音が見えてくる―",
    author: "arato",
    description: "5つの技術で、相手の本音が見えてくる。一生使える「人を理解する力」を、あなたの武器に。",
    coverImage: "images/15.jpg",
    amazonUrl: "https://www.amazon.co.jp/dp/B0H9SXQ4JC",
    category: "ebook",
    badge: "Kindle Unlimited 対象"
  }
];
