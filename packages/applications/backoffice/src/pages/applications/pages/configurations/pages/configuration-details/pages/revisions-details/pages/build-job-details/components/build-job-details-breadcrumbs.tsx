import { FormattedMessage } from "react-intl";
import { RevisionDetailsBreadcrumbs } from "../../../components/revision-breadcrumbs";

export interface BuildJobDetailsBreadcrumbsProps {
  configurationName: string;
  configurationId: string;
  revisionNumber: number;
  revisionId: string;
  buildJobName: string;
}

export function BuildJobDetailsBreadcrumbs({
  configurationName,
  configurationId,
  revisionNumber,
  revisionId,
  buildJobName,
}: BuildJobDetailsBreadcrumbsProps) {
  return (
    <RevisionDetailsBreadcrumbs
      configurationId={configurationId}
      configurationName={configurationName}
      revisionId={revisionId}
      revisionNumber={revisionNumber}
    >
      {[
        <span>
          <FormattedMessage id="applications.configurations.revisions.build" />
        </span>,
        <span>{buildJobName}</span>,
      ]}
    </RevisionDetailsBreadcrumbs>
  );
}
