import { IntlProvider } from "react-intl";
import { Route, Routes } from "react-router-dom";
import { messages } from "./locales";
import Home from "./pages/home/home";
import { LoginRouter } from "./pages/login/login.router";

function App() {
  return (
    <IntlProvider messages={messages["de"]} locale="de" defaultLocale="de">
      <Routes>
        <Route path="/login/*" element={<LoginRouter />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </IntlProvider>
  );
}

export default App;
