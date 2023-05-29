import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import { LoginPage } from "./pages/login/login.page";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
