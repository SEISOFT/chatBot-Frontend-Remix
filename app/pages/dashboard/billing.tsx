import { Billing } from "~/components/organisms/dashboard/Billing";
import { ProtectedRoute } from "~/guards/ProtectedRoute";


export default function AccountPage() {
  return (
    <ProtectedRoute>
      <Billing />
    </ProtectedRoute>
  );
}
