import { IntlProvider } from "react-intl";
import { Route, Routes } from "react-router-dom";
import { messages } from "./locales";
import Home from "./pages/home/home";
import { LoginPage } from "./pages/login/login.page";

function App() {
  return (
    <IntlProvider messages={messages["de"]} locale="de" defaultLocale="de">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </IntlProvider>
  );
}

export default App;
