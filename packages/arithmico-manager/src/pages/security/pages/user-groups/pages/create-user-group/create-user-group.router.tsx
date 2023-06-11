import { Route, Routes } from "react-router-dom";
import { CreateUserGroupFailurePage } from "./create-user-group-failure.page";
import { CreateUserGroupPage } from "./create-user-group.page";

export function CreateUserGroupRouter() {
  return (
    <Routes>
      <Route index element={<CreateUserGroupPage />} />
      <Route path="failure" element={<CreateUserGroupFailurePage />} />
    </Routes>
  );
}
