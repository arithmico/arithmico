import FileSaver from "file-saver";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ActionButton } from "../../../../../../../../components/action-button/action-button";
import { Card } from "../../../../../../../../components/card/card";
import Heading from "../../../../../../../../components/heading/heading";
import { RootState } from "../../../../../../../../store";
import {
  AUTHORIZATION_HEADER_NAME,
  baseUrl,
} from "../../../../../../../../store/api/base-query";
import {
  useGetConfigurationByIdQuery,
  useGetConfigurationRevisionByIdQuery,
} from "../../../../../../../../store/api/resources/configurations/configurations.api";
import { DispatchConfigurationRevisionBuildJob } from "./components/dispatch-configuration-revision-build-job.dialog";
import { RevisionDetailsBreadcrumbs } from "./components/revision-breadcrumbs";
import { RevisionBuildJobList } from "./components/revision-build-job-list";
import { RevisionFeatureFlagsCard } from "./components/revision-feature-flags-card";

function triggerDownload(
  configurationId: string,
  revisionId: string,
  accessToken: string
) {
  fetch(
    `${baseUrl}/configurations/${configurationId}/revisions/${revisionId}/json-export`,
    {
      method: "GET",
      headers: new Headers({
        [AUTHORIZATION_HEADER_NAME]: accessToken,
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      const blob = new Blob([JSON.stringify(data.data, null, 2)], {
        type: "application/json",
      });
      FileSaver.saveAs(blob, data.filename);
    });
}

export function RevisionDetailsPage() {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const { configurationId, revisionId } = useParams();
  const { isSuccess: configurationIsSuccess, data: configuration } =
    useGetConfigurationByIdQuery({
      configurationId: configurationId!,
    });
  const { isSuccess: revisionIsSuccess, data: revision } =
    useGetConfigurationRevisionByIdQuery({
      configurationId: configurationId!,
      revisionId: revisionId!,
    });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (!configurationIsSuccess || !revisionIsSuccess) {
    return <></>;
  }

  return (
    <>
      <DispatchConfigurationRevisionBuildJob
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        configurationId={configurationId!}
        configurationRevisionId={revisionId!}
      />
      <RevisionDetailsBreadcrumbs
        configurationId={configurationId!}
        configurationName={configuration.name}
        revisionId={revisionId!}
        revisionNumber={revision.revision}
      />
      <Heading className="my-4">
        {configuration.name} (Revision {revision.revision})
      </Heading>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <RevisionFeatureFlagsCard
            configurationId={configurationId!}
            revisionId={revisionId!}
          />
        </div>
        <div className="flex flex-col gap-4">
          <Card>
            <Heading level={2} className="mb-4">
              <FormattedMessage id="applications.configurations.revisions.actions" />
            </Heading>
            <div className="flex gap-4">
              <ActionButton
                onClick={() => {
                  triggerDownload(configurationId!, revisionId!, accessToken!);
                }}
              >
                <FormattedMessage id="applications.configurations.revisions.actions.export" />
              </ActionButton>
              <ActionButton onClick={() => setIsDialogOpen(true)}>
                <FormattedMessage id="applications.configurations.revisions.actions.trigger-build" />
              </ActionButton>
            </div>
          </Card>
          <RevisionBuildJobList
            configurationId={configurationId!}
            configurationRevisionId={revisionId!}
          />
        </div>
      </div>
    </>
  );
}
