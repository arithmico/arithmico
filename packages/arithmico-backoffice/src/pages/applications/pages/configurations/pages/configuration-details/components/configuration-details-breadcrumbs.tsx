import classNames from "classnames";
import { Children, ReactNode } from "react";
import { Link } from "react-router-dom";
import { ConfigurationsBreadcrumbs } from "../../../components/configuration-breadcrumbs";

export interface ConfigurationDetailsBreadcrumbsProps {
  children?: ReactNode;
  configurationName: string;
  configurationId: string;
}

export function ConfigurationDetailsBreadcrumbs({
  children,
  configurationName,
  configurationId,
}: ConfigurationDetailsBreadcrumbsProps) {
  return (
    <ConfigurationsBreadcrumbs>
      {children
        ? [
            <Link
              key="configurations"
              to={`/applications/configurations/${configurationId}`}
            >
              {configurationName}
            </Link>,
            ...Children.toArray(children),
          ]
        : [
            <span
              key="configurations"
              className={classNames("text-base", "mt-0", "mb-0")}
            >
              {configurationName}
            </span>,
          ]}
    </ConfigurationsBreadcrumbs>
  );
}
