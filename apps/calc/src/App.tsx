import React, { useEffect } from "react";
import { BrowserRouter, HashRouter } from "react-router-dom";
import i18n from "./i18n/index";
import HeaderNavBar from "@components/header-nav-bar/header-nav-bar";
import GlobalStyle from "@components/global-styles/global-styles";
import useSessionStore from "./stores/session-store/use-session-store";
import { ThemeProvider } from "styled-components";
import { useTranslation } from "react-i18next";
import { Provider } from "react-redux";
import calculatorStore from "@stores/calculator-store";
import AppRoutes from "./components/app-routes/app-routes";

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
    <Provider store={calculatorStore}>
      <ThemeProvider theme={{ type: theme }}>
        <GlobalStyle fontSize={fontSize} boldFont={boldFont} />
        <Router>
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
          <AppRoutes />
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
