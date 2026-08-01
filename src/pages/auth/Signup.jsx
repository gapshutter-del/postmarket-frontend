import { useMemo } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../api/api";

export default function Signup({ userType }) {
  
  const copy = useMemo(() => {
  return userType === "creator"
    ? {
        title: "Create your Creator account",
        subtitle: "Start building your professional presence.",
      }
    : {
        title: "Create your Advertiser account",
        subtitle: "Start discovering creators.",
      };
}, [userType]);
  
  const navigate = useNavigate();

  const [form, setForm] = useState({
  name: "",
  email: "",
  password: "",
});

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  }

  async function handleSubmit(e) {

    e.preventDefault();

    setLoading(true);
    setError("");

    try {

      const res = await api.post("/auth/signup", {
  ...form,
  type: userType,
});

      alert("Account created successfully.");

      navigate("/login");

    } catch (err) {

      console.error(err);

      setError(
        err.response?.data?.message ||
        "Signup failed."
      );

    } finally {

      setLoading(false);

    }

  }

 return (
  <div
    style={{
      maxWidth: 420,
      margin: "80px auto",
    }}
  >
    <div
      style={{
        marginBottom: 24,
        padding: "12px 16px",
        borderRadius: 10,
        background: "#F7F2EA",
        border: "1px solid #E5DDD2",
      }}
    >
      <strong>
        {userType === "creator" ? "Creator" : "Advertiser"}
      </strong>
      {" → "}Account Setup
    </div>

    <h2>{copy.title}</h2>

    <p
      style={{
        color: "#6B7280",
        marginBottom: 32,
      }}
    >
      {copy.subtitle}
    </p>

<p
  onClick={() => navigate("/signup")}
  style={{
    marginBottom: 24,
    color: "#A56A43",
    cursor: "pointer",
    fontWeight: 600,
  }}
>
  ← Choose a different account type
</p>

    <form onSubmit={handleSubmit}>

        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: 12 }}
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: 12 }}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: 12 }}
        />


        <button
          type="submit"
          disabled={loading}
          style={{ width: "100%" }}
        >
          {loading
  ? "Creating..."
  : userType === "creator"
    ? "Create Creator Account"
    : "Create Advertiser Account"}
        </button>

      </form>

      {error && (
        <p style={{ color: "red", marginTop: 20 }}>
          {error}
        </p>
      )}

    </div>

  );

}