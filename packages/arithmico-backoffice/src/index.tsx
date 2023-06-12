import React from "react";
import ReactDOM from "react-dom/client";
import "overlayscrollbars/css/OverlayScrollbars.css";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import OverlayScrollbars from "overlayscrollbars";
import { Provider } from "react-redux";
import { store } from "./store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

OverlayScrollbars(document.body, {
  nativeScrollbarsOverlaid: {
    showNativeScrollbars: false,
  },
});
