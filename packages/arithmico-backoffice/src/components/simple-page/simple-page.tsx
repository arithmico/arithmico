import classNames from "classnames";

export interface SimplePageProps {
  children: React.ReactNode;
  className?: string;
}

export function SimplePage({ children, className }: SimplePageProps) {
  return (
    <div
      className={classNames(
        "absolute",
        "inset-0",
        "bg-neutral-200",
        "flex",
        "items-center",
        "justify-center",
        className
      )}
    >
      {children}
    </div>
  );
}
