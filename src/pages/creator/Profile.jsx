import { useState } from "react";
import Layout from "../../components/layout/Layout";
import PageHeader from "../../components/ui/PageHeader";
import { useAuth } from "../../context/AuthContext";

export default function Profile() {
  const { user, updateUser } = useAuth();

  const [form, setForm] = useState({
    name: user.name || "",
    niche: user.niche || "",
    audience_desc: user.audience_desc || "",
    total_reach: user.total_reach || 0,
    rate: user.rate || 0,
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

 async function handleSave(e) {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:3000/api/auth/profile",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message);
    }

    updateUser(result.data);

    alert("Profile updated successfully!");

    console.log(result);

  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}

  return (
    <Layout>
      <PageHeader
        title="Creator Profile"
        subtitle="Manage your public creator information."
      />

      <form
        onSubmit={handleSave}
        style={{
          display: "grid",
          gap: 20,
          maxWidth: 700,
        }}
      >
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
        />

        <input
          name="niche"
          value={form.niche}
          onChange={handleChange}
          placeholder="Creator niche"
        />

        <textarea
          name="audience_desc"
          value={form.audience_desc}
          onChange={handleChange}
          placeholder="Audience description"
          rows={5}
        />

        <input
          name="total_reach"
          type="number"
          value={form.total_reach}
          onChange={handleChange}
        />

        <input
          name="rate"
          type="number"
          value={form.rate}
          onChange={handleChange}
        />

        <button type="submit">
          Save Changes
        </button>
      </form>
    </Layout>
  );
}