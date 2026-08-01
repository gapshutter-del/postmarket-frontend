import { useNavigate } from "react-router-dom";

export default function SignupChoice() {
  const navigate = useNavigate();

  return (
    <main
      style={{
        maxWidth: 900,
        margin: "80px auto",
        padding: 24,
        textAlign: "center",
      }}
    >
      <h1>Choose your journey.</h1>

      <p style={{ marginBottom: 48 }}>
        Join PostMarket as a Creator or an Advertiser.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
        }}
      >
        <div
          onClick={() => navigate("/signup/creator")}
          style={{
            padding: 40,
            border: "1px solid #ddd",
            borderRadius: 16,
            cursor: "pointer",
          }}
        >
          <h2>Creator</h2>
          <p>Showcase your influence. Get discovered. Get booked.</p>
        </div>

        <div
          onClick={() => navigate("/signup/advertiser")}
          style={{
            padding: 40,
            border: "1px solid #ddd",
            borderRadius: 16,
            cursor: "pointer",
          }}
        >
          <h2>Advertiser</h2>
          <p>Discover creators. Launch campaigns. Build partnerships.</p>
        </div>
      </div>
    </main>
  );
}