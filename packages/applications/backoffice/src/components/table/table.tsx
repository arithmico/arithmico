import classNames from "classnames";
import { forwardRef, HTMLProps, ReactNode } from "react";

interface TableProps {
  header: ReactNode;
}

export const Table = forwardRef<
  HTMLTableElement,
  HTMLProps<HTMLTableElement> & TableProps
>(({ header, children, className, ...props }, ref) => {
  return (
    <table
      ref={ref}
      className={classNames("border-separate border-spacing-y-1")}
      {...props}
    >
      {header && (
        <thead>
          <tr className={classNames("border-b", "border-neutral-400")}>
            {header}
          </tr>
        </thead>
      )}
      <tbody>{children}</tbody>
    </table>
  );
});
