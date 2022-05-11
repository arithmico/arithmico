import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 0 0.75rem;
`;

const Title = styled.h1`
  display: flex;
  font-size: 2.5rem;
  font-weight: 100;
`;

const Superscript = styled.sup`
  padding: 0 10px;
  font-size: 0.75rem;
  font-weight: 100;
  font-style: italic;
`;

const Navigation = styled.nav`
  margin-left: auto;
  height: 100%;
`;

const NavigationList = styled.ul`
  display: flex;
  list-style: none;
  height: 100%;
  margin: 0;
`;

const StyledLi = styled.li`
  display: flex;
  flex-grow: 1;
  height: 100%;
`;

const StyledLink = styled(Link)<{ selected: boolean }>`
  width: 210px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: inherit;
  font-size: 1.5rem;
  text-decoration: none;
  height: 100%;
  border-radius: 0 0 0.5rem 0.5rem;
  color: ${({ selected }) => (selected ? 'var(--me-text-400)' : 'var(--me-text-200)')};
  background-color: ${({ selected }) => (selected ? 'var(--me-background-300)' : 'inherit')};

  &:hover {
    background-color: var(--me-background-300);
    color: var(--me-text-400);
  }
`;

function NavigationListItem({ name, to, hover }: { name: string; to: string; hover: boolean }) {
  const location = useLocation();

  return (
    <StyledLi>
      <StyledLink to={to} selected={location.pathname === to && !hover}>
        {name}
      </StyledLink>
    </StyledLi>
  );
}

export default function Navbar() {
  const [hover, setHover] = useState(false);
  const [t] = useTranslation();

  return (
    <Header>
      <Title>
        Math Explorer <Superscript>neo</Superscript>
      </Title>
      <Navigation onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        <NavigationList>
          <NavigationListItem hover={hover} name={t('nav.calculator')} to="/" />
          <NavigationListItem hover={hover} name={t('nav.settings')} to="/settings" />
          <NavigationListItem hover={hover} name={t('nav.manual')} to="/manual" />
          <NavigationListItem hover={hover} name={t('nav.about')} to="/about" />
        </NavigationList>
      </Navigation>
    </Header>
  );
}
