import { Route, Routes } from "react-router-dom";
import { RenameUserGroupPage } from "./rename-user-group.page";

export function RenameUserGroupRouter() {
  return (
    <Routes>
      <Route index element={<RenameUserGroupPage />} />
    </Routes>
  );
}
