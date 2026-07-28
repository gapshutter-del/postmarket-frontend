export default function Button({
  children,
  onClick,
  type = "button",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        background: "#111827",
        color: "#fff",
        border: "none",
        borderRadius: 8,
        padding: "10px 18px",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}