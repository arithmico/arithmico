import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import Imprint from "./pages/imprint/imprint";
import classNames from "classnames";
import Navbar from "./components/navbar/navbar";

function App() {
  return (
    <div
      className={classNames(
        "absolute",
        "w-screen",
        "h-screen",
        "theme-light",
        "grid",
        "lg:grid-rows-[5rem_1fr]",
        "grid-rows-[3rem_1fr]"
      )}
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/imprint" element={<Imprint />} />
      </Routes>
    </div>
  );
}

export default App;
