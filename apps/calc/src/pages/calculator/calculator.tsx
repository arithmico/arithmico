import CalculatorForm from "@local-components/calculator-form/calculator-form";
import CalculatorToolbar from "@local-components/calculator-toolbar/calculator-toolbar";
import PageContainer from "@local-components/page-container/page-container";
import classNames from "classnames";

export default function Calculator() {
  return (
    <PageContainer
      className={classNames("grid", "gap-8", "grid-rows-[1fr_auto]")}
    >
      <CalculatorForm />
      <CalculatorToolbar />
    </PageContainer>
  );
}
