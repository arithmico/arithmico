import React from "react";
import { ThemeProvider } from "styled-components";
import "@fontsource/roboto/100.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import GlobalStyle from "@components/global-styles/global-styles";
import Imprint from "./pages/imprint/imprint";
import { Provider } from "react-redux";
import configStore from "@stores/config-store";
import classNames from "classnames";

function App() {
  return (
    <Provider store={configStore}>
      <ThemeProvider theme={{ type: "light" }}>
        <GlobalStyle boldFont={false} fontSize="normal" />
        <div className={classNames("absolute", "w-screen", "h-screen")}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/imprint" element={<Imprint />} />
          </Routes>
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
