import React from 'react';
import styled from 'styled-components';
import packageJson from '../../../package.json';
import AboutContact from '../../components/about-contact/about-contact';
import PageContainer from '../../components/page-container/page-container';

const StyledDl = styled.dl`
  font-size: 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;

  & > dd {
    text-align: right;
  }

  & > dt {
    grid-column-start: 2;
    font-weight: 300;
  }
`;

export default function About() {
  return (
    <PageContainer>
      <StyledDl>
        <dd>Version</dd>
        <dt>{packageJson.version}</dt>
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
      </StyledDl>
    </PageContainer>
  );
}
