import Button from "./Button";

export default function HeroStatement({
  greeting,
  name,
  headline,
  message,
  profileCompletion,
  ctaText,
  onAction,
}) {
  return (
    <section
      style={{
        background: "#F7F2EA",
        border: "1px solid #E5DDD2",
        borderRadius: 18,
        padding: "48px",
        marginBottom: "36px",
      }}
    >
      <p
        style={{
          fontFamily: "Inter",
          color: "#6F685F",
          marginBottom: 12,
        }}
      >
        {greeting}, {name}.
      </p>

      <h1
        style={{
          fontFamily: "Playfair Display",
          fontWeight: 600,
          fontSize: "3rem",
          color: "#2F2A25",
          lineHeight: 1.15,
          marginBottom: 24,
        }}
      >
        {headline}
      </h1>

      <p
        style={{
          fontFamily: "Inter",
          fontSize: "1.1rem",
          color: "#4D463F",
          maxWidth: 720,
          lineHeight: 1.8,
          marginBottom: 40,
        }}
      >
        {message}
      </p>

      <div
        style={{
          borderTop: "1px solid #DCCFBE",
          paddingTop: 28,
        }}
      >
        <p
          style={{
            fontFamily: "Inter",
            color: "#4D463F",
            marginBottom: 20,
          }}
        >
          Your profile is <strong>{profileCompletion}% complete.</strong>

          <br />

          One more step and advertisers will see your strongest professional
          self.
        </p>

        <Button onClick={onAction}>
          {ctaText}
        </Button>
      </div>
    </section>
  );
}