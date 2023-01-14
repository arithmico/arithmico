import React from "react";
import "./App.css";
import "@fontsource/roboto/100.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Chapter from "./pages/chapter/chapter";
import Page from "./components/page/page";
import { Route, Routes } from "react-router-dom";
import chaptersDe from "./chapters";
import Imprint from "./pages/imprint/imprint";
import { MathJaxContext } from "better-react-mathjax";

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
      <div className="absolute h-full w-full">
        <Routes>
          <Route path="/" element={<Page>Wilkommen</Page>} />
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
