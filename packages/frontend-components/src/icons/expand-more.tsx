import React from "react";

export default function ExpandMore({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      height="48"
      width="48"
      viewBox="0 0 48 48"
    >
      <path d="m24 30.75-12-12 2.15-2.15L24 26.5l9.85-9.85L36 18.8Z" />
    </svg>
  );
}
