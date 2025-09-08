import { LoginComponent } from "../../components/auth/login.auth";
import { UnprotectedLayout } from "../../components/layouts/unprotected";

export default function LoginPage() {
  return (
    <>
      <UnprotectedLayout
        title="Login"
        description="MIT Subscription platform"
      >
        <LoginComponent />
      </UnprotectedLayout>
    </>
  );
}
