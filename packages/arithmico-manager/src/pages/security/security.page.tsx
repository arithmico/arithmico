import { FormattedMessage } from "react-intl";
import Heading from "../../components/heading/heading";

export default function SecurityPage() {
  return (
    <>
      <Heading level={1}>
        <FormattedMessage id="security.title" />
      </Heading>
      <p>
        <FormattedMessage id="security.description" />
      </p>
    </>
  );
}
