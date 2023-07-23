import { useParams } from "react-router-dom";
import Heading from "../../../../../../../../components/heading/heading";
import { RevisionFeatureFlagsCard } from "./components/revision-feature-flags-card";

export function RevisionDetailsPage() {
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
      </div>
    </>
  );
}
