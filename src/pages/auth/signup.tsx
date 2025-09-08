import { SignupComponent } from "../../components/auth/signup.auth";
import { UnprotectedLayout } from "../../components/layouts/unprotected";

export default function SignupPage() {
  return (
    <>
      <UnprotectedLayout
        title="Register"
        description="MIT Subscription platform"
      >
        <SignupComponent />
      </UnprotectedLayout>
    </>
  );
}
