import CalculatorForm from "@local-components/calculator-form/calculator-form";
import CalculatorToolbar from "@local-components/calculator-toolbar/calculator-toolbar";
import PageContainer from "@local-components/page-container/page-container";
import classNames from "classnames";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Calculator() {
  const navigate = useNavigate();

  useEffect(() => {
    const hideNews = localStorage.getItem("hide_news");

    if (hideNews !== "true") {
      localStorage.setItem("hide_news", "true");
      navigate("/news");
    }
  });

  return (
    <PageContainer
      className={classNames("grid", "gap-8", "grid-rows-[1fr_auto]")}
    >
      <CalculatorForm />
      <CalculatorToolbar />
    </PageContainer>
  );
}
