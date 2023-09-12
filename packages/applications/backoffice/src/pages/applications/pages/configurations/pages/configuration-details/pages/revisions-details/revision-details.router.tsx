import { Route, Routes } from "react-router-dom";
import { BuildJobDetailsPage } from "./pages/build-job-details/build-job-details.page";
import { RevisionDetailsPage } from "./revision-details.page";

export function RevisionDetailsRouter() {
  return (
    <Routes>
      <Route index element={<RevisionDetailsPage />} />
      <Route path="build-jobs/:buildJobId" element={<BuildJobDetailsPage />} />
    </Routes>
  );
}
