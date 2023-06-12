import { Route, Routes } from "react-router-dom";
import { ErrorCard } from "../../../../../../components/error-card/error-card";
import { DeleteUserGroupPage } from "./delete-user-group.page";

export function DeleteUserGroupRouter() {
  return (
    <Routes>
      <Route index element={<DeleteUserGroupPage />} />
      <Route path="failure" element={<ErrorCard />} />
    </Routes>
  );
}
