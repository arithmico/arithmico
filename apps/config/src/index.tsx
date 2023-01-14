import React from "react";
import ReactDOM from "react-dom/client";
import "overlayscrollbars/css/OverlayScrollbars.css";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import OverlayScrollbars from "overlayscrollbars";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

OverlayScrollbars(document.body, {
  nativeScrollbarsOverlaid: {
    showNativeScrollbars: false,
  },
});
