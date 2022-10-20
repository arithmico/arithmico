import React from "react";
import HeaderNavBar from "@components/header-nav-bar/header-nav-bar";
import { useTranslation } from "react-i18next";

export default function AppHeaderNavBar() {
  const [t] = useTranslation();

  return (
    <HeaderNavBar
      title="Arithmico"
      subTitle="Calc"
      items={[
        {
          name: t("nav.calculator"),
          path: "/",
        },
        {
          name: t("nav.settings"),
          path: "/settings",
        },
        {
          name: t("nav.manual"),
          path: "/manual",
        },
        {
          name: t("nav.about"),
          path: "/about",
        },
      ]}
    />
  );
}
