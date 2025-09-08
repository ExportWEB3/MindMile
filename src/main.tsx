import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "remixicon/fonts/remixicon.css";
import relativeTime from "dayjs/plugin/relativeTime.js";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import { StoreComponent } from "./store/store.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.extend(isSameOrBefore);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <StoreComponent>
        <App />
      </StoreComponent>
    </GoogleOAuthProvider>
  </StrictMode>
);
