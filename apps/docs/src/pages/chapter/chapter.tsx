import React, { useEffect, useState } from "react";
import Markdown from "../../components/markdown/markdown";
import { Link } from "react-router-dom";
import PageContainer from "../../components/page-container/page-container";
import WithScrollbars from "../../components/with-scrollbars/with-scrollbars";
import Nav from "../../components/nav/nav";
import chaptersDe from "../../chapters/index";

interface chapterProps {
  contentUrl: string;
  title: string;
  nextChapter?: number;
  previousChapter?: number;
  children: React.ReactNode;
}

export default function Chapter({
  contentUrl,
  title,
  nextChapter,
  previousChapter,
  children,
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
    <WithScrollbars>
      <PageContainer>
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
      </PageContainer>
    </WithScrollbars>
  );
}
