# my-monorepo — Turborepo 学习项目

TypeScript monorepo，pnpm workspaces + Turborepo，用于学习 monorepo 架构、构建管线、前后端协作。

## Project

- **Stack**: TypeScript 5.5 + React 18 (Vite 5) + Hono 4 + Drizzle ORM + SQLite + Turborepo 2.9
- **Workspace**: pnpm，`apps/*` + `packages/*`
- **Module format**: ESM（所有包 `"type": "module"`）

## Commands

| 命令                                     | 作用                                                   |
| ---------------------------------------- | ------------------------------------------------------ |
| `pnpm build`                             | 全量编译（`turbo run build`，先 ^build 上游再自建）    |
| `pnpm dev`                               | 全量开发（`turbo run lint dev`）                       |
| `pnpm lint`                              | 全量类型检查                                           |
| `pnpm web`                               | 只启 web（`turbo run dev --filter=@repo/web`）         |
| `pnpm demo`                              | 启所有 demo-_（`turbo run dev --filter=@repo/demo-_`） |
| `pnpm tsx <file>`                        | 快速运行 TS 文件（根 script 已 `cd packages/scripts`） |
| `npx turbo run build --graph=graph.html` | 输出依赖图                                             |

### 单包命令

| 包           | dev                      | build               | lint           |
| ------------ | ------------------------ | ------------------- | -------------- |
| @repo/web    | `vite --port 3000`       | `tsc && vite build` | `tsc --noEmit` |
| @repo/api    | `tsx watch src/index.ts` | `tsc`               | `tsc --noEmit` |
| @repo/shared | `tsc --watch`            | `tsc`               | `tsc --noEmit` |
| @repo/ui     | `tsc --watch`            | `tsc`               | `tsc --noEmit` |

## Architecture

```
apps/
  api/          Hono HTTP 服务，Drizzle + better-sqlite3
  web/          React SPA（Vite），使用 @repo/ui + @repo/shared
  demo-a..d/    简单 Node demo，无框架
packages/
  shared/       纯 TS 工具库（types, utils）→ 被 api/web/ui 依赖
  ui/           React 组件库（Button, Card）→ 被 web 依赖
  scripts/      快速测试用 playground（tsx 直跑）
```

依赖关系：`api → shared`，`web → shared + ui`

## Conventions

- **严格模式**: tsconfig `"strict": true`，不可放宽
- **包引用**: monorepo 内用 `"workspace:*"` 引用，不加版本号
- **lint = 类型检查**: 所有 `lint` script 即 `tsc --noEmit`，无额外 linter
- **ESM only**: 全部 `import`/`export`，无 CommonJS
- **tsx 直跑**: 无需编译即可运行 TS（api dev + scripts）
- **demo 包极简**: 不要往 demo-a..d 加复杂依赖，保持独立可运行
- **scripts/playground.ts**: 临时测试代码可写这里，用完不必清

## Notes

（空，随时补充）
