# ========== 阶段 1：构建 ==========
FROM node:20-alpine AS builder
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

WORKDIR /app

# 复制根配置
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json turbo.json tsconfig.base.json ./

# 复制所有包（turbo prune 需要）
COPY apps ./apps
COPY packages ./packages

# ← 关键！turbo prune 只保留 @repo/api 及其依赖
RUN pnpm dlx turbo prune @repo/api --docker

# 在精简后的目录里安装 + 构建
WORKDIR /app/out
RUN pnpm install --frozen-lockfile
RUN pnpm turbo run build --filter=@repo/api

# ========== 阶段 2：运行 ==========
FROM node:20-alpine AS runner
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

WORKDIR /app

# 只复制构建产物和运行时依赖
COPY --from=builder /app/out/apps/api/dist ./dist
COPY --from=builder /app/out/apps/api/node_modules ./node_modules
COPY --from=builder /app/out/packages/shared/dist ./packages/shared/dist
COPY --from=builder /app/out/apps/api/package.json ./

ENV PORT=4000
EXPOSE 4000

CMD ["node", "dist/index.js"]