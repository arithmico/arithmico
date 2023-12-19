import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Arithmico Docs",
  tagline: "Arithmico Documentation",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://docs.arithmico.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "de",
    locales: ["de"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: "Arithmico Docs",
      logo: {
        alt: "Arithmico Logo",
        src: "img/logo512.png",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Tutorial",
        },
        {
          href: "https://github.com/arithmico/arithmico",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Apps",
          items: [
            {
              label: "Calculator",
              href: "https://arithmico.com",
            },
            {
              label: "Blog",
              href: "https://blog.arithmico.com",
            },
            {
              label: "Docs",
              href: "https://docs.arithmico.com",
            },
          ],
        },
        {
          title: "Dokumentation",
          items: [
            {
              label: "Tutorial",
              to: "/docs/intro",
            },
          ],
        },
        {
          title: "Verschiedenes",
          items: [
            {
              label: "Blog",
              href: "https://blog.arithmico.com",
            },
            {
              label: "GitHub",
              href: "https://github.com/arithmico/arithmico",
            },
            {
              label: "Impressum",
              to: "/imprint",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Arithmico`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
