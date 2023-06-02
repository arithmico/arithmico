import { Route, Routes } from "react-router-dom";
import { PageWithNavbar } from "../../components/page-with-navbar/page-with-navbar";
import SecurityPage from "./pages/security.page";

export function SecurityRouter() {
  return (
    <PageWithNavbar>
      <Routes>
        <Route index element={<SecurityPage />} />
      </Routes>
    </PageWithNavbar>
  );
}
