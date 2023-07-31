import classNames from "classnames";

interface FormLabelProps {
  children?: React.ReactNode;
  text?: string | React.ReactNode;
  className?: string;
}

export default function FormLabel({
  children,
  text,
  className,
}: FormLabelProps) {
  return (
    <label className={classNames("flex", "flex-col", "mb-4", className)}>
      {text && (
        <span
          className={classNames(
            "text-gray-700",
            "text-sm",
            "font-medium",
            "mb-1",
            "mt-3"
          )}
        >
          {text}
        </span>
      )}
      {children}
    </label>
  );
}
