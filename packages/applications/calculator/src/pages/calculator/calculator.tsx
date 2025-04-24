import CalculatorForm from "@local-components/calculator-form/calculator-form";
import CalculatorToolbar from "@local-components/calculator-toolbar/calculator-toolbar";
import PageContainer from "@local-components/page-container/page-container";
import classNames from "classnames";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useTitle from "../../hooks/use-title";

export default function Calculator() {
  const navigate = useNavigate();
  const [t] = useTranslation();

  useEffect(() => {
    const hideNews = localStorage.getItem("hide_news");

    if (new Date().getTime() > new Date("2024-12-21T00:00:00.000Z").getTime()) {
      return;
    }

    if (hideNews !== "true") {
      localStorage.setItem("hide_news", "true");
      navigate("/news");
    }
  });

  useTitle(t("nav.calculator").concat(" - Arithmico"));

  return (
    <PageContainer
      className={classNames("grid", "gap-8", "grid-rows-[1fr_auto]")}
    >
      <CalculatorForm />
      <CalculatorToolbar />
    </PageContainer>
  );
}
