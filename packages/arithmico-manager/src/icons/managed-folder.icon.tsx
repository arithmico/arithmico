import { IconProps } from "./types";

export function ManagedFolderIcon({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="48"
      width="48"
      viewBox="0 -960 960 960"
      className={className}
    >
      <path d="M141-220v-7 7-460 460Zm0 60q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h280l60 60h340q24 0 42 18t18 42v195q-14-11-28.5-19.5T821-520v-160H141v460h327q4 16 9 31t13 29H141Zm550 78-5-48q-23-7-42-18.5T611-173l-42 20-35-54 38-30q-5-19-5-41.5t5-41.5l-38-30 35-55 42 20q14-12 33-23.5t42-18.5l5-49h60l6 49q23 7 42 18.5t33 23.5l42-20 35 55-38 30q5 19 5 41.5t-5 41.5l38 30-35 54-42-20q-14 13-33 24.5T757-130l-6 48h-60Zm30-95q44 0 73-29t29-73q0-44-29-73t-73-29q-44 0-73 29t-29 73q0 44 29 73t73 29Z" />
    </svg>
  );
}
