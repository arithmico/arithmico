import { useParams } from "react-router-dom";
import { Card } from "../../../../../../../../../../components/card/card";
import Heading from "../../../../../../../../../../components/heading/heading";
import { useGetBuildJobForConfigurationRevisionByIdQuery } from "../../../../../../../../../../store/api/resources/configurations/configurations.api";

export function BuildJobDetailsPage() {
  const { configurationId, revisionId, buildJobId } = useParams();
  const { data, isSuccess } = useGetBuildJobForConfigurationRevisionByIdQuery({
    buildJobId: buildJobId!,
    configurationId: configurationId!,
    configurationRevisionId: revisionId!,
  });

  if (!isSuccess) {
    return <></>;
  }

  return (
    <>
      <Heading className="my-4" level={1}>
        {data.name}
      </Heading>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
          <Card>
            <Heading level={2}>Artefakte</Heading>
            {data.platforms.length > 0 && (
              <ul className="flex flex-col mt-4 gap-1">
                {data.platforms.map((platform) => (
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
