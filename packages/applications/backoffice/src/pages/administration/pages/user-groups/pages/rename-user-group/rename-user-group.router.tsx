import { Route, Routes } from "react-router-dom";
import { ErrorCard } from "../../../../../../components/error-card/error-card";
import { RenameUserGroupPage } from "./rename-user-group.page";

export function RenameUserGroupRouter() {
  return (
    <Routes>
      <Route index element={<RenameUserGroupPage />} />
      <Route path="failure" element={<ErrorCard />} />
    </Routes>
  );
}
