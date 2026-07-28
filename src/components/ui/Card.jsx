export default function Card({ title, children }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        padding: 24,
        boxShadow: "0 2px 10px rgba(0,0,0,.08)",
      }}
    >
      {title && (
        <h3
          style={{
            marginTop: 0,
            marginBottom: 20,
          }}
        >
          {title}
        </h3>
      )}

      {children}
    </div>
  );
}