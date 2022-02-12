import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Calculator from './pages/calculator/calculator';
import Navbar from './components/navbar/navbar';
import Settings from './pages/settings/settings';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Calculator />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
