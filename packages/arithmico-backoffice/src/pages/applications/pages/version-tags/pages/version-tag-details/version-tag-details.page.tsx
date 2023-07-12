import { useParams } from "react-router-dom";
import Heading from "../../../../../../components/heading/heading";
import { SemanticVersion } from "../../../../../../components/semantic-version/semantic-version";
import { useGetVersionTagByIdQuery } from "../../../../../../store/api/resources/version-tags/version-tags.api";
import { VersionTagDetailsCard } from "./components/version-tag-details-card";
import { VersionTagFeatureFlagList } from "./components/version-tag-feature-flag-list";

export function VersionTagDetailsPage() {
  const { tagId } = useParams();
  const { isSuccess, data } = useGetVersionTagByIdQuery({
    tagId: tagId!,
  });

  if (!isSuccess) {
    return <></>;
  }

  return (
    <>
      <Heading level={1} className="my-4">
        <SemanticVersion version={data.version} />
      </Heading>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="flex flex-col lg:col-start-2 lg:row-start-1">
          <VersionTagDetailsCard versionTag={data} />
        </div>
        <div className="flex flex-col">
          <VersionTagFeatureFlagList tagId={tagId!} />
        </div>
      </div>
    </>
  );
}
