import "@fontsource/roboto/100.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/home/home";

function App() {
  return (
    <div className="absolute w-full h-full bg-zinc-900 overflow-y-auto">
      <Header />
      <div className="flex w-full justify-center">
        <main className="w-3/5">
          <Routes>
            <Route index path="/" element={<Home />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
