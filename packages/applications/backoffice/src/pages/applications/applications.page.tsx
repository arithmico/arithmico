import { FormattedMessage } from "react-intl";
import Heading from "../../components/heading/heading";
import { LinkCardMenu } from "../../components/link-card-menu/link-card-menu";
import { FunctionIcon } from "../../icons/function.icon";
import { SettingsIcon } from "../../icons/settings.icon";
import { TagIcon } from "../../icons/tag.icon";
import { ApplicationsBreadcrumbs } from "./components/applications-breadcrumbs";

export default function ApplicationsPage() {
  return (
    <>
      <ApplicationsBreadcrumbs />
      <Heading level={1} className="mt-4">
        <FormattedMessage id="applications" />
      </Heading>
      <p className="my-4 max-w-5xl">
        <FormattedMessage id="applications.description" />
      </p>
      <LinkCardMenu>
        <LinkCardMenu.Item to="/applications/version-tags">
          <TagIcon className="mr-4 h-8 w-8" />
          <FormattedMessage id="applications.version-tags" />
        </LinkCardMenu.Item>
        <LinkCardMenu.Item to="/applications/feature-flags">
          <FunctionIcon className="mr-4 h-8 w-8" />
          <FormattedMessage id="applications.feature-flags" />
        </LinkCardMenu.Item>
        <LinkCardMenu.Item to="/applications/configurations">
          <SettingsIcon className="mr-4 h-8 w-8" />
          <FormattedMessage id="applications.configurations" />
        </LinkCardMenu.Item>
      </LinkCardMenu>
    </>
  );
}
