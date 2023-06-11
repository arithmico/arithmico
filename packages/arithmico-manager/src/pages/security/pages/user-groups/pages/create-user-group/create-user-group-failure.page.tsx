import classNames from "classnames";
import { FormattedMessage } from "react-intl";
import { BackButtonLink } from "../../../../../../components/back-button-link/back-button-link";
import { Card } from "../../../../../../components/card/card";
import Heading from "../../../../../../components/heading/heading";

export function CreateUserGroupFailurePage() {
  return (
    <div
      className={classNames(
        "h-full",
        "inset-0",
        "flex",
        "flex-col",
        "items-center",
        "justify-center"
      )}
    >
      <Card>
        <Heading level={1} className={classNames("my-4")}>
          <FormattedMessage id="error.title" />
        </Heading>
        <p className={classNames("mb-4")}>
          <FormattedMessage id="error.description" />
        </p>
        <BackButtonLink
          className={classNames("flex", "justify-center")}
          to={-1}
        />
      </Card>
    </div>
  );
}
