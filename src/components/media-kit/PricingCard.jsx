export default function PricingCard({ rate }) {
  return (
    <div
      style={{
        background: "#111827",
        color: "white",
        borderRadius: 18,
        padding: 28,
      }}
    >
      <p
        style={{
          margin: 0,
          opacity: .8,
        }}
      >
        Starting From
      </p>

      <h1
        style={{
          margin: "10px 0",
        }}
      >
        R{rate}
      </h1>

      <p
        style={{
          opacity: .8,
          marginBottom: 20,
        }}
      >
        Campaign pricing varies by deliverables.
      </p>

      <button
        style={{
          background: "#2563eb",
          color: "white",
          border: "none",
          padding: "12px 22px",
          borderRadius: 10,
          cursor: "pointer",
        }}
      >
        Book Creator
      </button>
    </div>
  );
}