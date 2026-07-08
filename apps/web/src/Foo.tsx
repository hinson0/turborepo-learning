import { useState } from "react";

export default function Foo() {
  const [count, setCount] = useState(10);

  return (
    <div>
      <p>当前值: {count}</p>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        +1
      </button>
    </div>
  );
}
