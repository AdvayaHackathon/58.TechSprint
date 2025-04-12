
import { DashboardStats } from "@/components/Dashboard/DashboardStats";
import { Layout } from "@/components/Layout/Layout";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const DashboardPage = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[50vh]">
          <div className="animate-spin">⏳</div>
          <span className="ml-2">Loading...</span>
        </div>
      </Layout>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        <DashboardStats />
      </div>
    </Layout>
  );
};

export default DashboardPage;
