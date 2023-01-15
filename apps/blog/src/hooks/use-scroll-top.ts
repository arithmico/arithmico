import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function useScrollTop() {
  const location = useLocation();

  useEffect(() => {
    document
      .getElementById("scroll-anchor")
      ?.scrollIntoView({ behavior: "smooth" });
  }, [location.pathname]);
}
