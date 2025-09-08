import { AdminEmailCampaign } from "../../../components/dashboard/admin/email/email.campaign.admin";
import { ProtectedLayout } from "../../../components/layouts/protected";

export default function AdminEmailCampaignPage() {
  return (
    <>
      <ProtectedLayout title="Dashboard Admin" description="Welcome">
        <AdminEmailCampaign />
      </ProtectedLayout>
    </>
  );
}
