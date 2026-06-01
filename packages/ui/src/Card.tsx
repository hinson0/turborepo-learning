import type { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

export function Card({ title, children }: Props) {
  return (
    <div style={cardStyle}>
      <h3 style={{ margin: 0 }}>{title}</h3>
      <div>{children}</div>
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  border: "1px solid #dddfff",
  borderRadius: "8px",
  padding: "16px",
  margin: "8px 0",
};
