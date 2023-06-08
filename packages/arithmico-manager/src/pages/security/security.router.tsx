import { Route, Routes } from "react-router-dom";
import { PageWithNavbar } from "../../components/page-with-navbar/page-with-navbar";
import { SecurityPoliciesRouter } from "./pages/security-policies/security-policies.router";
import SecurityPage from "./security.page";

export function SecurityRouter() {
  return (
    <PageWithNavbar>
      <Routes>
        <Route index element={<SecurityPage />} />
        <Route path="security-policies" element={<SecurityPoliciesRouter />} />
      </Routes>
    </PageWithNavbar>
  );
}
