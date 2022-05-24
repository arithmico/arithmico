import React from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";

const Form = styled.div`
  display: flex;
  flex-direction: column;
`;

const Textfield = styled.input.attrs({ type: "text" })`
  border: none;
  font-size: 1.5rem;
  outline: none;
  background-color: rgba(0, 0, 0, 0.15);
  padding: 0.75rem;
  border-radius: 0.25rem;
  color: black;
  font-family: Source Code Pro, Monospace, Sans;
`;

const Label = styled.label`
  margin-top: 0.75rem;
  display: flex;
  flex-direction: column;
  font-size: 0.75rem;

  & > span {
    margin-left: 0.75rem;
    margin-bottom: 0.25rem;
  }
`;

const Button = styled.a`
  font-size: 1rem;
  outline: none;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  border: none;
  border-radius: 0.25rem;
  background-color: rgba(0, 0, 0, 0.15);
  color: black;
  margin-left: auto;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.25);
  }
`;

const Strong = styled.strong`
  font-weight: 500;
`;

const Paragraph = styled.p`
  text-align: justify;
`;

const Link = styled.a`
  color: black;
  text-decoration: none;
  opacity: 0.5;
  font-weight: 500;

  &:hover {
    opacity: 1;
  }
`;

interface MarkdownProps {
  content: string;
}

export default function Markdown({ content }: MarkdownProps) {
  return (
    <ReactMarkdown
      components={{
        a: ({ ...props }) => <Link {...props} />,
        p: ({ children }) => <Paragraph>{children}</Paragraph>,
        strong: ({ children }) => <Strong>{children}</Strong>,
        code: ({ node, inline, className, children, ...props }) => {
          const child = node.children[0];

          if (child.type !== "text") {
            return <code>{children}</code>;
          }

          const lines = child.value.split("\n").filter((line) => line !== "");

          if (lines.length !== 2) {
            return <code>{children}</code>;
          }

          return (
            <Form>
              <Label>
                <span>Eingabe</span>
                <Textfield value={lines[0]} readOnly />
              </Label>
              <Label>
                <span>Ausgabe</span>
                <Textfield value={lines[1]} readOnly />
              </Label>
              <Button
                href={`https://arithmico.com/examples/${encodeURIComponent(
                  lines[0]
                )}`}
                target="_blank"
              >
                Ausprobieren
              </Button>
            </Form>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
