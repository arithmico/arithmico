import styled from 'styled-components';

const Textfield = styled.input.attrs({ type: 'text' })`
  background-color: var(--me-background-100);
  outline: none;
  border: 1px solid var(--me-text-400);
  border-radius: 10px;
  width: 100%;
  min-width: 100px;
  font-size: 2.5em;
  font-weight: 300;
  color: var(--me-text-400);
  padding: 0.6em 0.75em;
`;

export default Textfield;
