import { IntlProvider } from "react-intl";
import { Route, Routes } from "react-router-dom";
import { messages } from "./locales";
import Home from "./pages/home/home";
import { LoginRouter } from "./pages/login/login.router";
import { MailsRouter } from "./pages/mails/mails.router";
import { AdministrationRouter } from "./pages/administration/administration.router";
import { ApplicationsRouter } from "./pages/applications/applications.router";
import { ActivateRouter } from "./pages/activate/activate.router";

function App() {
  return (
    <IntlProvider messages={messages["de"]} locale="de" defaultLocale="de">
      <Routes>
        <Route index element={<Home />} />
        <Route path="login/*" element={<LoginRouter />} />
        <Route path="administration/*" element={<AdministrationRouter />} />
        <Route path="mails/*" element={<MailsRouter />} />
        <Route path="applications/*" element={<ApplicationsRouter />} />
        <Route path="activate/*" element={<ActivateRouter />} />
      </Routes>
    </IntlProvider>
  );
}

export default App;
