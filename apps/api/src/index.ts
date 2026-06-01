import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { usersRoute } from "./routes/users";

const app = new Hono();

// 允许前端 :3000 跨域访问
app.use("/api/*", cors({ origin: "http://localhost:3000" }));

// 挂载路由
app.route("/api/users", usersRoute);

// 健康检查
app.get("/", (c) => c.text("🏗️ Turborepo API Running!"));

// 启动
serve({ fetch: app.fetch, port: 4000 }, (info) => {
  console.log(`🚀 API 已启动: http://localhost:${info.port}`);
});
