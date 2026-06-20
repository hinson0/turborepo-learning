import { serve } from "@hono/node-server";
import "dotenv/config";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { usersRoute } from "./routes/users";

const app = new Hono();

const PORT = Number(process.env.PORT) || 4000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";

app.use("/api/*", cors({ origin: CORS_ORIGIN }));
app.route("/api/users", usersRoute);
app.get("/", (c) => c.text("🏗️ Turborepo API Running!"));

serve({ fetch: app.fetch, port: PORT }, (info) => {
  console.log(`🚀 API 已启动: http://localhost:${info.port}`);
});
