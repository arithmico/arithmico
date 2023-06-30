import { FormattedMessage } from "react-intl";
import Heading from "../../components/heading/heading";

export default function VersionsPage() {
  return (
    <>
      <Heading level={1}>
        <FormattedMessage id="versions.title" />
      </Heading>
      <p>
        <FormattedMessage id="versions.description" />
      </p>
    </>
  );
}
