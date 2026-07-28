import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/AuthContext";

export default function CreatorDashboard() {
  const { user } = useAuth();

  return (
    <Layout>
      <h1>Creator Dashboard</h1>

      <p>Welcome {user?.name}</p>

      <p>This will become the Creator workspace.</p>
    </Layout>
  );
}