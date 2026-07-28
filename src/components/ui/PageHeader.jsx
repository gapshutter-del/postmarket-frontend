export default function PageHeader({ title, subtitle }) {
  return (
    <div
      style={{
        marginBottom: 30,
      }}
    >
      <h1
        style={{
          margin: 0,
        }}
      >
        {title}
      </h1>

      {subtitle && (
        <p
          style={{
            color: "#666",
            marginTop: 8,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}