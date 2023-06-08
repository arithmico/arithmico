import { Route, Routes } from "react-router-dom";
import { SecurityPolicyDetailsPage } from "./pages/security-policy-details/security-policy-details.page";
import { EditSecurityPolicyAttributesPage } from "./pages/edit-security-policy-attributes/edit-security-policy-attributes.page";
import { SecurityPolicyRenamePage } from "./pages/rename-security-policy/security-policy-rename.page";
import { SecurityPoliciesPage } from "./security-policies.page";

export function SecurityPoliciesRouter() {
  return (
    <Routes>
      <Route index element={<SecurityPoliciesPage />} />
      <Route path=":policyId" element={<SecurityPolicyDetailsPage />} />
      <Route path=":policyId/rename" element={<SecurityPolicyRenamePage />} />
      <Route
        path=":policyId/attributes"
        element={<EditSecurityPolicyAttributesPage />}
      />
    </Routes>
  );
}
