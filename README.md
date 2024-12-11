# 国会会議録キーワード出現回数

国会会議録APIを利用し、指定したキーワードの出現回数の推移を  
可視化するWebアプリのコードです。[以前自分が書いたコード](https://github.com/tekitodsci/kokkaiSearch)を  
Boltに与えて生成しました。

## Webアプリ

以下から見られます。  
https://starlit-blancmange-28ba92.netlify.app/

## 機能

- キーワード検索機能
- 年範囲指定（1947年〜2024年）
- 出現回数の折れ線グラフ表示
- CSVデータのダウンロード
- レスポンシブデザイン

## 技術スタック

- React
- TypeScript
- Tailwind CSS
- Recharts（グラフ表示）
- Axios（API通信）

## 開発環境のセットアップ

```bash
# リポジトリのクローン
git clone [your-repository-url]
cd kokkai-visualization

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

## 使い方

1. キーワード入力欄に検索したい単語を入力
2. 開始年と終了年を選択（1947年〜2024年の間）
3. 検索ボタンをクリック
4. グラフに出現回数の推移が表示されます
5. CSVダウンロードボタンをクリックしてデータをダウンロード

## API

国会会議録検索システムのAPIを使用しています：
https://kokkai.ndl.go.jp/api.html

## ライセンス

MIT

## 貢献

1. このリポジトリをフォーク
2. 新しいブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成
