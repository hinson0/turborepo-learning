import type { ApiResponse, User } from "@repo/shared";
import { generateId } from "@repo/shared";
import { Hono } from "hono";

export const usersRoute = new Hono();

usersRoute.get("/", (c) => {
  return c.json<ApiResponse<User[]>>({
    success: true,
    message: "获取成功",
    data: [
      { id: generateId(), name: "张三", email: "zhangsan@example.com" },
      { id: generateId(), name: "李四", email: "lisi@example.com" },
    ],
  });
});
