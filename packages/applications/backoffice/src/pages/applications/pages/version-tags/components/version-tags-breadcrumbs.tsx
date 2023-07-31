import classNames from "classnames";
import { Children, ReactNode } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { ApplicationsBreadcrumbs } from "../../../components/applications-breadcrumbs";

export interface VersionTagsBreadcrumbsProps {
  children?: ReactNode;
}

export function VersionTagsBreadcrumbs({
  children,
}: VersionTagsBreadcrumbsProps) {
  return (
    <ApplicationsBreadcrumbs>
      {children
        ? [
            <Link key="version-tags" to="/applications/version-tags">
              <FormattedMessage id="applications.version-tags" />
            </Link>,
            ...Children.toArray(children),
          ]
        : [
            <span
              key="version-tags"
              className={classNames("text-base", "mt-0", "mb-0")}
            >
              <FormattedMessage id="applications.version-tags" />
            </span>,
          ]}
    </ApplicationsBreadcrumbs>
  );
}
