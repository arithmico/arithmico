import classNames from "classnames";
import { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useNavigate, useParams } from "react-router-dom";
import { BackButtonLink } from "../../../../../../components/back-button-link/back-button-link";
import Heading from "../../../../../../components/heading/heading";
import { LoadingPage } from "../../../../../../components/loading-page/loading-page";
import {
  useDeleteUserGroupMutation,
  useGetUserGroupByIdQuery,
} from "../../../../../../store/api/resources/user-groups/user-groups.api";
import { DeleteUserGroupBreadcrumbs } from "./components/delete-user-group-breadcrumbs";

export function DeleteUserGroupPage() {
  const { groupId } = useParams();
  const { isError, isSuccess, isLoading, data } = useGetUserGroupByIdQuery({
    groupId: groupId!,
  });
  const [deleteSecurityPolicy, result] = useDeleteUserGroupMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (result.isSuccess) {
      navigate("/security/user-groups");
    } else if (result.isError) {
      navigate("failure");
    }
  }, [result, navigate]);

  return (
    <>
      <LoadingPage isLoading={isLoading} isError={isError} />
      {isSuccess && data && (
        <>
          <DeleteUserGroupBreadcrumbs
            groupId={groupId!}
            groupName={data.name}
          />
          <Heading level={1} className={classNames("my-4")}>
            <FormattedMessage id="security.user-groups.delete" />
          </Heading>
          <p className={classNames("max-w-5xl")}>
            <FormattedMessage id="security.user-groups.delete.description" />
          </p>
          <div className={classNames("flex", "mt-4", "max-w-5xl")}>
            <BackButtonLink to={-1} />
            <button
              disabled={data.members > 0 || data.readonly}
              onClick={() => deleteSecurityPolicy({ groupId: groupId! })}
              type="button"
              className={classNames(
                "ml-auto",
                "inline-flex",
                "justify-center",
                "rounded-sm",
                "bg-red-600",
                "disabled:bg-red-300",
                "py-2",
                "px-4",
                "font-semibold",
                "text-white",
                "shadow-sm",
                "hover:bg-red-500",
                "focus-visible:outline",
                "focus-visible:outline-2",
                "focus-visible:outline-offset-2",
                "focus-visible:outline-red-600"
              )}
            >
              <span aria-hidden>
                <FormattedMessage id="security.user-groups.delete.action" />
              </span>
              <span className="sr-only">
                <FormattedMessage id="security.user-groups.delete.sr-action" />
              </span>
            </button>
          </div>
        </>
      )}
    </>
  );
}
