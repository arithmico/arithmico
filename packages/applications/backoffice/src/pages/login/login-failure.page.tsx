import classNames from "classnames";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { Card } from "../../components/card/card";
import Heading from "../../components/heading/heading";
import { SimplePage } from "../../components/simple-page/simple-page";

export function LoginFailurePage() {
  return (
    <SimplePage>
      <Card className={classNames("max-w-sm")}>
        <Heading>
          <FormattedMessage id="login.failure.title" />
        </Heading>
        <p>
          <FormattedMessage id="login.failure.description" />
        </p>
        <Link
          to={"/login"}
          className={classNames(
            "mt-4",
            "inline-flex",
            "justify-center",
            "rounded-md",
            "bg-indigo-600",
            "py-2",
            "px-3",
            "text-sm",
            "font-semibold",
            "text-white",
            "shadow-sm",
            "hover:bg-indigo-500",
            "focus-visible:outline",
            "focus-visible:outline-2",
            "focus-visible:outline-offset-2",
            "focus-visible:outline-indigo-600"
          )}
        >
          <FormattedMessage id="login.failure.back-to-login" />
        </Link>
      </Card>
    </SimplePage>
  );
}
