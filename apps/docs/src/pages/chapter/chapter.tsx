import React, { useEffect, useState } from "react";
import Markdown from "../../components/markdown/markdown";
import Page from "../../components/page/page";
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
    console.log(url);
    fetch(url)
      .then((response) => response.text())
      .then((text) => setContent(text));
  }, [contentUrl]);

  return (
    <Page>
      <h1>{title}</h1>
      <Markdown content={content} />
      <div className="flex my-8 mx-0">
        {Number.isFinite(previousChapter) && (
          <Link
            to={`/chapters/${previousChapter}`}
            className="text-black bg-black/20 py-2 px-4 rounded hover:bg-black/30"
          >
            Vorheriges Kapitel
          </Link>
        )}
        {Number.isFinite(nextChapter) && (
          <Link
            to={`/chapters/${nextChapter}`}
            className="text-black bg-black/20 py-2 px-4 rounded ml-auto hover:bg-black/30"
          >
            Nächstes Kapitel
          </Link>
        )}
      </div>
    </Page>
  );
}
