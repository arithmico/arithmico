import { Route, Routes } from "react-router-dom";
import { CreateUserRouter } from "./pages/create-user/create-user.router";
import { UsersPage } from "./users.page";

export function UsersRouter() {
  return (
    <Routes>
      <Route index element={<UsersPage />} />
      <Route path="new/*" element={<CreateUserRouter />} />
    </Routes>
  );
}
