import React from 'react';

interface DefinitionListItemProps {
  name: string;
  definition: string;
}

export default function DefinitionListItem({ name, definition }: DefinitionListItemProps) {
  return (
    <>
      <dt>{name}</dt>
      <dd>{definition}</dd>
    </>
  );
}
