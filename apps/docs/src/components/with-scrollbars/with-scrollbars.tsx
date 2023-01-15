import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import React from 'react';

export default function WithScrollbars({ children }: { children: React.ReactNode }) {
  return (
    <OverlayScrollbarsComponent options={{ className: 'os-theme-dark os-theme-custom' }}>
      {children}
    </OverlayScrollbarsComponent>
  );
}
