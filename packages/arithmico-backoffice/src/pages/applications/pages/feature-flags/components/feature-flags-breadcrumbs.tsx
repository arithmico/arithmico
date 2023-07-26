import classNames from "classnames";
import { Children, ReactNode } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { ApplicationsBreadcrumbs } from "../../../components/applications-breadcrumbs";

export interface FeatureFlagsBreadcrumbsProps {
  children?: ReactNode;
}

export function FeatureFlagsBreadcrumbs({
  children,
}: FeatureFlagsBreadcrumbsProps) {
  return (
    <ApplicationsBreadcrumbs>
      {children
        ? [
            <Link key="feature-flags" to="/applications/feature-flags">
              <FormattedMessage id="applications.feature-flags" />
            </Link>,
            ...Children.toArray(children),
          ]
        : [
            <span
              key="feature-flags"
              className={classNames("text-base", "mt-0", "mb-0")}
            >
              <FormattedMessage id="applications.feature-flags" />
            </span>,
          ]}
    </ApplicationsBreadcrumbs>
  );
}
