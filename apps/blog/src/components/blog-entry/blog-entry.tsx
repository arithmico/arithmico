import React from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import useContent from "../../hooks/use-content";

const Section = styled.section`
  & h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 1rem 0 0.25rem 0;
    font-weight: 400;
  }

  & h1 {
    font-size: 1.7rem;
  }

  & h2 {
    font-size: 1.6rem;
  }

  & h3 {
    font-size: 1.5rem;
  }

  & h4 {
    font-size: 1.4rem;
  }

  & h5 {
    font-size: 1.2rem;
  }

  & h6 {
    font-size: 1.1rem;
  }

  & code {
    background-color: rgba(0, 0, 0, 0.15);
    padding: 0.1rem 0.25rem;
    border-radius: 0.25rem;
    font-family: "Source Code Pro", monospace;
  }

  & pre {
    background-color: rgba(0, 0, 0, 0.15);
    padding: 0.25rem;
    border-radius: 0.25rem;
  }

  & pre > code {
    background-color: transparent;
    margin: 0;
    padding: 0;
  }
`;

interface BlogEntryProps {
  path: string;
}

export default function BlogEntry({ path }: BlogEntryProps) {
  const content = useContent(path);

  return (
    <Section>
      <ReactMarkdown>{content}</ReactMarkdown>
    </Section>
  );
}
