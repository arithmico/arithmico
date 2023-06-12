import { Route, Routes } from "react-router-dom";
import { PageWithNavbar } from "../../components/page-with-navbar/page-with-navbar";
import VersionsPage from "./versions.page";

export function VersionsRouter() {
  return (
    <PageWithNavbar>
      <Routes>
        <Route index element={<VersionsPage />} />
      </Routes>
    </PageWithNavbar>
  );
}
