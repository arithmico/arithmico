import React from 'react';

interface EmailContainerProps {
  children: React.ReactNode;
}

export function EmailContainer({ children }: EmailContainerProps) {
  return (
    <html
      style={{
        padding: 0,
        margin: 0,
      }}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        style={{
          fontFamily: 'sans-serif',
          padding: '0.5rem',
          margin: 0,
          boxSizing: 'border-box',
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </body>
    </html>
  );
}
