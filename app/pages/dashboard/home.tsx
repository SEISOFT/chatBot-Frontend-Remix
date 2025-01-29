import { ProtectedRoute } from "~/guards/ProtectedRoute";
import { Dashboard } from "~/components/organisms/dashboard/Home";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
}
