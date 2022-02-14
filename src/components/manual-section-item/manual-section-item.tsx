import React from 'react';

interface ManualSectionItemProps {
  synopsis: string;
  description: string;
}

export default function ManualSectionItem({ synopsis, description }: ManualSectionItemProps) {
  return (
    <>
      <dt>{synopsis}</dt>
      <dd>{description}</dd>
    </>
  );
}
