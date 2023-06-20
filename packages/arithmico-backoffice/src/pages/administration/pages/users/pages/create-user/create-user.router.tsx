import { Route, Routes } from "react-router-dom";
import { CreateUserPage } from "./create-user.page";

export function CreateUserRouter() {
  return (
    <Routes>
      <Route index element={<CreateUserPage />} />
    </Routes>
  );
}
