import { Route, Routes } from "react-router-dom";
import { PageWithNavbar } from "../../components/page-with-navbar/page-with-navbar";
import MailsPage from "./mails.page";

export function MailsRouter() {
  return (
    <PageWithNavbar>
      <Routes>
        <Route index element={<MailsPage />} />
      </Routes>
    </PageWithNavbar>
  );
}
