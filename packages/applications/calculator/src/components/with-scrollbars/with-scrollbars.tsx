import "overlayscrollbars/overlayscrollbars.css";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import React from "react";
import { useSelector } from "react-redux";
import { CalculatorRootState } from "../../store/store";

export default function WithScrollbars({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useSelector(
    (state: CalculatorRootState) => state.settings.theme
  );

  return (
    <OverlayScrollbarsComponent
      element={"body"}
      options={{
        showNativeOverlaidScrollbars: false,
        scrollbars: {
          theme: theme === "light" ? "os-theme-dark" : "os-theme-light",
        },
        overflow: {
          x: "hidden",
        },
      }}
      defer={false}
    >
      {children}
    </OverlayScrollbarsComponent>
  );
}
