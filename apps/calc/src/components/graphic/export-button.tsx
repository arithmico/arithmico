import classNames from "classnames";

export default function exportButton() {
  return (
    <button
      className={classNames(
        "bold-font:font-bold",
        "border",
        "lg:p-4",
        "md:p-1",
        "rounded-sm",
        "text-left",
        "theme-light:bg-neutral-200",
        "theme-light:hover:bg-neutral-300",
        "theme-light:border-black/10",
        "theme-dark:bg-neutral-800",
        "theme-dark:hover:bg-neutral-700",
        "theme-dark:border-white/5"
      )}
    >
      {"Export as pdf"}
    </button>
  );
}
