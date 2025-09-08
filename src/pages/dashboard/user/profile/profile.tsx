import { UnprotectedLayout } from "../../../../components/layouts/unprotected";
import { ProfileComponent } from "../../../../components/dashboard/user/profile/profile";

export default function ProfilePage() {
  return (
    <>
      <UnprotectedLayout title='Register' description="Profile">
        <ProfileComponent />
      </UnprotectedLayout>
    </>
  );
}
