import React from 'react';
import styled from 'styled-components';

interface SettingsSectionProps {
  heading: string;
  children: React.ReactNode;
}

const SettingsSectionHeading = styled.h1`
  font-size: 2.5em;
  font-weight: 300;
  margin-bottom: 0.5em;
  margin-top: 2em;
  color: var(--me-text-400);
`;

const SettingsList = styled.ul`
  list-style: none;
  padding: 0 5rem;
  margin: 0;
`;

export default function SettingsSection({ heading, children }: SettingsSectionProps) {
  return (
    <section>
      <SettingsSectionHeading>{heading}</SettingsSectionHeading>
      <SettingsList>{children}</SettingsList>
    </section>
  );
}
