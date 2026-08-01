export default function Card({ title, children }) {
  return (
    <div
      style={{
        background: "#FCF8F2",
        border: "1px solid #E8DED1",
        borderRadius: 10,
        padding: "32px",
        boxShadow: "0 8px 24px rgba(40,30,20,.04)",
        transition: "all .25s ease",
      }}
    >
      {title && (
        <h3
          style={{
            margin: 0,
            marginBottom: 24,

            fontFamily: "'Playfair Display', serif",
            fontSize: 24,
            fontWeight: 600,
            lineHeight: 1.2,

            color: "#35281F",

            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </h3>
      )}

      <div
        style={{
          fontFamily: "Inter, sans-serif",
          color: "#5B5148",
          fontSize: 16,
          lineHeight: 1.8,
        }}
      >
        {children}
      </div>
    </div>
  );
}