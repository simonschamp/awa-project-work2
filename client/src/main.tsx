import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
//import './index.css'
import App from "./App.tsx";
import { ErrorBoundary } from "react-error-boundary";
import ErrorBoundaryPage from "./components/ErrorBoundaryPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={ErrorBoundaryPage}>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
