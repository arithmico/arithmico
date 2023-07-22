import { useParams } from "react-router-dom";

export function ConfigurationDetailsPage() {
  const { configurationId } = useParams();

  if (!configurationId) {
    return <></>;
  }

  return <>Configuration Details for {configurationId}</>;
}
