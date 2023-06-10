import { Route, Routes } from "react-router-dom";
import { UserGroupsPage } from "./user-groups.page";

export function UserGroupsRouter() {
  return (
    <Routes>
      <Route index element={<UserGroupsPage />} />
    </Routes>
  );
}
