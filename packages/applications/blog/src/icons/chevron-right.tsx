import { IconProps } from "./icon-props.types";

export default function ChevronRight({ className }: IconProps) {
  return (
    <svg
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      height="48"
      width="48"
      viewBox="0 0 48 48"
    >
      <path d="m18.75 36-2.15-2.15 9.9-9.9-9.9-9.9 2.15-2.15L30.8 23.95Z" />
    </svg>
  );
}
