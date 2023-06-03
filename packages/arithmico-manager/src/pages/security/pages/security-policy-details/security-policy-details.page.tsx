import classNames from "classnames";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { ChevronRightIcon } from "../../../../icons/chevron-right.icon";
import { ShieldIcon } from "../../../../icons/shield.icon";

export function SecurityPolicyDetails() {
  return (
    <>
      <nav className={classNames("mt-4")}>
        <ol className={classNames("flex")}>
          <li
            className={classNames("flex", "items-center", "text-neutral-500")}
          >
            <ShieldIcon
              className={classNames("w-6", "h-6", "pr-1", "fill-neutral-500")}
            />
            <Link to="/security">
              <FormattedMessage id="navbar.security" />
            </Link>
          </li>
          <li
            className={classNames("flex", "items-center", "text-neutral-500")}
          >
            <ChevronRightIcon
              className={classNames("w-8", "h-8", "px-1", "fill-neutral-500")}
            />
            <Link to="/security/security-policies">
              <FormattedMessage id="navbar.security.policies" />
            </Link>
          </li>
        </ol>
      </nav>
    </>
  );
}
