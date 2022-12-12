import ReactMarkdown from "react-markdown";

interface MarkdownProps {
  content: string;
}

export default function ChangelogMarkdown({ content }: MarkdownProps) {
  return (
    <ReactMarkdown
      components={{
        h1({ children }) {
          return (
            <h3 className="mt-4 mb-1 font-semibold text-xl">{children}</h3>
          );
        },
        h2({ children }) {
          return (
            <h4 className="mt-4 mb-1 font-semibold text-lg">{children}</h4>
          );
        },
        h3({ children }) {
          return (
            <h5 className="mt-4 mb-1 font-semibold text-base">{children}</h5>
          );
        },
        code({ children }) {
          return (
            <code className="bg-white/10 py-0.5 px-1 rounded-md font-mono">
              {children}
            </code>
          );
        },
        ul({ children }) {
          return <ul className="list-disc pl-2">{children}</ul>;
        },
        li({ children }) {
          return <li className="ml-4">{children}</li>;
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
