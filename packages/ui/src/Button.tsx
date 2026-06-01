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
  border: "1px solid #333",
  borderRadius: "4px",
  background: "#fff",
};
