import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const Container = styled.header`
  background-color: transparent;
  display: flex;
  align-items: center;
  padding: 0 2rem;
`;

const Title = styled.h1`
  margin: 0;
  padding: 1rem 2rem;
  font-size: 2.5rem;
  font-weight: var(--me-font-weight-thin);
  margin-right: auto;

  & > span {
    font-family: Source Code Pro, Monospace, Sans;
    font-weight: var(--me-font-weight-bold);
  }
`;

const Version = styled.span`
  font-size: 1rem;
  padding: 0 1rem;
  color: white;
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
  font-weight: var(--me-font-weight-normal);
  text-decoration: none;
  height: 100%;
  border-radius: 0 0 0.5rem 0.5rem;
  color: ${({ selected }) =>
    selected ? "var(--me-text-400)" : "var(--me-text-200)"};
  background-color: ${({ selected }) =>
    selected ? "var(--me-background-300)" : "inherit"};

  &:hover {
    background-color: var(--me-background-300);
    color: var(--me-text-400);
  }
`;

function NavigationListItem({
  name,
  to,
  hover,
}: {
  name: string;
  to: string;
  hover: boolean;
}) {
  const location = useLocation();

  return (
    <StyledLi>
      <StyledLink to={to} selected={location.pathname === to && !hover}>
        {name}
      </StyledLink>
    </StyledLi>
  );
}

interface HeaderNavBarProps {
  title: string;
  subTitle: string;
  version?: string;
  items: {
    name: string;
    path: string;
  }[];
}

export default function HeaderNavBar({
  title,
  subTitle,
  items,
}: HeaderNavBarProps) {
  const [hover, setHover] = useState(false);

  return (
    <Container>
      <Title>
        {title} <span>{subTitle}</span>
      </Title>
      <Navigation
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <NavigationList>
          {items.map((item) => (
            <NavigationListItem name={item.name} to={item.path} hover={hover} />
          ))}
        </NavigationList>
      </Navigation>
    </Container>
  );
}
