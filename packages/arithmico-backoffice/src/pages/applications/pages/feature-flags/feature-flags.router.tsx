import { Route, Routes } from "react-router-dom";
import { FeatureFlagsPage } from "./feature-flags.page";
import { FeatureFlagDetailsPage } from "./pages/feature-flag-details/feature-flag-details.page";

export function FeatureFlagsRouter() {
  return (
    <Routes>
      <Route index element={<FeatureFlagsPage />} />
      <Route path=":flagId" element={<FeatureFlagDetailsPage />} />
    </Routes>
  );
}
