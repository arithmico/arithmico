import React from "react";
import BlogEntry from "../../components/blog-entry/blog-entry";
import Page from "../../components/page/page";
import entries from "../../entries.json";

export default function Home() {
  return (
    <Page>
      {entries.map((entry) => (
        <BlogEntry key={entry} path={entry} />
      ))}
    </Page>
  );
}
