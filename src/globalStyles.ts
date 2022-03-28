import { DefaultTheme } from './styled.d';
import { createGlobalStyle } from 'styled-components';

interface GlobalStyleProps {
  fontSize: string;
  theme: DefaultTheme;
}

function theme(light: string, dark: string) {
  return ({ theme }: GlobalStyleProps) => (theme.type === 'light' ? light : dark);
}

const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
  .os-theme-dark.os-theme-custom > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle {
    background-color: var(--me-background-300);
  }

  .os-theme-dark.os-theme-custom > .os-scrollbar > .os-scrollbar-track {
    background-color: var(--me-background-100);
  }

  :root {
    background-color: ${theme('rgb(255, 255, 255)', '#101010')};
    color: ${theme('black', 'white')};
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
    }};

    --me-background-100: ${theme('#EBEBEB', '#1C1C1C')};
    --me-background-200: ${theme('#D6D6D6', '#282828')};
    --me-background-300: ${theme('#C2C2C2', '#343434')}; 
    --me-background-400: ${theme('#ADADAD', '#404040')};

    --me-text-100: ${theme('#999999', '#707070')};
    --me-text-200: ${theme('#666666', '#9F9F9F')};
    --me-text-300: ${theme('#333333', '#CFCFCF')};
    --me-text-400: ${theme('#000000', '#FFFFFF')};

    --me-error: #fd7c7c;
    --me-enabled: #f66b00;
    --me-switch-handle: #FFFFFF;
  }
`;

export default GlobalStyle;
