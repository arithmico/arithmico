import { createGlobalStyle } from 'styled-components';

interface GlobalStyleProps {
  fontSize: 'small' | 'normal' | 'large';
}

const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
    * {
        font-size: ${({ fontSize }) => {
          switch (fontSize) {
            case 'small':
              return '12px';

            case 'normal':
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
