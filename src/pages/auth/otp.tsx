import { OtpIndexComponent } from "../../components/auth/otpAuthFlow/index.otp";
import { UnprotectedLayout } from "../../components/layouts/unprotected";

export default function OtpFlowPage() {
  return (
    <>
      <UnprotectedLayout
        title='Login'
        description="MIT Subscription platform"
      >
        <OtpIndexComponent />
      </UnprotectedLayout>
    </>
  );
}
