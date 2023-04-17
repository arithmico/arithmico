import { IconProps } from "./types";

export function CloseIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
      height="48"
      viewBox="0 96 960 960"
      width="48"
      className={className}
    >
      <path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z" />
    </svg>
  );
}
