import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "overlayscrollbars/css/OverlayScrollbars.css";
import OverlayScrollbars from "overlayscrollbars";
import "@fontsource/roboto/100.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/source-code-pro";
import "./index.css";
import { init } from "@arithmico/engine";
import { Provider } from "react-redux";
import calculatorStore from "@stores/calculator-store";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import defaultProfile from "@stores/profile";
import { createOptions } from "@arithmico/engine/lib/utils/context-utils";

init({
  loadingMode: defaultProfile.loadingMode,
  loadingList: defaultProfile.loadingList,
  options: createOptions(),
});

const persistor = persistStore(calculatorStore);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={calculatorStore}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

OverlayScrollbars(document.body, {
  nativeScrollbarsOverlaid: {
    showNativeScrollbars: false,
  },
});
