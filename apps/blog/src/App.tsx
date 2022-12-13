import "@fontsource/roboto/100.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/header";
import useScrollTop from "./hooks/use-scroll-top";
import Home from "./pages/home/home";
import Imprint from "./pages/imprint/imprint";
import Releases from "./pages/releases/releases";

function App() {
  useScrollTop();

  return (
    <>
      <div className="flex flex-col items-center fixed inset-0 bg-black">
        <div className="w-full max-w-7xl bg-zinc-900 h-full px-32 ring-zinc-300/20"></div>
      </div>
      <div className="absolute flex flex-col w-full h-full overflow-y-auto overflow-x-hidden items-center">
        <div className="w-full max-w-7xl px-32 text-white">
          <div
            aria-hidden
            id="scroll-anchor"
            className="absolute w-0 h-0 opacity-0"
          ></div>
          <Header />
          <div className="flex align-center ">
            <main className=" ">
              <Routes>
                <Route index path="/" element={<Home />} />
                <Route path="/releases/*" element={<Releases />} />
                <Route path="/imprint" element={<Imprint />} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
