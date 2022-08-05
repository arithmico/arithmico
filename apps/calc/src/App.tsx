import React, { useEffect } from "react";
import { BrowserRouter, HashRouter } from "react-router-dom";
import i18n from "./i18n/index";
import { ThemeProvider } from "styled-components";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import HeaderNavBar from "@components/header-nav-bar/header-nav-bar";
import GlobalStyle from "@components/global-styles/global-styles";
import AppRoutes from "@local-components/app-routes/app-routes";
import {
  selectBoldFont,
  selectFontSize,
  selectLanguage,
  selectTheme,
} from "@stores/calculator-selectors";

const Router = process.env.REACT_APP_OFFLINE_MODE ? HashRouter : BrowserRouter;

function App() {
  const fontSize = useSelector(selectFontSize);
  const theme = useSelector(selectTheme);
  const language = useSelector(selectLanguage);
  const boldFont = useSelector(selectBoldFont);
  const [t] = useTranslation();

  useEffect(() => {
    if (language && i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language]);

  return (
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
  );
}

export default App;
