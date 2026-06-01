import type { User } from "@repo/shared";
import { Button, Card } from "@repo/ui";
import { useEffect, useState } from "react";

const API_BASE = "http://localhost:4000";

async function fetchUsers(): Promise<User[]> {
  const res = await fetch(`${API_BASE}/api/users`);
  const json = await res.json();
  return json.data;
}

export default function App() {
  const [users, setUsers] = useState<User[]>([]);

  const refresh = () => fetchUsers().then(setUsers);

  useEffect(() => {
    refresh();
  }, []);

  return (
    <main
      style={{ maxWidth: 600, margin: "40px auto", fontFamily: "sans-serif" }}
    >
      <h1>🏗️ Turborepo + Hono 前后端分离 Demo</h1>
      <Button label="🔄 刷新用户列表" onClick={refresh} />
      <div style={{ marginTop: 16 }}>
        {users.map((u) => (
          <Card key={u.id} title={u.name}>
            <p style={{ color: "#666" }}>{u.email}</p>
          </Card>
        ))}
      </div>
    </main>
  );
}
