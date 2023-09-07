import { FormattedMessage } from "react-intl";
import { useParams } from "react-router-dom";
import { Card } from "../../../../../../../../../../components/card/card";
import Heading from "../../../../../../../../../../components/heading/heading";
import {
  useGetBuildJobForConfigurationRevisionByIdQuery,
  useGetConfigurationByIdQuery,
  useGetConfigurationRevisionByIdQuery,
} from "../../../../../../../../../../store/api/resources/configurations/configurations.api";
import { PlatformBuildJobStatus } from "../../../../../../../../../../store/api/resources/configurations/configurations.types";
import { BuildJobDetailsBreadcrumbs } from "./components/build-job-details-breadcrumbs";

export function BuildJobDetailsPage() {
  const { configurationId, revisionId, buildJobId } = useParams();
  const { data, isSuccess } = useGetBuildJobForConfigurationRevisionByIdQuery({
    buildJobId: buildJobId!,
    configurationId: configurationId!,
    configurationRevisionId: revisionId!,
  });
  const { isSuccess: configurationIsSuccess, data: configuration } =
    useGetConfigurationByIdQuery({
      configurationId: configurationId!,
    });
  const { isSuccess: revisionIsSuccess, data: revision } =
    useGetConfigurationRevisionByIdQuery({
      configurationId: configurationId!,
      revisionId: revisionId!,
    });

  if (!isSuccess || !configurationIsSuccess || !revisionIsSuccess) {
    return <></>;
  }

  const succeededPlatforms = data.platforms.filter(
    (platform) =>
      platform.status === PlatformBuildJobStatus.Succeeded &&
      platform.artifactUrl
  );

  return (
    <>
      <BuildJobDetailsBreadcrumbs
        configurationId={configurationId!}
        configurationName={configuration.name}
        revisionId={revisionId!}
        revisionNumber={revision.revision}
        buildJobName={data.name}
      />
      <Heading className="my-4" level={1}>
        {data.name}
      </Heading>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
          <Card>
            <Heading level={2}>
              <FormattedMessage id="applications.configurations.revisions.build-job.artifacts" />
            </Heading>
            {succeededPlatforms.length > 0 && (
              <ul className="flex flex-col mt-4 gap-1">
                {succeededPlatforms.map((platform) => (
                  <li
                    key={`${buildJobId}-${platform.platform}`}
                    className="flex w-full"
                  >
                    <a
                      className="w-full p-2 border-black/20 border rounded-sm hover:cursor-pointer hover:bg-black/5"
                      href={`https://cdn.arithmico.com/${platform.artifactUrl}`}
                    >
                      {data.name}-{platform.platform}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      </div>
    </>
  );
}
