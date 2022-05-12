import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'overlayscrollbars/css/OverlayScrollbars.css';
import OverlayScrollbars from 'overlayscrollbars';
import '@fontsource/roboto';
import '@fontsource/source-code-pro';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

OverlayScrollbars(document.body, {
  nativeScrollbarsOverlaid: {
    showNativeScrollbars: false
  }
});
