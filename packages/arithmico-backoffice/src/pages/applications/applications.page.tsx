import { FormattedMessage } from "react-intl";
import Heading from "../../components/heading/heading";
import { LinkCardMenu } from "../../components/link-card-menu/link-card-menu";
import { FunctionIcon } from "../../icons/function.icon";
import { TagIcon } from "../../icons/tag.icon";

export default function ApplicationsPage() {
  return (
    <>
      <Heading level={1} className="mt-4">
        <FormattedMessage id="applications.title" />
      </Heading>
      <p className="my-4">
        <FormattedMessage id="applications.description" />
      </p>
      <LinkCardMenu>
        <LinkCardMenu.Item to="/applications/version-tags">
          <TagIcon className="mr-4 h-8 w-8" />
          Versionstags
        </LinkCardMenu.Item>
        <LinkCardMenu.Item to="/applications/feature-flags">
          <FunctionIcon className="mr-4 h-8 w-8" />
          Funktionen
        </LinkCardMenu.Item>
      </LinkCardMenu>
    </>
  );
}
