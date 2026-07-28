import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import PageHeader from "../../components/ui/PageHeader";
import StatCard from "../../components/ui/StatCard";
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
      <PageHeader
  title={`Welcome, ${user.name}`}
  subtitle={`Profile Completion: ${completion}%`}
/>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: 20,
          marginBottom: 40,
        }}
      >
        <StatCard
          title="Total Reach"
          value={user.total_reach?.toLocaleString()}
        />

        <StatCard
          title="Campaign Rate"
          value={`R${user.rate}`}
        />

        <StatCard
          title="Platforms"
          value={user.platforms.length}
        />

        <StatCard
          title="Status"
          value={user.status}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: 24,
        }}
      >
        <Card title="Profile">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Niche:</strong> {user.niche}</p>
          <p><strong>Audience:</strong> {user.audience_desc}</p>
          <p><strong>Platforms:</strong> {user.platforms.join(", ")}</p>
        </Card>

        <Card title="Quick Actions">
  <Button onClick={() => navigate("/creator/profile")}>
    Edit Profile
  </Button>

  <div style={{ height: 12 }} />

  <Button onClick={() => navigate("/bookings")}>
    View Bookings
  </Button>

  <div style={{ height: 12 }} />

  <Button onClick={() => navigate("/creator/media-kit")}>
    Media Kit
  </Button>
</Card>
      </div>
    </Layout>
  );
}