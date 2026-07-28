import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/AuthContext";

export default function AdvertiserDashboard() {
  const { user } = useAuth();

  return (
    <Layout>
      <h1>Advertiser Dashboard</h1>

      <p>Welcome {user?.name}</p>

      <p>This will become the Advertiser workspace.</p>
    </Layout>
  );
}