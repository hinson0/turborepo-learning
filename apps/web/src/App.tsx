import type { CreateUserInput, User } from "@repo/shared";

import { Button, Card } from "@repo/ui";
import { FormEvent, useEffect, useState } from "react";

const API_BASE = "http://localhost:4000";

async function fetchUsers(): Promise<User[]> {
  const res = await fetch(`${API_BASE}/api/users`);
  const json = await res.json();
  return json.data;
}

async function createUser(input: CreateUserInput): Promise<void> {
  await fetch(`${API_BASE}/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
}

async function deleteUser(id: string): Promise<void> {
  await fetch(`${API_BASE}/api/users/${id}`, { method: "DELETE" });
}

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [count, setCount] = useState(0);

  const refresh = () => fetchUsers().then(setUsers);

  useEffect(() => {
    refresh();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    await createUser({ name, email });
    setName("");
    setEmail("");
    refresh();
  };

  return (
    <main
      style={{ maxWidth: 600, margin: "40px auto", fontFamily: "sans-serif" }}
    >
      <h1>🏗️ Turborepo + Hono + SQLite</h1>
      <button onClick={() => setCount(count + 1)}>🔢 点了 {count} 次</button>
      <details>
        <summary>
          <b>卡住了?一种写法</b>
        </summary>
      </details>

      {/* 新增表单 */}
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          placeholder="姓名"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />
        <input
          placeholder="邮箱"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />
        <Button label="➕ 添加用户" />
      </form>

      {/* 用户列表 */}
      <div style={{ marginTop: 16 }}>
        {users.map((u) => (
          <Card key={u.id} title={u.name}>
            <p style={{ color: "#666" }}>{u.email}</p>
            <Button
              label="🗑️ 删除"
              onClick={() => deleteUser(u.id).then(refresh)}
            />
          </Card>
        ))}
      </div>
    </main>
  );
}

const formStyle: React.CSSProperties = {
  display: "flex",
  gap: 8,
  marginBottom: 16,
};
const inputStyle: React.CSSProperties = {
  flex: 1,
  padding: "8px",
  border: "1px solid #ccc",
  borderRadius: 4,
};
