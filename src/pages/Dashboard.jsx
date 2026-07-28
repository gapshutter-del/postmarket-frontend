import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return <p>Loading dashboard...</p>;
  }

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Dashboard</h1>

      <p>
        Welcome <strong>{user.name}</strong>
      </p>

      <p>Email: {user.email}</p>

      <p>Role: {user.type}</p>

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}