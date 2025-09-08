import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { LoadingComponent } from "./utilities/UI/loading.ui";
import ScrollToTop from "./components/ScrollUpComponent/scrollup.component";

// Lazy-loaded pages
const AdminSubscriptionPage = lazy(() => import("./pages/dashboard/admin/subscription.page"));
const HomePage = lazy(() => import("./pages/landingPage/landingPage"));
const SignupPage = lazy(() => import("./pages/auth/signup"));
const OnboardingPage = lazy(() => import("./pages/onboarding/onboarding.page"));
const LoginPage = lazy(() => import("./pages/auth/login"));
const OtpFlowPage = lazy(() => import("./pages/auth/otp"));
const AdminManageUsersPage = lazy(
  () => import("./pages/dashboard/admin/manage.users.page")
);
const AdminEmailCampaignPage = lazy(
  () => import("./pages/dashboard/admin/email.campaign.page")
);
const ProfilePage = lazy(
  () => import("./pages/dashboard/user/profile/profile")
);
const ProfileSecurityPage = lazy(
  () => import("./pages/dashboard/user/profile/profile.security")
);

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<LoadingComponent />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/dashboard/subscription"
              element={<AdminSubscriptionPage />}
            />
          
            <Route
              path="/dashboard/userManagement"
              element={<AdminManageUsersPage />}
            />
            
            <Route
              path="/dashboard/email"
              element={<AdminEmailCampaignPage />}
            />
            
          
            <Route
              path="/dashboard/profile"
              element={<ProfilePage />}
            />
            
            <Route
              path="/dashboard/profile/security"
              element={<ProfileSecurityPage />}
            />
            
            <Route
              path="/auth/register"
              element={<SignupPage />}
            />
            <Route
              path="/onboarding"
              element={<OnboardingPage />}
            />
            <Route
              path="/auth/login"
              element={<LoginPage />}
            />
            <Route
              path="/auth/otp"
              element={<OtpFlowPage />}
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
