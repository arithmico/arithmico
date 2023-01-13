import React from "react";
import "@fontsource/roboto/100.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import Imprint from "./pages/imprint/imprint";
import { Provider } from "react-redux";
import configStore from "@stores/config-store";
import classNames from "classnames";
import Navbar from "./components/navbar/navbar";

function App() {
  return (
    <Provider store={configStore}>
      <div className={classNames("absolute", "w-screen", "h-screen", "theme-light")}>
        <Navbar />
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/imprint" element={<Imprint />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
