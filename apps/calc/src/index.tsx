import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "overlayscrollbars/css/OverlayScrollbars.css";
import OverlayScrollbars from "overlayscrollbars";
import "./index.css";
import { Provider } from "react-redux";
import calculatorStore from "@stores/calculator-store";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";

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
