import classNames from "classnames";
import React from "react";

const FormTextField = React.forwardRef<
  HTMLInputElement,
  React.HTMLProps<HTMLInputElement>
>((props, ref) => {
  return (
    <input
      ref={ref}
      type="text"
      className={classNames(
        "border",
        "border-gray-300",
        "focus:border-black",
        "outline-none",
        "p-2",
        "rounded-md",
        props.className
      )}
      {...props}
    />
  );
});

export default FormTextField;
