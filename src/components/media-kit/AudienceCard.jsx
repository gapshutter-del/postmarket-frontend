export default function AudienceCard({ title, value }) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: 16,
        padding: 24,
        border: "1px solid #e5e7eb",
        boxShadow: "0 2px 8px rgba(0,0,0,.05)",
      }}
    >
      <div
        style={{
          color: "#6b7280",
          fontSize: 14,
          marginBottom: 8,
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: 28,
          fontWeight: 700,
        }}
      >
        {value}
      </div>
    </div>
  );
}