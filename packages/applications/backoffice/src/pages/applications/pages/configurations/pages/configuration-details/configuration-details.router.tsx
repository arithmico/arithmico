import { Route, Routes } from "react-router-dom";
import { ConfigurationDetailsPage } from "./configuration-details.page";
import { RevisionDetailsRouter } from "./pages/revisions-details/revision-details.router";

export function ConfigurationDetailsRouter() {
  return (
    <Routes>
      <Route index element={<ConfigurationDetailsPage />} />
      <Route
        path="revisions/:revisionId/*"
        element={<RevisionDetailsRouter />}
      />
    </Routes>
  );
}
