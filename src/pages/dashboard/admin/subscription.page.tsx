import { SubscriptionAdminComponent } from "../../../components/dashboard/admin/subscription/subscription.admin";
import { ProtectedLayout } from "../../../components/layouts/protected";

export default function AdminSubscriptionPage() {
  return (
    <>
      <ProtectedLayout title="Dashboard Admin" description="Welcome">
        <SubscriptionAdminComponent />
      </ProtectedLayout>
    </>
  );
}
