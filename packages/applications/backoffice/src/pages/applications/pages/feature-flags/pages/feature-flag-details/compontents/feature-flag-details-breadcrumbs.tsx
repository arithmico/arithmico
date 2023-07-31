import classNames from "classnames";
import { Children, ReactNode } from "react";
import { Link } from "react-router-dom";
import { FeatureFlagsBreadcrumbs } from "../../../components/feature-flags-breadcrumbs";

export interface FeatureFlagDetailsBreadcrumbsProps {
  children?: ReactNode;
  flagId: string;
  name: string;
}

export function FeatureFlagDetailsBreadcrumbs({
  children,
  flagId,
  name,
}: FeatureFlagDetailsBreadcrumbsProps) {
  return (
    <FeatureFlagsBreadcrumbs>
      {children
        ? [
            <Link
              key="configurations"
              to={`/applications/feature-flags/${flagId}`}
            >
              {name}
            </Link>,
            ...Children.toArray(children),
          ]
        : [
            <span
              key="configurations"
              className={classNames("text-base", "mt-0", "mb-0")}
            >
              {name}{" "}
            </span>,
          ]}
    </FeatureFlagsBreadcrumbs>
  );
}
