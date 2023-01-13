import { useTranslation } from "react-i18next";
import { Context, Options } from "@arithmico/engine/lib/types";
import PageContainer from "@local-components/page-container/page-container";
import WithScrollbars from "@local-components/with-scrollbars/with-scrollbars";
import DefinitionListItem from "@local-components/definition-list-item/definition-list-item";
import { createOptions } from "@arithmico/engine/lib/utils/context-utils";
import { serializeStack } from "@arithmico/engine";
import { useSelector } from "react-redux";
import { CalculatorRootState } from "@stores/calculator-store";
import classNames from "classnames";

export default function Definitions() {
  const context: Context = useSelector((state: CalculatorRootState) => ({
    stack: state.session.stack,
    options: createOptions({
      decimalPlaces: state.settings.decimalPlaces,
      decimalSeparator: state.settings.numberFormat === "de" ? "," : ".",
      magnitudeThresholdForScientificNotation: state.settings.decimalPlaces,
      angleUnit: state.settings.angleUnit as Options["angleUnit"],
    }),
  }));
  const definitions = serializeStack({
    ...context,
    stack: [context.stack.at(-1) ?? {}],
  });
  const [t] = useTranslation();

  return (
    <WithScrollbars>
      <PageContainer>
        <h1
          className={classNames(
            "bold-font:font-bold",
            "font-light",
            "text-4xl",
            "mt-8",
            "pb-6",
            "theme-light:text-black",
            "theme-dark:text-white"
          )}
        >
          {t("definitions")}
        </h1>
        <dl className={classNames("grid", "gap-y-8", "grid-cols-[auto_5fr]")}>
          {Object.entries(definitions).map(([name, definition]) => (
            <DefinitionListItem
              key={name}
              name={name}
              definition={definition}
            />
          ))}
        </dl>
      </PageContainer>
    </WithScrollbars>
  );
}
