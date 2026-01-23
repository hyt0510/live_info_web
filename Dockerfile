# ベースイメージとしてbunを使用
FROM oven/bun:1 AS base

# 依存関係のインストール用ステージ
FROM base AS deps
WORKDIR /app

# 依存関係ファイルをコピー
COPY package.json bun.lockb* ./

# 依存関係をインストール
RUN bun install --frozen-lockfile

# 開発用ステージ
FROM base AS dev
WORKDIR /app

# 依存関係を開発ステージにコピー
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# ポートを公開
EXPOSE 3000

# 開発サーバーを起動
CMD ["bun", "run", "dev"]

# ビルド用ステージ
FROM base AS builder
WORKDIR /app

# 依存関係をビルダーステージにコピー
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.jsアプリケーションをビルド
RUN bun run build

# プロダクション用ステージ
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# 非rootユーザーを作成
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# ビルド成果物をコピー
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# nextjsユーザーに切り替え
USER nextjs

# ポートを公開
EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# アプリケーションを起動
CMD ["bun", "run", "server.js"]
