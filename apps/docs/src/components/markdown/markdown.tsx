import React from "react";
import ReactMarkdown from "react-markdown";
import { MathJax } from "better-react-mathjax";

interface MarkdownProps {
  content: string;
}

export default function Markdown({ content }: MarkdownProps) {
  return (
    <MathJax inline>
      <ReactMarkdown
        components={{
          a: ({ href, children }) => (
            <a
              className="text-black opacity-50 font-medium hover:opacity-100"
              href={href}
            >
              {children}
            </a>
          ),
          p: ({ children }) => <p className="text-justify">{children}</p>,
          strong: ({ children }) => (
            <strong className="font-medium">{children}</strong>
          ),
          h1: ({ children }) => (
            <h1 className="mt-4 mb-1 font-normal text-4xl">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="mt-4 mb-1 font-normal text-3xl">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-4 mb-1 font-normal text-2xl">{children}</h3>
          ),
          h4: ({ children }) => (
            <h4 className="mt-4 mb-1 font-normal text-xl">{children}</h4>
          ),
          h5: ({ children }) => (
            <h5 className="mt-4 mb-1 font-normal text-lg">{children}</h5>
          ),
          h6: ({ children }) => (
            <h6 className="mt-4 mb-1 font-normal text-base">{children}</h6>
          ),
          code: ({ node, inline, className, children }) => {
            const child = node.children[0];

            if (child.type !== "text") {
              return <code>{children}</code>;
            }

            const lines = child.value.split("\n").filter((line) => line !== "");

            if (lines.length !== 2) {
              return <code>{children}</code>;
            }

            return (
              <div className="flex flex-col">
                <label className="mt-3 flex flex-col text-xs">
                  <span className="ml-3 mb-1">Eingabe</span>
                  <input
                    value={lines[0]}
                    type="text"
                    readOnly
                    className="text-2xl bg-black/20 p-3 rounded text-black font-mono"
                  />
                </label>
                <label className="mt-3 flex flex-col text-xs">
                  <span className="ml-3 mb-1">Ausgabe</span>
                  <input
                    value={lines[1]}
                    type="text"
                    readOnly
                    className="text-2xl bg-black/20 p-3 rounded text-black font-mono"
                  />
                </label>
              </div>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </MathJax>
  );
}
