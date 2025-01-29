import { Account } from "~/components/organisms/dashboard/Account";
import { ProtectedRoute } from "~/guards/ProtectedRoute";


export default function AccountPage() {
  return (
    <ProtectedRoute>
      <Account />
    </ProtectedRoute>
  );
}
