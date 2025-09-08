import { UnprotectedLayout } from "../../components/layouts/unprotected";
import { OnboardingScreenIndexComponent } from "../../components/onbaording/index.screen";

export default function OnboardingPage() {
  return (
    <>
      <UnprotectedLayout
        title="Onboarding"
        description="MIT Subscription platform"
      >
        <OnboardingScreenIndexComponent />
      </UnprotectedLayout>
    </>
  );
}
