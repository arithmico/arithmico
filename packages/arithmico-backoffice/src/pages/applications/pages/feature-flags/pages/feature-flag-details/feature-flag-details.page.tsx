import { useParams } from "react-router-dom";
import Heading from "../../../../../../components/heading/heading";

export function FeatureFlagDetailsPage() {
  const { flagId } = useParams();

  return (
    <>
      <Heading level={1}>Funktion</Heading>
      {flagId}
    </>
  );
}
