import React from "react";
import styled from "styled-components";
import { Disclosure } from "@headlessui/react";
import ExpandMore from "@components/icons/expand-more";
import ManualSectionItem from "@local-components/manual-section-item/manual-section-item";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 2em;
  margin-bottom: 0.5em;
`;

const PluginTitle = styled.h1`
  font-size: 2.5em;
  font-weight: var(--me-font-weight-normal);
  color: var(--me-text-400);
  margin: 0;
`;

const PluginObjectsList = styled.dl`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const DisclosureButton = styled(Disclosure.Button)<{
  open: boolean;
  children: React.ReactNode /* idk why styled components does not get the children property*/;
}>`
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0;
  background-color: transparent;
  border: none;
  border-bottom: ${({ open }) =>
    open ? "none" : "1px solid var(--me-text-100)"};
  outline: none;
`;

const ExpandMoreIcon = styled(ExpandMore)<{ open: boolean }>`
  transform: rotate(${({ open }) => (open ? "180" : "0")}deg);
  margin-left: auto;
  transition: transform 0.25s;
`
interface ManualSectionProps {
  name: string;
  children: React.ReactNode;
}

export default function ManualSection({ name, children }: ManualSectionProps) {
  return (
    <Section>
      <Disclosure>
        {({ open }) => (
          <>
            <DisclosureButton open={open}>
              <PluginTitle>{name}</PluginTitle>
              <ExpandMoreIcon open={open} />
            </DisclosureButton>
            <Disclosure.Panel>
              <PluginObjectsList>
                {children}
              </PluginObjectsList>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </Section>
  );
}
