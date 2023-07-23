import { Route, Routes } from "react-router-dom";
import { ConfigurationsPage } from "./configurations.page";
import { ConfigurationDetailsRouter } from "./pages/configuration-details/configuration-details.router";

export function ConfigurationsRouter() {
  return (
    <Routes>
      <Route index element={<ConfigurationsPage />} />
      <Route
        path=":configurationId/*"
        element={<ConfigurationDetailsRouter />}
      />
    </Routes>
  );
}
