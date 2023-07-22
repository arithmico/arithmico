import { Route, Routes } from "react-router-dom";
import { ConfigurationsPage } from "./configurations.page";

export function ConfigurationsRouter() {
  return (
    <Routes>
      <Route index element={<ConfigurationsPage />} />
    </Routes>
  );
}
