import { Route, Routes } from "react-router-dom";
import Footer from "./components/footer";
import Header from "./components/header";
import useScrollTop from "./hooks/use-scroll-top";
import Articles from "./pages/articles/articles";
import Home from "./pages/home/home";
import Imprint from "./pages/imprint/imprint";
import Releases from "./pages/releases/releases";

function App() {
  useScrollTop();

  return (
    <>
      <div className="fixed inset-0 flex flex-col items-center bg-neutral-900/80">
        <div className="h-full w-full max-w-7xl border-x border-x-white/5 bg-neutral-900 px-32"></div>
      </div>
      <div className="absolute flex h-full w-full flex-col items-center overflow-y-auto overflow-x-hidden">
        <div className="w-full max-w-7xl px-32 text-white">
          <div
            aria-hidden
            id="scroll-anchor"
            className="absolute h-0 w-0 opacity-0"
          ></div>
          <Header />
          <div className="align-center mt-32 flex">
            <main className=" ">
              <Routes>
                <Route index path="/" element={<Home />} />
                <Route path="/articles/*" element={<Articles />} />
                <Route path="/releases/*" element={<Releases />} />
                <Route path="/imprint" element={<Imprint />} />
              </Routes>
            </main>
          </div>
        </div>
        <div aria-hidden className="mt-auto"></div>
        <Footer />
      </div>
    </>
  );
}

export default App;
