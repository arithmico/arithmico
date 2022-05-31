import styled from 'styled-components';

const PageContainer = styled.div`
  padding: 50px 20%;
  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none; /* for Firefox */

  &::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
  }
`;

export default PageContainer;
