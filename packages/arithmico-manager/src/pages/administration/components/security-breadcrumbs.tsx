import classNames from "classnames";
import { Children, ReactNode } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "../../../components/breadcrumbs/breadcrumbs";
import Heading from "../../../components/heading/heading";
import { ShieldIcon } from "../../../icons/shield.icon";

export interface SecurityBreadcrumbsProps {
  children?: ReactNode;
}

export function SecurityBreadcrumbs({ children }: SecurityBreadcrumbsProps) {
  return (
    <Breadcrumbs
      firstIcon={<ShieldIcon className={classNames("w-6", "h-6", "pr-1")} />}
    >
      {children
        ? [
            <Link key="security" to="/security">
              <FormattedMessage id="security.title" />
            </Link>,
            ...Children.toArray(children),
          ]
        : [
            <Heading
              key="security"
              level={1}
              className={classNames("text-base", "mt-0", "mb-0")}
            >
              <FormattedMessage id="security.title" />
            </Heading>,
          ]}
    </Breadcrumbs>
  );
}
