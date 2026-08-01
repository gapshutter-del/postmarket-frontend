import { useNavigate } from "react-router-dom";

export default function CreatorLanding() {
  const navigate = useNavigate();

  return (
    <main
      style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: "80px 24px",
      }}
    >
      <h1
        style={{
          fontFamily: "Playfair Display",
          fontSize: "4rem",
          lineHeight: 1.15,
          fontWeight: 600,
          maxWidth: 700,
          margin: "0 auto 24px",
          textAlign: "center",
        }}
      >
        Your audience is valuable.
        <br />
        Your influence should be, too.
      </h1>

      <p
        style={{
          fontSize: "1.2rem",
          maxWidth: 700,
          lineHeight: 1.8,
          margin: "0 auto 40px",
          textAlign: "center",
        }}
      >
        Join PostMarket and let verified advertisers discover your profile,
        media kit and campaign rates.
      </p>

      <div style={{ textAlign: "center" }}>
        <button
          onClick={() => navigate("/signup")}
          style={{
            padding: "16px 32px",
            borderRadius: 10,
            border: "none",
            background: "#A56A43",
            color: "#fff",
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          Join as a Creator
        </button>
      </div>
    </main>
  );
}