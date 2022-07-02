import React, { useEffect } from "react";
import { Route, BrowserRouter, HashRouter, Routes } from "react-router-dom";
import i18n from "./i18n/index";
import Calculator from "./pages/calculator/calculator";
import HeaderNavBar from "@components/header-nav-bar/header-nav-bar";
import Settings from "./pages/settings/settings";
import Manual from "./pages/manual/manual";
import About from "./pages/about/about";
import Protocol from "./pages/protocol/protocol";
import GlobalStyle from "@components/global-styles/global-styles";
import useSessionStore from "./stores/session-store/use-session-store";
import { ThemeProvider } from "styled-components";
import Definitions from "./pages/definitions/definitions";
import TermsOfService from "./pages/terms-of-service/terms-of-service";
import PrivacyPolicy from "./pages/privacy-policy/privacy-policy";
import ImprintContent from "@components/imprint-content/imprint-content";
import { useTranslation } from "react-i18next";

const Router = process.env.REACT_APP_OFFLINE_MODE ? HashRouter : BrowserRouter;

function App() {
  const fontSize = useSessionStore((state) => state.settings.interfaceFontSize);
  const theme = useSessionStore((state) => state.settings.theme);
  const language = useSessionStore((state) => state.settings.language);
  const boldFont = useSessionStore((state) => state.settings.boldFont);
  const [t] = useTranslation();

  useEffect(() => {
    if (language && i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language]);

  return (
    <ThemeProvider theme={{ type: theme }}>
      <Router>
        <GlobalStyle fontSize={fontSize} boldFont={boldFont} />
        <HeaderNavBar
          title="Arithmico"
          subTitle="Calc"
          items={[
            {
              name: t("nav.calculator"),
              path: "/",
            },
            {
              name: t("nav.settings"),
              path: "/settings",
            },
            {
              name: t("nav.manual"),
              path: "/manual",
            },
            {
              name: t("nav.about"),
              path: "/about",
            },
          ]}
        />
        <Routes>
          <Route path="/" element={<Calculator />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/manual" element={<Manual />} />
          <Route path="/about" element={<About />} />
          <Route path="/protocol" element={<Protocol />} />
          <Route path="/definitions" element={<Definitions />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/imprint" element={<ImprintContent />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
