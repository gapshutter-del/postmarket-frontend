export default function PortfolioCard() {
  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: 16,
        padding: 24,
        background: "white",
      }}
    >
      <h3>Featured Work</h3>

      <p style={{ color: "#6b7280" }}>
        Showcase your best campaigns here.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: 20,
          marginTop: 20,
        }}
      >
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            style={{
              height: 150,
              borderRadius: 12,
              background: "#e5e7eb",
              display: "grid",
              placeItems: "center",
              color: "#6b7280",
            }}
          >
            Campaign {item}
          </div>
        ))}
      </div>
    </div>
  );
}