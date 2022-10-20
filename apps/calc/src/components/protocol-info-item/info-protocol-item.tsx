import styled from "styled-components";

const Container = styled.li`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 1em;
  padding: 20px;
  border-radius: 0.25em;
  list-style: none;
  border: thin solid var(--me-text-100);
  color: var(--me-text-200);

  & > span {
    font-size: 2em;
  }
`;

export default function ProtocolInfoItem({ message }: { message: string }) {
  return (
    <Container>
      <span>[info]</span>
      <span>{message}</span>
    </Container>
  );
}
