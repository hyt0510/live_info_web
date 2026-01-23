# Docker開発環境

このプロジェクトはbunランタイムとNext.jsを使用したDocker環境で動作します。

## 必要な環境

- Docker Desktop（Windows版）
- Docker Compose

## 開発環境の起動

### 初回起動

```bash
# イメージをビルドしてコンテナを起動
docker-compose up --build
```

### 通常起動

```bash
# コンテナを起動
docker-compose up
```

または、バックグラウンドで起動する場合：

```bash
docker-compose up -d
```

アプリケーションは http://localhost:3000 でアクセスできます。

### コンテナの停止

```bash
# フォアグラウンドの場合はCtrl+C
# バックグラウンドの場合
docker-compose down
```

## プロダクション環境のテスト

プロダクションビルドをテストする場合：

```bash
docker-compose --profile production up app-prod --build
```

プロダクション版は http://localhost:3001 でアクセスできます。

## トラブルシューティング

### キャッシュをクリアして再ビルド

```bash
docker-compose down
docker-compose build --no-cache
docker-compose up
```

### 実行中のコンテナに入る

```bash
docker-compose exec app sh
```

### ログを確認

```bash
docker-compose logs -f app
```

### bunコマンドを実行

```bash
# パッケージをインストール
docker-compose exec app bun install <package-name>

# 依存関係を更新
docker-compose exec app bun update
```

## 特徴

- **ホットリロード**: ソースコードの変更が自動的に反映されます
- **Bunランタイム**: 高速なパッケージマネージャーとランタイム
- **マルチステージビルド**: 最適化されたプロダクションイメージ
- **開発/本番分離**: 開発とプロダクションで異なる設定を使用

## ボリュームマウント

開発環境では以下がマウントされます：

- ソースコード（ホットリロード用）
- `node_modules`（独立したボリューム）
- `.next`（独立したボリューム）

これにより、ホスト側のファイル変更が即座にコンテナに反映されます。
