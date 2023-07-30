import { useEffect } from "react";
import { BrowserRouter, HashRouter } from "react-router-dom";
import i18n from "./i18n/index";
import { useSelector } from "react-redux";
import AppRoutes from "@local-components/app-routes/app-routes";
import Navbar from "./components/navbar/navbar";
import classNames from "classnames";
import { CalculatorRootState } from "./store/store";

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
    (
      document.getElementById("root") as HTMLElement
    ).className = `theme-${theme}`;
  }, [theme]);

  useEffect(() => {
    if (fontSize === "small") {
      document.documentElement.style.fontSize = "10px";
    } else if (fontSize === "medium") {
      document.documentElement.style.fontSize = "16px";
    } else if (fontSize === "large") {
      document.documentElement.style.fontSize = "20px";
    }
  }, [fontSize]);

  useEffect(() => {
    if (language && i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language]);

  return (
    <div
      className={classNames(
        { "bold-font": boldFont },
        "theme-dark:bg-neutral-900",
        "theme-dark:text-white",
        "theme-light:bg-white",
        "theme-light:text-black",
        "absolute",
        "inset-0",
        "grid",
        "lg:grid-rows-[5rem_1fr]",
        "grid-rows-[3rem_1fr]"
      )}
    >
      <Router>
        <Navbar />
        <AppRoutes />
      </Router>
    </div>
  );
}

export default App;
