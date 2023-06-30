import { Route, Routes } from "react-router-dom";
import { PageWithNavbar } from "../../components/page-with-navbar/page-with-navbar";
import { VersionTagsPage } from "./pages/version-tags/version-tags.page";
import VersionsPage from "./versions.page";

export function VersionsRouter() {
  return (
    <PageWithNavbar>
      <Routes>
        <Route index element={<VersionsPage />} />
        <Route path="version-tags" element={<VersionTagsPage />} />
      </Routes>
    </PageWithNavbar>
  );
}
