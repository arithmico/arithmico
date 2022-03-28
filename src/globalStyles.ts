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

  .os-theme-dark.os-theme-custom > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle {
    background-color: var(--me-background-300);
  }

  .os-theme-dark.os-theme-custom > .os-scrollbar > .os-scrollbar-track {
    background-color: var(--me-background-100);
  }

  :root {
    background-color: #101010;
    color: white;

    --me-background-100: #1C1C1C;
    --me-background-200: #282828;
    --me-background-300: #343434;
    --me-background-400: #404040;

    --me-text-100: #707070;
    --me-text-200: #9F9F9F;
    --me-text-300: #CFCFCF;
    --me-text-400: #FFFFFF;

    --me-error: #fd7c7c;
    --me-enabled: #f66b00;
  }
`;

export default GlobalStyle;
