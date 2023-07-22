import classNames from "classnames";
import { forwardRef, HTMLProps } from "react";

export const TableRow = forwardRef<
  HTMLTableRowElement,
  HTMLProps<HTMLTableRowElement>
>(({ children, className, ...props }, ref) => {
  return (
    <tr
      ref={ref}
      className={classNames("hover:bg-black/5", className)}
      {...props}
    >
      {children}
    </tr>
  );
});
