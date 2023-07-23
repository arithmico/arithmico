import FileSaver from "file-saver";
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

  return (
    <>
      <Heading className="my-4">Revision Details Page</Heading>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <RevisionFeatureFlagsCard
            configurationId={configurationId!}
            revisionId={revisionId!}
          />
        </div>
        <div className="flex flex-col">
          <Card>
            <Heading level={2} className="mb-4">
              <FormattedMessage id="applications.configurations.revisions.export" />
            </Heading>
            <div className="flex">
              <ActionButton
                onClick={() => {
                  triggerDownload(configurationId!, revisionId!, accessToken!);
                }}
              >
                <FormattedMessage id="applications.configurations.revisions.export.button" />
              </ActionButton>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
