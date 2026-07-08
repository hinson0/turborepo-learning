import { useState } from "react";
import Foo from "./Foo";
import Form from "./Form";

// ============================================================
// useState Demo — 涵盖最常用的几种模式
// ============================================================

/** 1. 基础：计数器 —— 最简单的 useState 用法 */
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <section style={sectionStyle}>
      <h2>1. 基础计数器</h2>
      <p>
        当前值：<b>{count}</b>
      </p>
      <button style={btnStyle} onClick={() => setCount(count + 1)}>
        +1
      </button>
      <button style={btnStyle} onClick={() => setCount(count - 1)}>
        -1
      </button>
      <button style={btnStyle} onClick={() => setCount(0)}>
        重置
      </button>
    </section>
  );
}

/** 2. 对象状态 —— 表单/多字段场景 */
function UserForm() {
  const [form, setForm] = useState({ name: "", email: "" });

  const handleChange =
    (field: "name" | "email") => (e: React.ChangeEvent<HTMLInputElement>) => {
      // 关键：展开旧值再覆盖，不要直接 mutate
      setForm({ ...form, [field]: e.target.value });
    };

  return (
    <section style={sectionStyle}>
      <h2>2. 对象状态</h2>
      <input
        placeholder="姓名"
        value={form.name}
        onChange={handleChange("name")}
        style={inputStyle}
      />
      <input
        placeholder="邮箱"
        value={form.email}
        onChange={handleChange("email")}
        style={inputStyle}
      />
      <pre>状态: {JSON.stringify(form, null, 2)}</pre>
    </section>
  );
}

/** 3. 数组状态 —— 列表增删 */
function TodoList() {
  const [todos, setTodos] = useState<string[]>([]);
  const [text, setText] = useState("");

  const add = () => {
    if (!text.trim()) return;
    // 追加：展开旧数组 + 新元素
    setTodos([...todos, text]);
    setText("");
  };

  const remove = (index: number) => {
    // 删除：用 filter
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <section style={sectionStyle}>
      <h2>3. 数组状态</h2>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          placeholder="添加待办"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          style={inputStyle}
        />
        <button style={btnStyle} onClick={add}>
          添加
        </button>
      </div>
      <ul>
        {todos.map((item, i) => (
          <li key={i}>
            {item}{" "}
            <button onClick={() => remove(i)} style={{ color: "red" }}>
              ✕
            </button>
          </li>
        ))}
      </ul>
      {todos.length === 0 && <p style={{ color: "#999" }}>暂无待办</p>}
    </section>
  );
}

/** 4. 布尔切换 —— 弹窗/开关 */
function Toggle() {
  const [on, setOn] = useState(false);

  return (
    <section style={sectionStyle}>
      <h2>4. 布尔切换</h2>
      <button style={btnStyle} onClick={() => setOn(!on)}>
        {on ? "🔆 开" : "🌙 关"}
      </button>
      <p>{on ? "开关已打开" : "开关已关闭"}</p>
    </section>
  );
}

/** 5. 函数式更新 —— 基于旧值计算新值（闭包安全） */
function FunctionalUpdate() {
  const [count, setCount] = useState(0);

  return (
    <section style={sectionStyle}>
      <h2>5. 函数式更新</h2>
      <p>
        当前值：<b>{count}</b>
      </p>
      {/* 用回调而非直接引用 count，避免闭包陷阱 */}
      <button style={btnStyle} onClick={() => setCount((prev) => prev + 1)}>
        +1
      </button>
      {/* 连击 3 次 —— 等价于 prev =&gt; prev + 3 */}
      <button
        style={btnStyle}
        onClick={() => {
          setCount((prev) => prev + 1);
          setCount((prev) => prev + 1);
          setCount((prev) => prev + 1);
        }}
      >
        一次 +3
      </button>
    </section>
  );
}

// ============================================================
// 汇总导出
// ============================================================
export default function UseStateDemo() {
  return (
    <main style={mainStyle}>
      <h1>useState Demo</h1>
      <Counter />
      <UserForm />
      <TodoList />
      <Toggle />
      <FunctionalUpdate />
      <Foo />
      <Form />
    </main>
  );
}

// ============================================================
// 样式
// ============================================================
const mainStyle: React.CSSProperties = {
  maxWidth: 600,
  margin: "40px auto",
  fontFamily: "system-ui, sans-serif",
};

const sectionStyle: React.CSSProperties = {
  border: "1px solid #e0e0e0",
  borderRadius: 8,
  padding: 20,
  marginBottom: 20,
};

const btnStyle: React.CSSProperties = {
  marginRight: 8,
  padding: "6px 14px",
  border: "1px solid #ccc",
  borderRadius: 4,
  cursor: "pointer",
  background: "#f5f5f5",
};

const inputStyle: React.CSSProperties = {
  flex: 1,
  padding: "6px 10px",
  border: "1px solid #ccc",
  borderRadius: 4,
};
