import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";

const DATABASE_URL = process.env.DATABASE_URL || "data.db";

const sqlite = new Database(DATABASE_URL);

export const db = drizzle(sqlite, { schema });

sqlite.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    created_at INTEGER NOT NULL
  )
`);

const count = sqlite.prepare("SELECT COUNT(*) as count FROM users").get() as {
  count: number;
};

if (count.count === 0) {
  sqlite.exec(`
    INSERT INTO users (name, email, created_at) VALUES
    ('张三', 'zhangsan@example.com', ${Date.now()}),
    ('李四', 'lisi@example.com', ${Date.now()}),
    ('王五', 'wangwu@example.com', ${Date.now()})
  `);
  console.log("✅ 种子数据已插入");
}
