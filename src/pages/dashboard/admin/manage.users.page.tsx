import { AdminManageUsers } from "../../../components/dashboard/admin/users/manage.users.admin";
import { ProtectedLayout } from "../../../components/layouts/protected";

export default function AdminManageUsersPage() {
  return (
    <>
      <ProtectedLayout title="Dashboard Admin" description="Welcome">
        <AdminManageUsers />
      </ProtectedLayout>
    </>
  );
}
