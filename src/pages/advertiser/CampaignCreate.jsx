import { useState } from "react";
import Layout from "../../components/layout/Layout";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

export default function CampaignCreate() {
      const navigate = useNavigate();

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

  async function handleSubmit(e) {
  e.preventDefault();

  try {
    const res = await api.post("/campaigns", form);

    navigate(`/advertiser/campaign/${res.data.data.campaign_ref}`);

  } catch (err) {
    console.error(err);
    alert("Unable to create campaign.");
  }
}

  async function handleSubmit(e) {
  e.preventDefault();

  try {
    const res = await api.post("/campaigns", form);

    navigate(
      `/advertiser/campaign/${res.data.data.campaign_ref}`
    );

  } catch (err) {
    console.error(err);
    alert("Unable to create campaign.");
  }
}

  return (
    <Layout>
      <PageHeader
        title="Quick Launch"
        subtitle="Create a campaign before selecting creator posting slots."
      />

      <form
  onSubmit={handleSubmit}
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
          <Button type="submit">
  Continue →
</Button>
        </div>

      </form>
    </Layout>
  );
}