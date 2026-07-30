import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../../api/api";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      const token = res.data.data.token;
const user = res.data.data.user;
const supabaseSession = res.data.data.supabaseSession;

login(token, user, supabaseSession);

      navigate("/");

    } catch (err) {

      console.error(err);

      setError(
        err.response?.data?.message || "Login failed."
      );

    } finally {

      setLoading(false);

    }
  }

  return (
    <div style={{ maxWidth: 400, margin: "80px auto" }}>
      <h2>PostMarket Login</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", marginBottom: 12 }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", marginBottom: 12 }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{ width: "100%" }}
        >
          {loading ? "Signing in..." : "Login"}
        </button>

      </form>

      {error && (
        <p style={{ color: "red", marginTop: 20 }}>
          {error}
        </p>
      )}

<div style={{ marginTop: 20, textAlign: "center" }}>
  <Link to="/signup">
    Create a new account
  </Link>
</div>
    </div>
  );
}