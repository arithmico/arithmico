import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import Heading from "../../components/heading/heading";

export default function VersionsPage() {
  return (
    <>
      <Heading level={1} className="mt-4">
        <FormattedMessage id="versions.title" />
      </Heading>
      <p>
        <FormattedMessage id="versions.description" />
      </p>
      <Link to="/versions/version-tags">version tags</Link>
    </>
  );
}
