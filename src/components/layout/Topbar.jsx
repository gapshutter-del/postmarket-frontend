import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Topbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header
      style={{
        background: "white",
        padding: 20,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <strong>Dashboard</strong>

      <button onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
}