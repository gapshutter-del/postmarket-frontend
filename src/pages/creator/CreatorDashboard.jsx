import HeroStatement from "../../components/ui/HeroStatement";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";

import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

import { useAuth } from "../../context/AuthContext";

export default function CreatorDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
const profileFields = [
  user.name,
  user.email,
  user.niche,
  user.audience_desc,
  user.platforms?.length,
  user.total_reach,
  user.rate,
];

const completed = profileFields.filter(Boolean).length;

const completion = Math.round(
  (completed / profileFields.length) * 100
);
  return (
    <Layout>
      
<HeroStatement
  greeting="Good morning"
  name={user.name}
  headline="You're building something worth noticing."
  message="Advertisers discover creators who invest in their profile first."
  profileCompletion={completion}
  ctaText="Complete Profile"
  onAction={() => navigate("/creator/profile")}
/>

 <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(260px, 1fr))",
        gap: 40,
        alignItems: "start",
        maxWidth: 760,
marginBottom: 48,
        marginTop: 36,
        marginBottom: 40,
      }}
    >
      <Card title="Your audience is already listening.">
  <p>
    <strong>{user.total_reach?.toLocaleString() || 0}</strong> people can already discover your work.
  </p>
</Card>

      <Card title="Your work has value.">
  <p>
    Campaigns with you begin at{" "}
    <strong>R{user.rate || 0}</strong>.
  </p>
</Card>

      <Card title="Your presence is growing.">
  <p>
    You're active on{" "}
    <strong>{user.platforms?.length || 0}</strong>{" "}
    platform{user.platforms?.length === 1 ? "" : "s"}.
  </p>
</Card>

      <Card title="Your profile opens doors.">
  <p>
    You're <strong>{completion}%</strong> of the way there.
    Complete it and give advertisers your strongest first impression.
  </p>
</Card>
    </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1.4fr",
          gap: 24,
        }}
      >
        <Card title="Your Profile">
  <h2
    style={{
      margin: 0,
      fontFamily: "'Playfair Display', serif",
      fontWeight: 600,
      color: "#2F2A25",
    }}
  >
    {user.name}
  </h2>

<p
  style={{
    color: "#A56A43",
    letterSpacing: ".08em",
    textTransform: "uppercase",
    fontSize: 12,
    marginTop: 6,
  }}
>
  Creator
</p>

 <p
  style={{
    fontSize: 18,
    marginTop: 18,
    marginBottom: 6,
    color: "#35281F",
  }}
>
  {user.niche}
</p>

<p
  style={{
    color: "#7A6E63",
    marginTop: 0,
    marginBottom: 24,
  }}
>
  {user.platforms.join(" • ")}
</p>

  <hr
    style={{
      border: 0,
      borderTop: "1px solid #E2D8CA",
      margin: "24px 0",
    }}
  />

  <p>
    <strong>Reach</strong><br />
    {user.total_reach?.toLocaleString()}
  </p>

  <p>
    <strong>Starting from</strong><br />
    R{user.rate}
  </p>
</Card>

        <Card title="Continue your story">
  <Button
  variant="primary"
  onClick={() => navigate("/creator/profile")}
>
    Review your Profile
  </Button>

  <div style={{ height: 12 }} />

  <Button
  variant="secondary"
  onClick={() => navigate("/bookings")}
>
    Review bookings
  </Button>

  <div style={{ height: 12 }} />

  <Button
  variant="secondary"
  onClick={() => navigate("/creator/media-kit")}
>
    Present your Media Kit
  </Button>
</Card>
      </div>
    </Layout>
  );
}