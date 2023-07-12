import { Route, Routes } from "react-router-dom";
import { ErrorCard } from "../../../../../../components/error-card/error-card";
import { CreateUserPage } from "./create-user.page";

export function CreateUserRouter() {
  return (
    <Routes>
      <Route index element={<CreateUserPage />} />
      <Route path="failure" element={<ErrorCard />} />
    </Routes>
  );
}
