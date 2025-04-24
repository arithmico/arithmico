import { useEffect } from "react";

export default function useTitle(title: string) {
  return useEffect(() => {
    document.title = title;
  }, [title]);
}
