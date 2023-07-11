import { Route, Routes } from "react-router-dom";
import { VersionTagDetailsPage } from "./pages/version-tag-details/version-tag-details.page";
import { VersionTagsPage } from "./version-tags.page";

export function VersionTagsRouter() {
  return (
    <Routes>
      <Route index element={<VersionTagsPage />} />
      <Route path=":tagId" element={<VersionTagDetailsPage />} />
    </Routes>
  );
}
