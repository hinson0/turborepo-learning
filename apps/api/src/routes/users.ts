import type { ApiResponse, CreateUserInput, User } from "@repo/shared";
import { desc, eq } from "drizzle-orm";
import { Hono } from "hono";
import { db } from "../db";
import { users as usersTable } from "../db/schema";

export const usersRoute = new Hono();

// GET /api/users — 查询所有用户
usersRoute.get("/", (c) => {
  const rows = db
    .select()
    .from(usersTable)
    .orderBy(desc(usersTable.createdAt))
    .all();

  const data: User[] = rows.map((row) => ({
    id: String(row.id),
    name: row.name,
    email: row.email,
  }));

  return c.json<ApiResponse<User[]>>({
    success: true,
    message: `共 ${data.length} 条`,
    data,
  });
});

// POST /api/users — 新增用户
usersRoute.post("/", async (c) => {
  const body = await c.req.json<CreateUserInput>();

  const [newUser] = db
    .insert(usersTable)
    .values({
      name: body.name,
      email: body.email,
    })
    .returning()
    .all();

  return c.json<ApiResponse<{ id: string }>>({
    success: true,
    message: "创建成功",
    data: { id: String(newUser.id) },
  });
});

// DELETE /api/users/:id — 删除用户
usersRoute.delete("/:id", (c) => {
  const id = c.req.param("id");

  db.delete(usersTable)
    .where(eq(usersTable.id, Number(id)))
    .run();

  return c.json<ApiResponse<null>>({
    success: true,
    message: "删除成功",
    data: null,
  });
});
