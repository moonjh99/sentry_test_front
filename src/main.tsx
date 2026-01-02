import { createRoot } from "react-dom/client";
import "./index.css";
import * as Sentry from "@sentry/react";
import "./sentry";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <Sentry.ErrorBoundary fallback={<div>에러 발생</div>}>
    <App />
  </Sentry.ErrorBoundary>
);
