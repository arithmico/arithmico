import { useEffect, useState } from "react";

export default function useContent(path: string) {
  const [content, setContent] = useState("");
  useEffect(() => {
    fetch(`${window.location.protocol}//${window.location.host}/${path}`)
      .then((response) => response.text())
      .then((text) => setContent(text))
      .catch(() => setContent("failed to load content"));
  });

  return content;
}
