import classNames from "classnames";
import { Children, ReactNode } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "../../../components/breadcrumbs/breadcrumbs";
import { ManagedFolderIcon } from "../../../icons/managed-folder.icon";

export interface ApplicationsBreadcrumbsProps {
  children?: ReactNode;
}

export function ApplicationsBreadcrumbs({
  children,
}: ApplicationsBreadcrumbsProps) {
  return (
    <Breadcrumbs
      firstIcon={
        <ManagedFolderIcon className={classNames("w-6", "h-6", "pr-1")} />
      }
    >
      {children
        ? [
            <Link key="applications" to="/applications">
              <FormattedMessage id="applications" />
            </Link>,
            ...Children.toArray(children),
          ]
        : [
            <span
              key="applications"
              className={classNames("text-base", "mt-0", "mb-0")}
            >
              <FormattedMessage id="applications" />
            </span>,
          ]}
    </Breadcrumbs>
  );
}
