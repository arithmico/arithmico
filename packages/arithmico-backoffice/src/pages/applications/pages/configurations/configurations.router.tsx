import { Route, Routes } from "react-router-dom";
import { ConfigurationsPage } from "./configurations.page";
import { ConfigurationDetailsPage } from "./pages/configuration-details/configuration-details.page";

export function ConfigurationsRouter() {
  return (
    <Routes>
      <Route index element={<ConfigurationsPage />} />
      <Route path=":configurationId" element={<ConfigurationDetailsPage />} />
    </Routes>
  );
}
