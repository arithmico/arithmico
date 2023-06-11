import { Route, Routes } from "react-router-dom";
import { ErrorCard } from "../../../../../../components/error-card/error-card";
import { CreateUserGroupPage } from "./create-user-group.page";

export function CreateUserGroupRouter() {
  return (
    <Routes>
      <Route index element={<CreateUserGroupPage />} />
      <Route path="failure" element={<ErrorCard />} />
    </Routes>
  );
}
