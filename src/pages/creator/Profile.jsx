import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import PageHeader from "../../components/ui/PageHeader";
import { useAuth } from "../../context/AuthContext";
import ProfileCard from "./profile/ProfileCard";
import Button from "../../components/ui/Button";
export default function Profile() {
  const { user, updateUser } = useAuth();
const navigate = useNavigate();

const inputStyle = {
  width: "100%",
  minHeight: 48,
  padding: "12px 16px",
  borderRadius: 10,
  border: "1px solid #D9C9B7",
  background: "#FCF8F2",
  fontFamily: "Inter, sans-serif",
  fontSize: 15,
  color: "#2F2A26",
  boxSizing: "border-box",
};

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

alert("Profile saved successfully.");

navigate("/creator/dashboard");

  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}

const profileFields = [
  form.name,
  form.display_name,
  form.bio,
  form.niche,
  form.city,
  form.province,
  form.country,
  form.audience_desc,
  form.total_reach,
  form.rate,
  form.website,
  form.whatsapp,
];

const completedFields = profileFields.filter((value) => {
  return value !== "" && value !== null && Number(value) !== 0;
}).length;

const completion = Math.round(
  (completedFields / profileFields.length) * 100
);

const profileChecklist = [
  { label: "Complete your Bio", done: !!form.bio },
  { label: "Choose your Niche", done: !!form.niche },
  { label: "Add your Location", done: !!form.city && !!form.province },
  { label: "Describe your Audience", done: !!form.audience_desc },
  { label: "Set your Starting Rate", done: Number(form.rate) > 0 },
  { label: "Add your Website", done: !!form.website },
  { label: "Add your WhatsApp", done: !!form.whatsapp },
];

return (
  <Layout>
      <PageHeader
        title="Creator Profile"
        subtitle="Manage your public creator information."
      />

<ProfileCard title="Profile Completion">
  <p
    style={{
      margin: 0,
      color: "#666",
      marginBottom: 16,
    }}
  >
    Complete your profile to improve your visibility to advertisers.
  </p>

  <div
    style={{
      width: "100%",
      height: 12,
      background: "#E7DED4",
      borderRadius: 999,
      overflow: "hidden",
    }}
  >
    <div
      style={{
        width: `${completion}%`,
        height: "100%",
        background: "#A56A43",
      }}
    />
  </div>

  <p
  style={{
    marginTop: 12,
    marginBottom: 16,
    color: "#666",
    fontSize: 14,
  }}
>
  Profile Completion: {completion}%
</p>

<ul
  style={{
    margin: 0,
    paddingLeft: 20,
    color: "#555",
    lineHeight: 1.8,
  }}
>
  {profileChecklist
    .filter(item => !item.done)
    .map(item => (
      <li key={item.label}>
        {item.label}
      </li>
    ))}
</ul>

</ProfileCard>

<form
  onSubmit={handleSave}
  style={{
    display: "grid",
    gap: 24,
    maxWidth: 760,
    margin: "0 auto",
  }}
>

<ProfileCard title="Basic Information">

  <input
    name="name"
    value={form.name}
    onChange={handleChange}
    placeholder="Full Name"
    style={inputStyle}
  />

  <input
    name="display_name"
    value={form.display_name}
    onChange={handleChange}
    placeholder="Creator / Display Name"
    style={inputStyle}
  />

  <textarea
    name="bio"
    rows={4}
    value={form.bio}
    onChange={handleChange}
    placeholder="Tell advertisers who you are and what makes your audience unique."
   style={{
    ...inputStyle,
    minHeight: 120,
    resize: "vertical",
  }}
  />

</ProfileCard>


<ProfileCard title="Professional Identity">

  <input
    name="niche"
    value={form.niche}
    onChange={handleChange}
    placeholder="Primary niche (e.g. Lifestyle, Fashion, Business)"
    style={inputStyle}
  />

  <input
    name="city"
    value={form.city}
    onChange={handleChange}
    placeholder="City"
    style={inputStyle}
  />

  <input
    name="province"
    value={form.province}
    onChange={handleChange}
    placeholder="Province"
    style={inputStyle}
  />

  <input
    name="country"
    value={form.country}
    onChange={handleChange}
    placeholder="Country"
    style={inputStyle}
  />

</ProfileCard>

<ProfileCard title="Audience">

  <textarea
    name="audience_desc"
    rows={4}
    value={form.audience_desc}
    onChange={handleChange}
    placeholder="Describe your audience. Example: Women aged 24–35 in South Africa interested in fashion and beauty."
  style={{
    ...inputStyle,
    minHeight: 120,
    resize: "vertical",
  }}
 />

  <input
    name="total_reach"
    type="number"
    value={form.total_reach}
    onChange={handleChange}
    placeholder="Total Reach"
    style={inputStyle}
  />

</ProfileCard>

<ProfileCard title="Commercial">

  <input
    name="rate"
    type="number"
    value={form.rate}
    onChange={handleChange}
    placeholder="Starting campaign rate"
    style={inputStyle}
  />

</ProfileCard>



<ProfileCard title="Contact">

  <input
    name="website"
    value={form.website}
    onChange={handleChange}
    placeholder="Website"
    style={inputStyle}
  />

  <input
    name="whatsapp"
    value={form.whatsapp}
    onChange={handleChange}
    placeholder="WhatsApp"
    style={inputStyle}
  />

</ProfileCard>


        <div
  style={{
    display: "flex",
    justifyContent: "center",
    marginTop: 20,
  }}
>
  <Button type="submit">
    Save Profile
  </Button>
</div>


      </form>
    </Layout>
  );
}