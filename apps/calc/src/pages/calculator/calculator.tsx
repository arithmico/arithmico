import CalculatorTextfields from "@local-components/calculator-textfields/calculator-textfields";
import CalculatorToolbar from "@local-components/calculator-toolbar/calculator-toolbar";
import PageContainer from "@local-components/page-container/page-container";
import classNames from "classnames";

export default function Calculator() {
  return (
    <PageContainer
      className={classNames("grid", "gap-8", "grid-rows-[1fr_auto]")}
    >
      <CalculatorTextfields />
      <CalculatorToolbar />
    </PageContainer>
  );
}
