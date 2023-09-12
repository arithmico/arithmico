import { Route, Routes } from "react-router-dom";
import { DownloadsPage } from "./downloads.page";
import { ConfigurationDetailsPage } from "./pages/configuration-details/configuration-details.page";

export default function DownloadsRouter() {
  return (
    <Routes>
      <Route index element={<DownloadsPage />} />
      <Route path=":configurationId" element={<ConfigurationDetailsPage />} />
    </Routes>
  );
}
