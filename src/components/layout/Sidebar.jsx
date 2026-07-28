import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {
  const { user } = useAuth();

  return (
    <aside
      style={{
        width: 250,
        background: "#111827",
        color: "white",
        padding: 20,
      }}
    >
      <h2>PostMarket</h2>

      <p>{user?.name}</p>
      <p>{user?.type}</p>

      <hr />

      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <Link to="/dashboard">Dashboard</Link>
      </nav>
    </aside>
  );
}