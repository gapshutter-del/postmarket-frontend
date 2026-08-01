export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
}) {
  const primary = {
    background: "#A56A43",
    color: "#FCF8F2",
    border: "1px solid #A56A43",
  };

  const secondary = {
    background: "#FCF8F2",
    color: "#5E4634",
    border: "1px solid #D9C9B7",
  };

  const style =
    variant === "secondary" ? secondary : primary;

  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        ...style,

        padding: "10px 18px",
        minHeight: 48,
minWidth: 180,
        borderRadius: 8,

        cursor: "pointer",

        fontFamily: "Inter, sans-serif",
        fontSize: 15,
        fontWeight: 600,
        letterSpacing: ".02em",
        color: "#000000",

        transition: "all .2s ease",

        boxShadow: "none",
      }}
    >
      {children}
    </button>
  );
}