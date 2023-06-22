import { useParams } from "react-router-dom";
import Heading from "../../../../../../components/heading/heading";
import { LoadingPage } from "../../../../../../components/loading-page/loading-page";
import { useGetUserByIdQuery } from "../../../../../../store/api/resources/users/users.api";
import { AttachedSecurityPoliciesCard } from "./components/attached-security-polices-card";
import { UserDetailsBreadcrumbs } from "./components/user-details-breadcrumbs";
import { UserDetailsCard } from "./components/user-details-card";

export function UserDetailsPage() {
  const { userId } = useParams();
  const { data, isSuccess, isError, isLoading } = useGetUserByIdQuery({
    userId: userId!,
  });

  return (
    <>
      <LoadingPage isLoading={isLoading} isError={isError} />
      {isSuccess && data && (
        <>
          <UserDetailsBreadcrumbs username={data.username} userId={data.id} />
          <Heading level={1} className="my-4">
            {data.username}
          </Heading>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="row-start-1 flex flex-col lg:col-start-2">
              <UserDetailsCard user={data} />
            </div>
            <div className="flex flex-col">
              <AttachedSecurityPoliciesCard userId={data.id} />
            </div>
          </div>
        </>
      )}
    </>
  );
}
