import { Route, Routes } from "react-router-dom";
import { CreateUserGroupPage } from "./pages/create-user-group/create-user-group.page";
import { UserGroupsPage } from "./user-groups.page";

export function UserGroupsRouter() {
  return (
    <Routes>
      <Route index element={<UserGroupsPage />} />
      <Route path="new" element={<CreateUserGroupPage />} />
    </Routes>
  );
}
