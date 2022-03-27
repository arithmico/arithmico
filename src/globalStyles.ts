import { createGlobalStyle } from 'styled-components';

interface GlobalStyleProps {
  fontSize: string;
}

const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
    * {
        font-size: ${({ fontSize }) => {
          switch (fontSize) {
            case 'small':
              return '12px';

            case 'medium':
              return '16px';

            case 'large':
              return '20px';

            default:
              return '16px';
          }
        }}
    }
`;

export default GlobalStyle;
