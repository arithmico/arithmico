import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Calculator from './pages/calculator/calculator';
import Navbar from './components/navbar/navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Calculator />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
