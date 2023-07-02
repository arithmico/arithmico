import { Route, Routes } from "react-router-dom";
import { PageWithNavbar } from "../../components/page-with-navbar/page-with-navbar";
import { FeatureFlagsPage } from "./pages/feature-flags/feature-flags.page";
import { VersionTagsPage } from "./pages/version-tags/version-tags.page";
import ApplicationsPage from "./applications.page";

export function ApplicationsRouter() {
  return (
    <PageWithNavbar>
      <Routes>
        <Route index element={<ApplicationsPage />} />
        <Route path="version-tags" element={<VersionTagsPage />} />
        <Route path="feature-flags" element={<FeatureFlagsPage />} />
      </Routes>
    </PageWithNavbar>
  );
}
