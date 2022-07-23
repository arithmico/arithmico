import { createGlobalStyle, DefaultTheme } from "styled-components";

interface GlobalStyleProps {
  fontSize: string;
  theme: DefaultTheme;
  boldFont: boolean;
}

function theme(light: string, dark: string) {
  return ({ theme }: GlobalStyleProps) =>
    theme.type === "light" ? light : dark;
}

function bold(boldValue: string, nonBoldValue: string) {
  return ({ boldFont }: GlobalStyleProps) =>
    boldFont ? boldValue : nonBoldValue;
}

const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
  * {
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }
  
  .os-theme-dark.os-theme-custom > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle {
    background-color: var(--me-background-300);
  }

  .os-theme-dark.os-theme-custom > .os-scrollbar > .os-scrollbar-track {
    background-color: var(--me-background-100);
  }

  input[type="search"]::-webkit-search-decoration,
  input[type="search"]::-webkit-search-cancel-button,
  input[type="search"]::-webkit-search-results-button,
  input[type="search"]::-webkit-search-results-decoration {
    -webkit-appearance:none;
  }

  :root {
    background-color: ${theme("rgb(255, 255, 255)", "#101010")};
    color: ${theme("black", "white")};
    font-size: ${({ fontSize }) => {
      switch (fontSize) {
        case "small":
          return "12px";

        case "medium":
          return "16px";

        case "large":
          return "20px";

        default:
          return "16px";
      }
    }};

    --me-background-100: ${theme("#EBEBEB", "#1C1C1C")};
    --me-background-200: ${theme("#D6D6D6", "#282828")};
    --me-background-300: ${theme("#C2C2C2", "var(--me-background-300-dark)")};
    --me-background-300-dark: #343434;
    --me-background-400: ${theme("#ADADAD", "#404040")};

    --me-text-100: ${theme("#999999", "#707070")};
    --me-text-200: ${theme("#666666", "var(--me-text-200-dark)")};
    --me-text-200-dark: #9F9F9F;
    --me-text-300: ${theme("#333333", "#CFCFCF")};
    --me-text-400: ${theme("#000000", "var(--me-text-400-dark)")};
    --me-text-400-dark: #FFFFFF;  

    --me-error: ${theme("#ff0000", "#fd7c7c")};
    --me-enabled: #f66b00;
    --me-switch-handle: #FFFFFF;

    --me-font-weight-thin: ${bold("400", "200")};
    --me-font-weight-normal: ${bold("700", "300")};
    --me-font-weight-bold: ${bold("900", "400")};
  }
`;

export default GlobalStyle;
