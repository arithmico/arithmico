import { IntlProvider } from "react-intl";
import { Route, Routes } from "react-router-dom";
import { messages } from "./locales";
import Home from "./pages/home/home";
import { LoginRouter } from "./pages/login/login.router";
import { MailsRouter } from "./pages/mails/mails.router";
import { AdministrationRouter } from "./pages/administration/administration.router";
import { UsersRouter } from "./pages/users/users.router";
import { VersionsRouter } from "./pages/versions/versions.router";

function App() {
  return (
    <IntlProvider messages={messages["de"]} locale="de" defaultLocale="de">
      <Routes>
        <Route index element={<Home />} />
        <Route path="login/*" element={<LoginRouter />} />
        <Route path="users/*" element={<UsersRouter />} />
        <Route path="administration/*" element={<AdministrationRouter />} />
        <Route path="mails/*" element={<MailsRouter />} />
        <Route path="versions/*" element={<VersionsRouter />} />
      </Routes>
    </IntlProvider>
  );
}

export default App;
