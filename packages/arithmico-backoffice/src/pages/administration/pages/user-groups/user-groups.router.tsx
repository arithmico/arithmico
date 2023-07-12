import { Route, Routes } from "react-router-dom";
import { CreateUserGroupRouter } from "./pages/create-user-group/create-user-group.router";
import { DeleteUserGroupRouter } from "./pages/delete-user-group/delete-user-group.router";
import { RenameUserGroupRouter } from "./pages/rename-user-group/rename-user-group.router";
import { UserGroupDetailsPage } from "./pages/user-group-details/user-group-details.page";
import { UserGroupsPage } from "./user-groups.page";

export function UserGroupsRouter() {
  return (
    <Routes>
      <Route index element={<UserGroupsPage />} />
      <Route path="new/*" element={<CreateUserGroupRouter />} />
      <Route path=":groupId" element={<UserGroupDetailsPage />} />
      <Route path=":groupId/rename/*" element={<RenameUserGroupRouter />} />
      <Route path=":groupId/delete/*" element={<DeleteUserGroupRouter />} />
    </Routes>
  );
}
