import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Context, Options } from "@arithmico/engine/lib/types";
import PageContainer from "@local-components/page-container/page-container";
import WithScrollbars from "@local-components/with-scrollbars/with-scrollbars";
import DefinitionListItem from "@local-components/definition-list-item/definition-list-item";
import { createOptions } from "@arithmico/engine/lib/utils/context-utils";
import { getDefaultContext, serializeStack } from "@arithmico/engine";
import { useSelector } from "react-redux";
import { CalculatorRootState } from "@stores/calculator-store";

const Heading = styled.h1`
  font-weight: var(--me-font-weight-normal);
  font-size: 2.5em;
  margin-top: 2em;
  color: var(--me-text-400);
`;

const DefinitionList = styled.dl`
  display: grid;
  grid-row-gap: 2rem;
  grid-template-columns: auto 5fr;

  & > dt,
  dd {
    font-size: 2rem;
    font-weight: var(--me-font-weight-normal);
    font-family: "Source Code Pro", monospace;
    padding-left: 5rem;
  }

  & > dd {
    padding: 0;
  }

  & > dd {
  }

  & > dd::before {
    content: ":=";
    font-family: "Source Code Pro", monospace;
    padding-right: 2rem;
  }
`;

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
  const [t] = useTranslation();

  return (
    <WithScrollbars>
      <PageContainer>
        <Heading>{t("definitions")}</Heading>
        <DefinitionList>
          {Object.entries(definitions).map(([name, definition]) => (
            <DefinitionListItem
              key={name}
              name={name}
              definition={definition}
            />
          ))}
        </DefinitionList>
      </PageContainer>
    </WithScrollbars>
  );
}
