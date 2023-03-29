import React, { useEffect, useState } from "react";
import Markdown from "../../components/markdown/markdown";
import { Link } from "react-router-dom";

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
    fetch(url)
      .then((response) => response.text())
      .then((text) => setContent(text));
  }, [contentUrl]);

  return (
    <div className="w-fullborder-2 h-full max-h-full pr-[25%]">
      <h1>{title}</h1>
      <Markdown content={content} />
      <div className="my-8 mx-0 flex">
        {Number.isFinite(previousChapter) && (
          <Link
            to={`/chapters/${previousChapter}`}
            className="rounded bg-black/20 py-2 px-4 text-black hover:bg-black/30"
          >
            Vorheriges Kapitel
          </Link>
        )}
        {Number.isFinite(nextChapter) && (
          <Link
            to={`/chapters/${nextChapter}`}
            className="ml-auto rounded bg-black/20 py-2 px-4 text-black hover:bg-black/30"
          >
            Nächstes Kapitel
          </Link>
        )}
      </div>
    </div>
  );
}
