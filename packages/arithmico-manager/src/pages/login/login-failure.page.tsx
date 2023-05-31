import classNames from "classnames";
import { Card } from "../../components/card/card";
import Heading from "../../components/heading/heading";
import { SimplePage } from "../../components/simple-page/simple-page";

export function LoginFailurePage() {
  return (
    <SimplePage isPublic>
      <Card className={classNames("max-w-sm")}>
        <Heading>Login gescheitert</Heading>
      </Card>
    </SimplePage>
  );
}
