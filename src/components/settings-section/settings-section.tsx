import React from 'react';
import styled from 'styled-components';

interface SettingsSectionProps {
  heading: string;
  children: React.ReactNode;
}

const SettingsSectionHeading = styled.h1`
  font-size: 2.5em;
  font-weight: 300;
  margin-bottom: 10px;
  margin-top: 40px;
`;

const SettingsList = styled.ul`
  list-style: none;
  padding: 0 80px;
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
