import { Context, Options } from "engine/lib/types";
import PageContainer from "@local-components/page-container/page-container";
import WithScrollbars from "@local-components/with-scrollbars/with-scrollbars";
import DefinitionListItem from "@local-components/definition-list-item/definition-list-item";
import { createOptions } from "engine/lib/utils/context-utils";
import { getDefaultContext, serializeStack } from "engine";
import { useSelector } from "react-redux";
import classNames from "classnames";
import { CalculatorRootState } from "../../store/store";
import { DefinitionsHeader } from "./components/definitions-header";

export default function Definitions() {
  const context: Context = useSelector((state: CalculatorRootState) => ({
    stack: state.session.stack,
    methods: getDefaultContext().methods,
    options: createOptions({
      decimalPlaces: state.settings.decimalPlaces,
      decimalSeparator: state.settings.numberFormat === "de" ? "," : ".",
      magnitudeThresholdForScientificNotation: state.settings.decimalPlaces,
      angleUnit: state.settings.angleUnit as Options["angleUnit"],
    }),
  }));
  const definitions = serializeStack({
    ...context,
    stack: [context.stack.at(-1) ?? new Map()],
  });

  return (
    <PageContainer>
      <div
        className={classNames(
          "grid",
          "grid-rows-[auto_1fr]",
          "theme-dark:bg-neutral-850",
          "theme-light:bg-neutral-100",
          "border",
          "theme-dark:border-white/5",
          "theme-light:border-black/10",
          "rounded-md",
          "h-full",
          "overflow-x-hidden",
        )}
      >
        <DefinitionsHeader />
        <WithScrollbars>
          <dl
            className={classNames(
              "mt-4",
              "grid",
              "gap-y-8",
              "grid-cols-[auto_5fr]",
            )}
          >
            {Object.entries(definitions).map(([name, definition]) => (
              <DefinitionListItem
                key={name}
                name={name}
                definition={definition}
              />
            ))}
          </dl>
        </WithScrollbars>
      </div>
    </PageContainer>
  );
}
