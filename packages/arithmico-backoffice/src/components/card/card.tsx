import classNames from "classnames";

export interface CardProps {
  children?: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={classNames(
        "bg-white",
        "rounded-md",
        "p-4",
        "flex",
        "flex-col",
        className
      )}
    >
      {children}
    </div>
  );
}
