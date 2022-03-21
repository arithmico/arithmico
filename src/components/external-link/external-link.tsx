import styled from 'styled-components';

const ExternalLink = styled.a.attrs({ target: '_blank', rel: 'noreferrer' })`
  text-decoration: none;
  color: white;
  opacity: 0.6;
`;

export default ExternalLink;
