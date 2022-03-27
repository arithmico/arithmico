import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Calculator from './pages/calculator/calculator';
import Navbar from './components/navbar/navbar';
import Settings from './pages/settings/settings';
import Manual from './pages/manual/manual';
import About from './pages/about/about';
import Protocol from './pages/protocol/protocol';
import GlobalStyle from './globalStyles';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle fontSize={'normal'} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Calculator />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/manual" element={<Manual />} />
        <Route path="/about" element={<About />} />
        <Route path="/protocol" element={<Protocol />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
