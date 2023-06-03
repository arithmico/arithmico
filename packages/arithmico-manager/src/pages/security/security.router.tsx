import { Route, Routes } from "react-router-dom";
import { PageWithNavbar } from "../../components/page-with-navbar/page-with-navbar";
import { SecurityPoliciesPage } from "./pages/security-policies/security-policies.page";
import { SecurityPolicyDetails } from "./pages/security-policy-details/security-policy-details.page";
import SecurityPage from "./pages/security/security.page";

export function SecurityRouter() {
  return (
    <PageWithNavbar>
      <Routes>
        <Route index element={<SecurityPage />} />
        <Route path="security-policies" element={<SecurityPoliciesPage />} />
        <Route
          path="security-policies/:policyId"
          element={<SecurityPolicyDetails />}
        />
      </Routes>
    </PageWithNavbar>
  );
}
