import { Route, Routes } from "react-router-dom";
import { UsersPage } from "./users.page";

export function UsersRouter() {
  return (
    <Routes>
      <Route index element={<UsersPage />} />
    </Routes>
  );
}
