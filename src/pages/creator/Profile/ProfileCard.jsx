export default function ProfileCard({ title, children }) {
  return (
    <section
      style={{
  background: "#FCF8F2",
  border: "1px solid #E5DDD2",
  borderRadius: 18,
  padding: 32,
  marginBottom: 32,
  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
}}
    >
      <h3
        style={{
          margin: "0 0 24px",
          fontFamily: "Playfair Display",
          fontSize: 24,
          color: "#2F2A26",
        }}
      >
        {title}
      </h3>

      {children}
    </section>
  );
}