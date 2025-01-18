import { ProtectedRoute } from "~/components/atoms/ProtectedRoute";
import { Dashboard } from "~/components/organisms/Dashboard";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
}
