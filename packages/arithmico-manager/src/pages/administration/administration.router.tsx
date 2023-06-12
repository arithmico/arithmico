import { Route, Routes } from "react-router-dom";
import { PageWithNavbar } from "../../components/page-with-navbar/page-with-navbar";
import { SecurityPoliciesRouter } from "./pages/security-policies/security-policies.router";
import { UserGroupsRouter } from "./pages/user-groups/user-groups.router";
import SecurityPage from "./security.page";

export function AdministrationRouter() {
  return (
    <PageWithNavbar>
      <Routes>
        <Route index element={<SecurityPage />} />
        <Route
          path="security-policies/*"
          element={<SecurityPoliciesRouter />}
        />
        <Route path="user-groups/*" element={<UserGroupsRouter />} />
      </Routes>
    </PageWithNavbar>
  );
}
