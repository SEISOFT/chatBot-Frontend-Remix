import { MyProfile } from "~/components/organisms/dashboard/MyProfile";
import { ProtectedRoute } from "~/guards/ProtectedRoute";


export default function AccountPage() {
  return (
    <ProtectedRoute>
      <MyProfile />
    </ProtectedRoute>
  );
}
