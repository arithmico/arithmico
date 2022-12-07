import React from "react";
import ReactMarkdown from "react-markdown";
import useContent from "../../hooks/use-content";

interface BlogEntryProps {
  path: string;
}

export default function BlogEntry({ path }: BlogEntryProps) {
  const content = useContent(path);

  return <section className=""></section>;
}
