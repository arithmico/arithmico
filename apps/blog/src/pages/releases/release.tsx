import { useParams } from "react-router-dom";
import { Changelog, useGetChangelogQuery } from "../../store/api";
import { ReleaseDetails } from "../../components/release-details";

export default function Release() {
  const { releaseId } = useParams();
  const { data } = useGetChangelogQuery({ id: releaseId as string });
  return <>{data && <ReleaseDetails data={data as Changelog} />}</>;
}
