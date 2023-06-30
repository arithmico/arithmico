import classNames from "classnames";
import { FieldError } from "react-hook-form";
import { FormattedMessage } from "react-intl";

interface FormErrorPorps {
  error?: FieldError;
  className?: string;
}

export default function FormError({ error, className }: FormErrorPorps) {
  return (
    <>
      {error && (
        <p
          className={classNames(
            "text-red-600",
            "-mt-2",
            "mb-4",
            "text-sm",
            className
          )}
        >
          <FormattedMessage id={error.message} />
        </p>
      )}
    </>
  );
}
