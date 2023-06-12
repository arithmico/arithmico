import "overlayscrollbars/overlayscrollbars.css";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import React from "react";

export default function WithScrollbars({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <OverlayScrollbarsComponent
      element={"body"}
      options={{
        showNativeOverlaidScrollbars: false,
        scrollbars: { theme: "os-theme-light os-theme-custom" },
      }}
      defer={false}
    >
      {children}
    </OverlayScrollbarsComponent>
  );
}
