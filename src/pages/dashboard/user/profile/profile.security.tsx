import { UnprotectedLayout } from "../../../../components/layouts/unprotected";
import { ProfileSecurityComponent } from "../../../../components/dashboard/user/profile/security.profile";

export default function ProfileSecurityPage() {
  return (
    <>
      <UnprotectedLayout title='Settings' description="Profile Security">
        <ProfileSecurityComponent />
      </UnprotectedLayout>
    </>
  );
}
