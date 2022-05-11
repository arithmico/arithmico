import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import packageJson from '../../../package.json';
import AboutContact from '../../components/about-contact/about-contact';
import ExternalLink from '../../components/external-link/external-link';
import PageContainer from '../../components/page-container/page-container';

const Container = styled(PageContainer)`
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > h1 {
    font-size: 2.5rem;
    font-weight: 300;
    text-align: center;
    margin-top: 3rem;
    margin-bottom: 1.5rem;
  }

  & ul,
  p {
    margin: 0;
  }

  & li {
    margin-bottom: 1rem;
  }
`;

const StyledDl = styled.dl`
  margin: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;

  & > dd {
    font-size: 1.5rem;
    text-align: right;
  }

  & > dt {
    grid-column-start: 2;
    font-weight: 300;
    font-size: 1.5rem;
  }
`;

const StyledLink = styled(Link)`
  color: var(--me-text-400);
`;

export default function About() {
  return (
    <Container>
      <h1>General</h1>
      <StyledDl>
        <dd>Version</dd>
        <dt>{packageJson.version}</dt>
        <dd>License</dd>
        <dt>{packageJson.license}</dt>

        <dd>Author</dd>
        <dt>
          <AboutContact
            name={packageJson.author.name}
            email={packageJson.author.email}
            url={packageJson.author.url}
          />
        </dt>

        <dd>Contributors</dd>
        {packageJson.contributors.map((contributor) => (
          <dt key={contributor.name}>
            <AboutContact
              name={contributor.name}
              email={
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                contributor?.email
              }
            />
          </dt>
        ))}

        <dd>number-cruncher version</dd>
        <dt>{packageJson.dependencies['@behrenle/number-cruncher'].slice(1)}</dt>

        <dd>Report bugs</dd>
        <dt>
          <ExternalLink href={packageJson.bugs.url}>{packageJson.bugs.url}</ExternalLink>
        </dt>
      </StyledDl>
      <h1>Further Information</h1>
      <p>
        <ul>
          <li>
            <StyledLink to="/terms-of-service">Terms of Service</StyledLink>
          </li>
          <li>
            <StyledLink to="/privacy-policy">Privacy Policy</StyledLink>
          </li>
        </ul>
      </p>
    </Container>
  );
}
