import React from "react";
import "./App.css";
import "@fontsource/roboto/100.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Chapter from "./pages/chapter/chapter";
import { Route, Routes } from "react-router-dom";
import chaptersDe from "./chapters";
import Imprint from "./pages/imprint/imprint";
import { MathJaxContext } from "better-react-mathjax";
import classNames from "classnames";
import PageContainer from "./components/page-container/page-container";
import Navbar from "./components/navbar/navbar";

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
          <Route path="/" element={<PageContainer>Wilkommen</PageContainer>} />
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
    </MathJaxContext>
  );
}

export default App;
