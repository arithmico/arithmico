import classNames from "classnames";
import { FormattedMessage } from "react-intl";
import { Card } from "../../../../../../../components/card/card";
import Heading from "../../../../../../../components/heading/heading";

export function UserGroupDetailsCard() {
  return (
    <Card className={classNames("max-w-5xl")}>
      <Heading level={2}>
        <FormattedMessage id="security.user-groups.details.title" />
      </Heading>
    </Card>
  );
}
