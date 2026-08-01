import CreatorDashboard from "./creator/Dashboard";
import AdvertiserDashboard from "./advertiser/Dashboard";

import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) {
    return <p>Loading...</p>;
  }

  switch (user.type) {
    case "creator":
      return <CreatorDashboard />;

    case "advertiser":
      return <AdvertiserDashboard />;

    default:
      return (
        <div style={{ padding: 40 }}>
          Unknown account type: {user.type}
        </div>
      );
  }
}