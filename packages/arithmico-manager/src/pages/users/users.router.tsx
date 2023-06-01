import { Route, Routes } from "react-router-dom";
import { PageWithNavbar } from "../../components/page-with-navbar/page-with-navbar";
import UsersPage from "./users.page";

export function UsersRouter() {
  return (
    <PageWithNavbar>
      <Routes>
        <Route index element={<UsersPage />} />
      </Routes>
    </PageWithNavbar>
  );
}
