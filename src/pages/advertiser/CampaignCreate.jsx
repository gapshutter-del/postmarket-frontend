import { useState } from "react";
import Layout from "../../components/layout/Layout";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

export default function CampaignCreate() {
  const [form, setForm] = useState({
    title: "",
    objective: "",
    caption: "",
    notes: "",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <Layout>
      <PageHeader
        title="Quick Launch"
        subtitle="Create a campaign before selecting creator posting slots."
      />

      <form
        style={{
          display: "grid",
          gap: 24,
          maxWidth: 760,
          margin: "0 auto",
        }}
      >
        <Card>

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Campaign Name"
          />

          <select
            name="objective"
            value={form.objective}
            onChange={handleChange}
          >
            <option value="">Select Objective</option>
            <option>Brand Awareness</option>
            <option>Sales</option>
            <option>Traffic</option>
            <option>Product Launch</option>
            <option>Announcement</option>
            <option>Other</option>
          </select>

          <textarea
            name="caption"
            rows={5}
            value={form.caption}
            onChange={handleChange}
            placeholder="Caption / Campaign Copy"
          />

          <textarea
            name="notes"
            rows={4}
            value={form.notes}
            onChange={handleChange}
            placeholder="Additional Notes (optional)"
          />

        </Card>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button>
            Continue →
          </Button>
        </div>

      </form>
    </Layout>
  );
}