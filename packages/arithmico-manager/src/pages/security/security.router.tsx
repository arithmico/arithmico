import { Route, Routes } from "react-router-dom";
import { PageWithNavbar } from "../../components/page-with-navbar/page-with-navbar";
import { SecurityPolicyDetails } from "./pages/security-policy-details/security-policy-details.page";
import SecurityPage from "./pages/security/security.page";

export function SecurityRouter() {
  return (
    <PageWithNavbar>
      <Routes>
        <Route index element={<SecurityPage />} />
        <Route
          path="security-policies/:policyId"
          element={<SecurityPolicyDetails />}
        />
      </Routes>
    </PageWithNavbar>
  );
}
