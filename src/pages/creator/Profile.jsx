import { useState } from "react";
import Layout from "../../components/layout/Layout";
import PageHeader from "../../components/ui/PageHeader";
import { useAuth } from "../../context/AuthContext";

export default function Profile() {
  const { user, updateUser } = useAuth();

  const [form, setForm] = useState({

   

  name: user.name || "",
  display_name: user.display_name || "",
  bio: user.bio || "",

  niche: user.niche || "",

  city: user.city || "",
  province: user.province || "",
  country: user.country || "South Africa",

 
  audience_desc: user.audience_desc || "",

  total_reach: user.total_reach || 0,



  rate: user.rate || 0,


  website: user.website || "",
  whatsapp: user.whatsapp || "",
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
        <h3>Basic Information</h3>

<input
  name="name"
  value={form.name}
  onChange={handleChange}
  placeholder="Full Name"
/>

<input
  name="display_name"
  value={form.display_name}
  onChange={handleChange}
  placeholder="Creator / Display Name"
/>

<textarea
  name="bio"
  rows={4}
  value={form.bio}
  onChange={handleChange}
  placeholder="Tell advertisers who you are and what makes your audience unique."
/>

<h3>Professional Identity</h3>

<input
  name="niche"
  value={form.niche}
  onChange={handleChange}
  placeholder="Primary niche (e.g. Lifestyle, Fashion, Business)"
/>

<input
  name="city"
  value={form.city}
  onChange={handleChange}
  placeholder="City"
/>

<input
  name="province"
  value={form.province}
  onChange={handleChange}
  placeholder="Province"
/>

<input
  name="country"
  value={form.country}
  onChange={handleChange}
  placeholder="Country"
/>

<h3>Audience</h3>

<textarea
  name="audience_desc"
  rows={4}
  value={form.audience_desc}
  onChange={handleChange}
  placeholder="Describe your audience. Example: Women aged 24–35 in South Africa interested in fashion and beauty."
/>

<input
  name="total_reach"
  type="number"
  value={form.total_reach}
  onChange={handleChange}
  placeholder="Total Reach"
/>

<h3>Commercial</h3>

<input
  name="rate"
  type="number"
  value={form.rate}
  onChange={handleChange}
  placeholder="Starting campaign rate"
/>


        <input
          name="niche"
          value={form.niche}
          onChange={handleChange}
          placeholder="Creator niche"
        />

<input
  name="city"
  value={form.city}
  onChange={handleChange}
  placeholder="City"
/>

<input
  name="province"
  value={form.province}
  onChange={handleChange}
  placeholder="Province"
/>

<input
  name="country"
  value={form.country}
  onChange={handleChange}
  placeholder="Country"
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


<h3>Contact</h3>

<input
  name="website"
  value={form.website}
  onChange={handleChange}
  placeholder="Website"
/>

<input
  name="whatsapp"
  value={form.whatsapp}
  onChange={handleChange}
  placeholder="WhatsApp"
/>


        <button type="submit">
          Save Changes
        </button>
      </form>
    </Layout>
  );
}