import React, { useEffect } from "react";
import { BrowserRouter, HashRouter } from "react-router-dom";
import i18n from "./i18n/index";
import { ThemeProvider } from "styled-components";
import { useSelector } from "react-redux";
import GlobalStyle from "@components/global-styles/global-styles";
import AppRoutes from "@local-components/app-routes/app-routes";
import AppHeaderNavBar from "@local-components/app-header-nav-bar/app-header-nav-bar";
import { CalculatorRootState } from "@stores/calculator-store";

const Router = import.meta.env.VITE_OFFLINE_MODE ? HashRouter : BrowserRouter;

function App() {
  const fontSize = useSelector(
    (state: CalculatorRootState) => state.settings.fontSize
  );
  const theme = useSelector(
    (state: CalculatorRootState) => state.settings.theme
  );
  const language = useSelector(
    (state: CalculatorRootState) => state.settings.language
  );
  const boldFont = useSelector(
    (state: CalculatorRootState) => state.settings.boldFont
  );

  useEffect(() => {
    if (language && i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language]);

  return (
    <ThemeProvider theme={{ type: theme }}>
      <GlobalStyle fontSize={fontSize} boldFont={boldFont} />
      <Router>
        <AppHeaderNavBar />
        <AppRoutes />
      </Router>
    </ThemeProvider>
  );
}

export default App;
