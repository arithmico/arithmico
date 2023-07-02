import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import Heading from "../../components/heading/heading";

export default function ApplicationsPage() {
  return (
    <>
      <Heading level={1} className="mt-4">
        <FormattedMessage id="applications.title" />
      </Heading>
      <p>
        <FormattedMessage id="applications.description" />
      </p>
      <Link to="/applications/version-tags">version tags</Link>
      <Link to="/applications/feature-flags">feature flags</Link>
    </>
  );
}
