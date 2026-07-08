import { useState } from "react";

export default function Form() {
  const [form, setForm] = useState({ name: "", email: "" });

  // 外层:接受字段名 name 或者 email ,返回一个函数 (field: "name" | "email") => {}
  // 返回的这个函数才是真正交给onchange的事件处理器
  // return (e: React.ChangeEvent<HTMLInputElement>) => {}
  // 函数内部: setForm(...form, [field]: e.target.value)
  // [field] 表示计算属性名

  const handleChange = (field: "name" | "email") => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [field]: e.target.value });
    };
  };

  return (
    <form>
      <h2>表单:::</h2>

      <input
        placeholder="姓名"
        value={form.name}
        onChange={handleChange("name")}
      />
      <input
        placeholder="邮箱"
        value={form.email}
        onChange={handleChange("email")}
      />
      <pre>{JSON.stringify(form, null, 2)}</pre>
    </form>
  );
}
