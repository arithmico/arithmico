import { Route, Routes } from "react-router-dom";
import { ConfigurationDetailsPage } from "./configuration-details.page";
import { RevisionDetailsPage } from "./pages/revisions-details/revisions-details.page";

export function ConfigurationDetailsRouter() {
  return (
    <Routes>
      <Route index element={<ConfigurationDetailsPage />} />
      <Route path="revisions/:revisionId" element={<RevisionDetailsPage />} />
    </Routes>
  );
}
