import React, { useEffect } from "react";
import { Route, BrowserRouter, HashRouter, Routes } from "react-router-dom";
import i18n from "./i18n/index";
import Calculator from "./pages/calculator/calculator";
import Navbar from "./components/navbar/navbar";
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

const Router = process.env.REACT_APP_OFFLINE_MODE ? HashRouter : BrowserRouter;

function App() {
  const fontSize = useSessionStore((state) => state.settings.interfaceFontSize);
  const theme = useSessionStore((state) => state.settings.theme);
  const language = useSessionStore((state) => state.settings.language);
  const boldFont = useSessionStore((state) => state.settings.boldFont);

  useEffect(() => {
    if (language && i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language]);

  return (
    <ThemeProvider theme={{ type: theme }}>
      <Router>
        <GlobalStyle fontSize={fontSize} boldFont={boldFont} />
        <Navbar />
        <Routes>
          <Route path="/" element={<Calculator />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/manual" element={<Manual />} />
          <Route path="/about" element={<About />} />
          <Route path="/protocol" element={<Protocol />} />
          <Route path="/definitions" element={<Definitions />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
