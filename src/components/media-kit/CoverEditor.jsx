export default function CoverEditor({ src }) {
  return (
    <div
      style={{
        height: 240,
        borderRadius: 16,
        overflow: "hidden",
        background: "#e5e7eb",
      }}
    >
      {src ? (
        <img
          src={src}
          alt="Cover"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      ) : (
        <div
          style={{
            height: "100%",
            display: "grid",
            placeItems: "center",
            color: "#6b7280",
          }}
        >
          No cover image
        </div>
      )}
    </div>
  );
}