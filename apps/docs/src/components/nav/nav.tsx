import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Chapter } from "../../types";

const Container = styled.nav`
  margin-top: 1.5rem;
`;

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
  padding: 0.5rem 1rem;
  flex: 1;

  &:hover {
    background-color: rgba(0, 0, 0, 0.15);
  }
`;

const StyledUl = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const StyledLi = styled.li`
  margin: 0;
  padding: 0;
  display: flex;
`;

interface NavProps {
  chapters: Chapter[];
}

export default function Nav({ chapters }: NavProps) {
  return (
    <Container>
      <StyledUl>
        {chapters.map((chapter, index) => (
          <StyledLi key={index}>
            <StyledLink to={`/chapters/${index}`}>{chapter.title}</StyledLink>
          </StyledLi>
        ))}
      </StyledUl>
    </Container>
  );
}
