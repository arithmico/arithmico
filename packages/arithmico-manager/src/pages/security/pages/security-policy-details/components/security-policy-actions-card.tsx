import classNames from "classnames";
import { ReactNode } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { Card } from "../../../../../components/card/card";
import Heading from "../../../../../components/heading/heading";
import { ChevronRightIcon } from "../../../../../icons/chevron-right.icon";

export function SecurityPolicyActionsCard() {
  return (
    <Card>
      <Heading level={2} className={classNames("mt-0", "text-xl")}>
        <FormattedMessage id="security-policy-details.actions.title" />
      </Heading>
      <menu>
        <MenuItem>
          <Link to="./attributes">
            <FormattedMessage id="security-policy-details.actions.edit-attributes" />
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="./rename">
            <FormattedMessage id="security-policy-details.actions.rename" />
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="./delete">
            <FormattedMessage id="security-policy-details.actions.delete" />
          </Link>
        </MenuItem>
      </menu>
    </Card>
  );
}

interface MenuItemProps {
  children: ReactNode;
}

function MenuItem({ children }: MenuItemProps) {
  return (
    <li className={classNames("flex", "items-center")}>
      <ChevronRightIcon
        className={classNames("w-6", "h-6", "fill-neutral-500", "mx-1")}
      />
      {children}
    </li>
  );
}
