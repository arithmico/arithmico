import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Markdown from "../../components/markdown/markdown";
import Page from "../../components/page/page";

const Toolbar = styled.div`
  display: flex;
  margin: 2rem 0;
`;

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
  background-color: rgba(0, 0, 0, 0.15);
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;

  &:hover {
    background-color: rgba(0, 0, 0, 0.25);
  }
`;

const RightLink = styled(StyledLink)`
  margin-left: auto;
`;

interface chapterProps {
  contentUrl: string;
  title: string;
  nextChapter?: number;
  previousChapter?: number;
}

export default function Chapter({
  contentUrl,
  title,
  nextChapter,
  previousChapter,
}: chapterProps) {
  const [content, setContent] = useState("");

  useEffect(() => {
    const url = `${window.location.protocol}//${window.location.hostname}:${window.location.port}${contentUrl}`;
    console.log(url);
    fetch(url)
      .then((response) => response.text())
      .then((text) => setContent(text));
  }, [contentUrl]);

  return (
    <Page>
      <h1>{title}</h1>
      <Markdown content={content} />
      <Toolbar>
        {Number.isFinite(previousChapter) && (
          <StyledLink to={`/chapters/${previousChapter}`}>
            Vorheriges Kapitel
          </StyledLink>
        )}
        {Number.isFinite(nextChapter) && (
          <RightLink to={`/chapters/${nextChapter}`}>
            Nächstes Kapitel
          </RightLink>
        )}
      </Toolbar>
    </Page>
  );
}
