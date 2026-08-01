import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {
  const { user } = useAuth();

  return (
    <aside
      style={{
        width: 280,
  background: "#F2ECE3",
  borderRight: "1px solid #E2D8CA",
  color: "#3D3027",
  padding: "42px 28px"
      }}
    >
      <h1
  style={{
    fontFamily: "'Playfair Display', serif",
    fontSize: 34,
    margin: 0,
    color: "#35281F",
  }}
>
  PostMarket
</h1>

<p
  style={{
    marginTop: 36,
    marginBottom: 6,
    fontSize: 12,
    letterSpacing: ".18em",
    textTransform: "uppercase",
    color: "#A56A43",
  }}
>
  Creator Edition
</p>

<h3
  style={{
    fontFamily: "'Playfair Display', serif",
    marginTop: 0,
    marginBottom: 28,
    fontWeight: 500,
  }}
>
  Contents
</h3>

<nav
  style={{
    display: "flex",
    flexDirection: "column",
    gap: 18,
  }}
>
  <Link
  to="/creator/dashboard"
  style={{
    color: "#4C3A2D",
    textDecoration: "none",
    fontFamily: "Inter, sans-serif",
    fontSize: 15,
    letterSpacing: ".02em",
    padding: "6px 0",
  }}
>
  01 — Dashboard
</Link>

<Link
  to="/creator/profile"
  style={{
    color: "#4C3A2D",
    textDecoration: "none",
    fontFamily: "Inter, sans-serif",
    fontSize: 15,
    letterSpacing: ".02em",
    padding: "6px 0",
  }}
>
  02 — Profile
</Link>

<Link
  to="/creator/media-kit"
  style={{
    color: "#4C3A2D",
    textDecoration: "none",
    fontFamily: "Inter, sans-serif",
    fontSize: 15,
    letterSpacing: ".02em",
    padding: "6px 0",
  }}
>
  03 — Media Kit
</Link>

<Link
  to="/bookings"
  style={{
    color: "#4C3A2D",
    textDecoration: "none",
    fontFamily: "Inter, sans-serif",
    fontSize: 15,
    letterSpacing: ".02em",
    padding: "6px 0",
  }}
>
  04 — Bookings
</Link>
 
</nav>
    </aside>
  );
}