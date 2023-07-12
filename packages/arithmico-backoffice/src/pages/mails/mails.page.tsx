import { FormattedMessage } from "react-intl";
import Heading from "../../components/heading/heading";

export default function MailsPage() {
  return (
    <>
      <Heading level={1}>
        <FormattedMessage id="mail.title" />
      </Heading>
      <p>
        <FormattedMessage id="mail.description" />
      </p>
    </>
  );
}
