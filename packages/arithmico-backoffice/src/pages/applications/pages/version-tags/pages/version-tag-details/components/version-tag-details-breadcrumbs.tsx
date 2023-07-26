import classNames from "classnames";
import { Children, ReactNode } from "react";
import { SemanticVersion } from "../../../../../../../components/semantic-version/semantic-version";
import { VersionTagsBreadcrumbs } from "../../../components/version-tags-breadcrumbs";

export interface VersionTagDetailsBreadcrumbsProps {
  children?: ReactNode;
  version: {
    major: number;
    minor: number;
    patch: number;
  };
}

export function VersionTagDetailsBreadcrumbs({
  children,
  version,
}: VersionTagDetailsBreadcrumbsProps) {
  return (
    <VersionTagsBreadcrumbs>
      {children
        ? [
            <SemanticVersion key="version-tag-details" version={version} />,
            ...Children.toArray(children),
          ]
        : [
            <span
              key="configurations"
              className={classNames("text-base", "mt-0", "mb-0")}
            >
              <SemanticVersion key="version-tag-details" version={version} />
            </span>,
          ]}
    </VersionTagsBreadcrumbs>
  );
}
