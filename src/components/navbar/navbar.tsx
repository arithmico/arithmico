import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 0 20px;
`;

const Title = styled.h1`
  display: flex;
  font-size: 2.5em;
  font-weight: 100;
`;

const Superscript = styled.sup`
  padding: 0 10px;
  font-size: 0.75em;
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
  color: white;
  font-size: inherit;
  font-size: 1.5em;
  text-decoration: none;
  height: 100%;
  border-radius: 0 0 10px 10px;
  color: ${({ selected }) => (selected ? 'white' : 'rgba(255, 255, 255, 0.8)')};
  background-color: ${({ selected }) => (selected ? 'rgba(255, 255, 255, 0.15)' : 'inherit')};

  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
    color: white;
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

  return (
    <Header>
      <Title>
        Math Explorer <Superscript>neo</Superscript>
      </Title>
      <Navigation onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        <NavigationList>
          <NavigationListItem hover={hover} name="Calculator" to="/" />
          <NavigationListItem hover={hover} name="Settings" to="/settings" />
          <NavigationListItem hover={hover} name="Manual" to="/manual" />
          <NavigationListItem hover={hover} name="About" to="/about" />
        </NavigationList>
      </Navigation>
    </Header>
  );
}
