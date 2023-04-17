import "./App.css";
import Chapter from "./pages/chapter/chapter";
import { Route, Routes } from "react-router-dom";
import chaptersDe from "./chapters";
import Imprint from "./pages/imprint/imprint";
import { MathJaxContext } from "better-react-mathjax";
import classNames from "classnames";
import PageContainer from "./components/page-container/page-container";
import Navbar from "./components/navbar/navbar";
import WithScrollbars from "./components/with-scrollbars/with-scrollbars";
import Nav from "./components/nav/nav";

function App() {
  return (
    <MathJaxContext
      config={{
        tex: {
          inlineMath: [
            ["$", "$"],
            ["\\(", "\\)"],
          ],
        },
      }}
    >
      <div
        className={classNames(
          "bg-white",
          "text-black",
          "absolute",
          "inset-0",
          "grid",
          "grid-rows-[5rem_1fr]",
          "grid-cols-[1fr_3fr]",
          "gap-4",
          "overflow-hidden",
          "max-h-full",
          "box-border"
        )}
      >
        <Navbar />
        <Nav chapters={chaptersDe} />
        <div className={classNames("max-h-full", "overflow-y-scroll")}>
          <Routes>
            <Route
              path="/"
              element={
                <WithScrollbars>
                  <PageContainer>Wilkommen</PageContainer>
                </WithScrollbars>
              }
            />
            {chaptersDe.map((chapter, index) => (
              <Route
                key={index}
                path={`/chapters/${index}`}
                element={
                  <Chapter
                    contentUrl={chapter.url}
                    title={chapter.title}
                    nextChapter={
                      index < chaptersDe.length - 1 ? index + 1 : undefined
                    }
                    previousChapter={index > 0 ? index - 1 : undefined}
                  />
                }
              />
            ))}
            <Route path="/imprint" element={<Imprint />} />
          </Routes>
        </div>
      </div>
    </MathJaxContext>
  );
}

export default App;
