import Layout from "../../components/layout/Layout";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";

export default function CampaignWorkspace() {
  return (
    <Layout>
      <PageHeader
        title="Campaign Workspace"
        subtitle="Everything about this campaign lives here."
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: 24,
          maxWidth: 1200,
          margin: "0 auto",
          alignItems: "start",
        }}
      >
        <div
          style={{
            display: "grid",
            gap: 24,
          }}
        >
          <Card>
            <h2>Campaign Brief</h2>
            <p>No brief yet.</p>
          </Card>

          <Card>
            <h2>Campaign Assets</h2>
            <p>No assets uploaded.</p>
          </Card>

          <Card>
            <h2>Shared Activity</h2>
            <p>The campaign timeline will appear here.</p>
          </Card>
        </div>

        <div
          style={{
            display: "grid",
            gap: 24,
          }}
        >
          <Card>
            <h2>Campaign Summary</h2>

            <p>
              <strong>Reference</strong>
              <br />
              CMP-...
            </p>

            <p>
              <strong>Status</strong>
              <br />
              Draft
            </p>

            <p>
              <strong>Creator</strong>
              <br />
              Not selected
            </p>
          </Card>

          <Card>
            <h2>Posting Windows</h2>

            <p>No posting windows selected.</p>
          </Card>
        </div>
      </div>
    </Layout>
  );
}