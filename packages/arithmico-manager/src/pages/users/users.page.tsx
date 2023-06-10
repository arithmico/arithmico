import { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import Heading from "../../components/heading/heading";
import { useGetUsersQuery } from "../../store/api/resources/users/users.api";

export default function UsersPage() {
  const { isSuccess, isError, isLoading, data } = useGetUsersQuery({
    skip: 0,
    limit: 100,
  });

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
    }
  }, [isSuccess, data]);

  return (
    <>
      <Heading level={1}>
        <FormattedMessage id="users.title" />
      </Heading>
      <p>
        <FormattedMessage id="users.description" />
      </p>
    </>
  );
}
