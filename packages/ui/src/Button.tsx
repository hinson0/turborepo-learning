interface Props {
  label: string;
  onClick?: () => void;
}

export function Button({ label, onClick }: Props) {
  return (
    <button onClick={onClick} style={btnStyle}>
      {label}
    </button>
  );
}

const btnStyle: React.CSSProperties = {
  padding: "8px 16px",
  cursor: "pointer",
  background: "green", // ← 改成蓝色
  color: "#dddfff", // ← 白字
  border: "none",
  borderRadius: "4px",
};
