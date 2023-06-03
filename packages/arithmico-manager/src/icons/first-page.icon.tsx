import { IconProps } from "./types";

export function FirstPageIcon({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="48"
      width="48"
      viewBox="0 -960 960 960"
      className={className}
      aria-hidden
    >
      <path d="M240-240v-480h60v480h-60Zm447-3L453-477l234-234 43 43-191 191 191 191-43 43Z" />
    </svg>
  );
}
