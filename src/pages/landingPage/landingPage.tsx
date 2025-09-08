import { HomeComponent } from "../../components/landingPage/landingPage.component";
import { UnprotectedLayout } from "../../components/layouts/unprotected";

export default function HomePage() {
  return (
    <>
      <UnprotectedLayout title="Home" description="MIT Subscription platform">
        <HomeComponent />
      </UnprotectedLayout>
    </>
  );
}
