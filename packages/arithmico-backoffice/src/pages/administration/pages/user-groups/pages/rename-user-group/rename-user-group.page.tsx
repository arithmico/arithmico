import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { useNavigate, useParams } from "react-router-dom";
import { BackButtonLink } from "../../../../../../components/back-button-link/back-button-link";
import { Card } from "../../../../../../components/card/card";
import FormError from "../../../../../../components/form-error/form-error";
import FormLabel from "../../../../../../components/form-label/form-label";
import FormSubmitButton from "../../../../../../components/form-submit-button/form-submit-button";
import FormTextField from "../../../../../../components/form-text-field/form-text-field";
import Heading from "../../../../../../components/heading/heading";
import { LoadingPage } from "../../../../../../components/loading-page/loading-page";
import {
  renameUserGroupSchema,
  RenameUserGroupSchemaType,
} from "../../../../../../schemas/rename-user-group/rename-user-group.schema";
import {
  useGetUserGroupByIdQuery,
  useRenameUserGroupMutation,
} from "../../../../../../store/api/resources/user-groups/user-groups.api";
import { RenameUserGroupBreacrumbs } from "./components/rename-user-group-breadcrumbs";

export function RenameUserGroupPage() {
  const { groupId } = useParams();
  const { isError, isSuccess, isLoading, data } = useGetUserGroupByIdQuery({
    groupId: groupId!,
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, dirtyFields },
  } = useForm<RenameUserGroupSchemaType>({
    resolver: zodResolver(renameUserGroupSchema),
    defaultValues: {
      name: data?.name,
    },
  });
  const [rename, renameResult] = useRenameUserGroupMutation();
  const navigate = useNavigate();
  useEffect(() => {
    if (data) {
      setValue("name", data.name);
    }
  }, [data, setValue]);
  useEffect(() => {
    if (renameResult.isSuccess) {
      navigate(-1);
    }
    if (renameResult.isError) {
      navigate("failure");
    }
  }, [renameResult, navigate]);

  return (
    <>
      <LoadingPage isError={isError} isLoading={isLoading} />
      {isSuccess && data && (
        <>
          <RenameUserGroupBreacrumbs groupId={data.id} groupName={data.name} />
          <Card className={classNames("mt-4", "max-w-5xl")}>
            <Heading level={1} className={classNames("my-4")}>
              <FormattedMessage id="admin.user-groups.rename" />
            </Heading>
            <p>
              <FormattedMessage id="admin.user-groups.rename.description" />
            </p>
            <form
              onSubmit={handleSubmit((values) =>
                rename({
                  groupId: data.id,
                  name: values.name,
                })
              )}
              className={classNames("mt-4", "flex", "flex-col")}
            >
              <FormLabel>
                Name
                <FormTextField {...register("name")} />
              </FormLabel>
              <FormError error={errors.name} />
              <div className={classNames("flex", "mt-4", "items-center")}>
                <BackButtonLink to={-1} />
                <FormSubmitButton
                  disabled={!dirtyFields.name || data.readonly}
                  className={classNames("ml-auto")}
                >
                  Speichern
                </FormSubmitButton>
              </div>
            </form>
          </Card>
        </>
      )}
    </>
  );
}
