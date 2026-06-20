import { createServer } from "node:http";

// 一个用于演示 Turbo TUI 的最小 web 服务:零依赖、启动极快。
const NAME = "Demo B";
const EMOJI = "🍋";
const PORT = 4002; // 硬编码,避免三个 demo 抢同一个全局 PORT
const HEARTBEAT_MS = 2500;

const server = createServer((req, res) => {
  console.log(`${EMOJI} [${NAME}] 收到请求 ${req.method} ${req.url}`);
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(`<!doctype html><meta charset="utf-8">
  <h1>${EMOJI} ${NAME}</h1>
  <p>这是用于演示 Turbo TUI 的最小 web 服务,端口 ${PORT}。</p>`);
});

server.listen(PORT, () => {
  console.log(`${EMOJI} [${NAME}] ready → http://localhost:${PORT}`);
});

// 每隔几秒打印心跳,方便在 TUI 右侧看到这个服务“独立的实时输出流”。
let n = 0;
setInterval(() => {
  console.log(`${EMOJI} [${NAME}] 心跳 #${++n} — 我还活着 (port ${PORT})`);
}, HEARTBEAT_MS);
