import { FormattedMessage } from "react-intl";
import Heading from "../../components/heading/heading";

export default function UsersPage() {
  return (
    <>
      <Heading level={1}>
        <FormattedMessage id="users.title" />
      </Heading>
      <p>
        <FormattedMessage id="users.description" />
      </p>
    </>
  );
}
