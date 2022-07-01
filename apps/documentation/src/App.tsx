import React from "react";
import styled, { ThemeProvider } from "styled-components";
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
import GlobalStyle from "@components/global-styles/global-styles";

const Container = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
`;

function App() {
  return (
    <ThemeProvider theme={{ type: "light" }}>
      <GlobalStyle boldFont={false} fontSize="normal" />
      <Container>
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
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
