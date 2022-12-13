import { ReleaseDetails } from "../../components/release-details";
import { useGetChangelogsQuery } from "../../store/api";

export function ReleaseList() {
  const { data: releases } = useGetChangelogsQuery({ limit: 10 });

  return (
    <>
      {releases?.map((release) => (
        <ReleaseDetails data={release} />
      ))}
    </>
  );
}
