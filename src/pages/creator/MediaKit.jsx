import Layout from "../../components/layout/Layout";
import PageHeader from "../../components/ui/PageHeader";
import ImageUploader from "../../components/media-kit/ImageUploader";
import api from "../../api/api";
import CoverEditor from "../../components/media-kit/CoverEditor";
import ProfilePhoto from "../../components/media-kit/ProfilePhoto";
import AudienceCard from "../../components/media-kit/AudienceCard";
import PricingCard from "../../components/media-kit/PricingCard";
import PortfolioCard from "../../components/media-kit/PortfolioCard";

import { useAuth } from "../../context/AuthContext";

export default function MediaKit() {
  const { user, updateUser } = useAuth();

  
async function saveImage(field, url) {
  try {
    const payload = {
      name: user.name,
      niche: user.niche,
      audience_desc: user.audience_desc,
      platforms: user.platforms,
      total_reach: user.total_reach,
      rate: user.rate,
      profile_photo: user.profile_photo,
      cover_photo: user.cover_photo,
    };

    payload[field] = url;

    const res = await api.put("/auth/profile", payload);

    updateUser(res.data.data);

  } catch (err) {
    console.error(err);
  }
}
  return (
    <Layout>
      <PageHeader
        title="Media Kit"
        subtitle="Build your public creator profile."
      />

      <CoverEditor src={user?.cover_photo} />

<ImageUploader
  label="Upload Cover"
  bucket="creator-cover"
  folder="covers"
  onUploaded={(url) => saveImage("cover_photo", url)}
/>

      <div
        style={{
          marginTop: -70,
          marginLeft: 40,
          marginBottom: 30,
        }}
      >
      <ProfilePhoto src={user?.profile_photo} />

<ImageUploader
  label="Upload Profile Photo"
  bucket="creator-profile"
  folder="profiles"
  onUploaded={(url) => saveImage("profile_photo", url)}
/>

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