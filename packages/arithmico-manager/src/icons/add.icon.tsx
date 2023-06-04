import { IconProps } from "./types";

export function AddIcon({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="48"
      width="48"
      viewBox="0 -960 960 960"
      className={className}
      aria-hidden
    >
      <path d="M450-200v-250H200v-60h250v-250h60v250h250v60H510v250h-60Z" />
    </svg>
  );
}
