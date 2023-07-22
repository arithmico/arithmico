import { useParams } from "react-router-dom";
import Heading from "../../../../../../components/heading/heading";
import { useGetConfigurationByIdQuery } from "../../../../../../store/api/resources/configurations/configurations.api";
import { ConfigurationDetailsCard } from "./components/configuration-details-card";
import { ConfigurationRevisionsCard } from "./components/configuration-revisions-card";

export function ConfigurationDetailsPage() {
  const { configurationId } = useParams();
  const { isSuccess, data } = useGetConfigurationByIdQuery({
    configurationId: configurationId!,
  });

  if (!isSuccess) {
    return <></>;
  }

  return (
    <>
      <div className="my-4">
        <Heading level={1}>{data.name}</Heading>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="flex flex-col lg:col-start-2 lg:row-start-1">
          <ConfigurationDetailsCard configurationId={configurationId!} />
        </div>
        <div className="flex flex-col lg:col-start-1 lg:row-start-1">
          <ConfigurationRevisionsCard configurationId={configurationId!} />
        </div>
      </div>
    </>
  );
}
