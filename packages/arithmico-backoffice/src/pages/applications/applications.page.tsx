import { FormattedMessage } from "react-intl";
import Heading from "../../components/heading/heading";
import { LinkCardMenu } from "../../components/link-card-menu/link-card-menu";

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
          Versionskennungen
        </LinkCardMenu.Item>
        <LinkCardMenu.Item to="/applications/feature-flags">
          Funktionen
        </LinkCardMenu.Item>
      </LinkCardMenu>
    </>
  );
}
