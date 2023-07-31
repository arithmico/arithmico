import classNames from "classnames";
import { Children, ReactNode } from "react";
import { Link } from "react-router-dom";
import { ConfigurationDetailsBreadcrumbs } from "../../../components/configuration-details-breadcrumbs";

export interface RevisionDetailsBreadcrumbsProps {
  children?: ReactNode;
  configurationName: string;
  configurationId: string;
  revisionNumber: number;
  revisionId: string;
}

export function RevisionDetailsBreadcrumbs({
  children,
  configurationName,
  configurationId,
  revisionNumber,
  revisionId,
}: RevisionDetailsBreadcrumbsProps) {
  return (
    <ConfigurationDetailsBreadcrumbs
      configurationId={configurationId}
      configurationName={configurationName}
    >
      {children
        ? [
            <Link
              key="configurations"
              to={`/applications/configurations/${configurationId}/revisions/${revisionId}`}
            >
              {`${configurationName} (Revision ${revisionNumber})`}
            </Link>,
            ...Children.toArray(children),
          ]
        : [
            <span
              key="configurations"
              className={classNames("text-base", "mt-0", "mb-0")}
            >
              {`${configurationName} (Revision ${revisionNumber})`}
            </span>,
          ]}
    </ConfigurationDetailsBreadcrumbs>
  );
}
