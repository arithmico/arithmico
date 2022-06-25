import styled from 'styled-components';

const ExternalLink = styled.a.attrs({ target: '_blank', rel: 'noreferrer' })`
  text-decoration: none;
  color: var(--me-text-400);
  opacity: 0.6;
  font-size: inherit;
`;

export default ExternalLink;
