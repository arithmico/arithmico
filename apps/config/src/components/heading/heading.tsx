import styled from "styled-components";

const Heading1 = styled.h1`
  font-weight: var(--me-font-weight-bold);
  font-size: 3rem;
`;

const Heading2 = styled.h2`
  font-weight: var(--me-font-weight-bold);
  font-size: 2.8rem;
`;

const Heading3 = styled.h3`
  font-weight: var(--me-font-weight-bold);
  font-size: 2.4rem;
`;

const Heading4 = styled.h4`
  font-weight: var(--me-font-weight-bold);
  font-size: 2.2rem;
`;

const Heading5 = styled.h5`
  font-weight: var(--me-font-weight-bold);
  font-size: 2rem;
`;
interface HeadingProps {
  type?: 1 | 2 | 3 | 4 | 5;
  children?: React.ReactNode;
}

export default function Heading({ type, children }: HeadingProps) {
  if (!type) {
    return <Heading1>{children}</Heading1>;
  }

  switch (type) {
    case 1:
      return <Heading1>{children}</Heading1>;
    case 2:
      return <Heading2>{children}</Heading2>;
    case 3:
      return <Heading3>{children}</Heading3>;
    case 4:
      return <Heading4>{children}</Heading4>;
    case 5:
      return <Heading5>{children}</Heading5>;
  }
}
