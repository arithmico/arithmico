import classNames from "classnames";
import { SimplePage } from "../../components/simple-page/simple-page";
import WithScrollbars from "../../components/with-scrollbars/with-scrollbars";

export default function Home() {
  return (
    <WithScrollbars>
      <SimplePage className={classNames("flex", "flex-col")}>config</SimplePage>
    </WithScrollbars>
  );
}
