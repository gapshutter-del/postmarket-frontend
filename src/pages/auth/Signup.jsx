import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../api/api";

export default function Signup() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    type: "creator",
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

      await api.post("/auth/signup", form);

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

      <h2>Create Account</h2>

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

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: 20 }}
        >
          <option value="creator">
            Creator
          </option>

          <option value="advertiser">
            Advertiser
          </option>
        </select>

        <button
          type="submit"
          disabled={loading}
          style={{ width: "100%" }}
        >
          {loading ? "Creating..." : "Create Account"}
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