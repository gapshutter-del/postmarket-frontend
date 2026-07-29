import Layout from "../../components/layout/Layout";
import PageHeader from "../../components/ui/PageHeader";

import CoverEditor from "../../components/media-kit/CoverEditor";
import ProfilePhoto from "../../components/media-kit/ProfilePhoto";
import AudienceCard from "../../components/media-kit/AudienceCard";
import PricingCard from "../../components/media-kit/PricingCard";
import PortfolioCard from "../../components/media-kit/PortfolioCard";

import { useAuth } from "../../context/AuthContext";

export default function MediaKit() {
  const { user } = useAuth();

  return (
    <Layout>
      <PageHeader
        title="Media Kit"
        subtitle="Build your public creator profile."
      />

      <CoverEditor src={user?.cover_photo} />

      <div
        style={{
          marginTop: -70,
          marginLeft: 40,
          marginBottom: 30,
        }}
      >
        <ProfilePhoto src={user?.profile_photo} />
      </div>

      <div
        style={{
          display: "grid",
          gap: 30,
        }}
      >
        <section>
          <h2>{user?.name}</h2>

          <p style={{ color: "#6b7280" }}>
            {user?.niche}
          </p>

          <p>
            {user?.audience_desc ||
              "Tell brands who you are and what you create."}
          </p>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: 30,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
              gap: 20,
            }}
          >
            <AudienceCard
              title="Total Reach"
              value={user?.total_reach?.toLocaleString()}
            />

            <AudienceCard
              title="Niche"
              value={user?.niche || "-"}
            />

            <AudienceCard
              title="Platforms"
              value={user?.platforms?.length || 0}
            />
          </div>

          <PricingCard rate={user?.rate} />
        </section>

        <section>
          <h3>Platforms</h3>

          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            {user?.platforms?.map((platform) => (
              <span
                key={platform}
                style={{
                  padding: "8px 14px",
                  background: "#2563eb",
                  color: "white",
                  borderRadius: 999,
                }}
              >
                {platform}
              </span>
            ))}
          </div>
        </section>

        <section>
          <PortfolioCard />
        </section>
      </div>
    </Layout>
  );
}