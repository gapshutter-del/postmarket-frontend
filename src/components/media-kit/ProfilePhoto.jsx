export default function ProfilePhoto({ src }) {
  return (
    <div
      style={{
        width: 140,
        height: 140,
        borderRadius: "50%",
        overflow: "hidden",
        border: "5px solid white",
        background: "#ddd",
      }}
    >
      {src ? (
        <img
          src={src}
          alt="Profile"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "grid",
            placeItems: "center",
            color: "#777",
          }}
        >
          No Photo
        </div>
      )}
    </div>
  );
}