import { Route, Routes } from "react-router-dom";
import { VersionTagsPage } from "./version-tags.page";

export function VersionTagsRouter() {
  return (
    <Routes>
      <Route index element={<VersionTagsPage />} />
    </Routes>
  );
}
