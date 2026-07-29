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

  {user?.type === "creator" && (
    <>
      <Link to="/creator/profile">Creator Profile</Link>
      <Link to="/creator/media-kit">Media Kit</Link>
      <Link to="/bookings">Bookings</Link>
    </>
  )}

  {user?.type === "advertiser" && (
    <>
      <Link to="/campaigns">Campaigns</Link>
    </>
  )}
</nav>
    </aside>
  );
}