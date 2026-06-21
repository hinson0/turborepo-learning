export function generateId(): string {
  const id = Math.random().toString(36).substring(2, 6); // ← 改成 4 位
  console.log("生成 ID是  :", id); // ← 加日志
  return id;
}
