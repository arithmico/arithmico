import { Route, Routes } from "react-router-dom";
import { PageWithNavbar } from "../../components/page-with-navbar/page-with-navbar";
import { SecurityPoliciesPage } from "./pages/security-policies/security-policies.page";
import { SecurityPolicyDetailsPage } from "./pages/security-policy-details/security-policy-details.page";
import { SecurityPolicyEditAttributesPage } from "./pages/security-policy-edit-attributes/security-policy-edit-attributes.page";
import { SecurityPolicyRenamePage } from "./pages/security-policy-rename/security-policy-rename.page";
import SecurityPage from "./pages/security/security.page";

export function SecurityRouter() {
  return (
    <PageWithNavbar>
      <Routes>
        <Route index element={<SecurityPage />} />
        <Route path="security-policies" element={<SecurityPoliciesPage />} />
        <Route
          path="security-policies/:policyId"
          element={<SecurityPolicyDetailsPage />}
        />
        <Route
          path="security-policies/:policyId/attributes"
          element={<SecurityPolicyEditAttributesPage />}
        />
        <Route
          path="security-policies/:policyId/rename"
          element={<SecurityPolicyRenamePage />}
        />
      </Routes>
    </PageWithNavbar>
  );
}
