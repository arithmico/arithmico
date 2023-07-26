import classNames from "classnames";
import { Children, ReactNode } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { ApplicationsBreadcrumbs } from "../../../components/applications-breadcrumbs";

export interface ConfigurationsBreadcrumbsProps {
  children?: ReactNode;
}

export function ConfigurationsBreadcrumbs({
  children,
}: ConfigurationsBreadcrumbsProps) {
  return (
    <ApplicationsBreadcrumbs>
      {children
        ? [
            <Link key="configurations" to="/applications/configurations">
              <FormattedMessage id="applications.configurations" />
            </Link>,
            ...Children.toArray(children),
          ]
        : [
            <span
              key="configurations"
              className={classNames("text-base", "mt-0", "mb-0")}
            >
              <FormattedMessage id="applications.configurations" />
            </span>,
          ]}
    </ApplicationsBreadcrumbs>
  );
}
