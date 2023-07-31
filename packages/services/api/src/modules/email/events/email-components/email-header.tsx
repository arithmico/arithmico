import React from 'react';

export function EmailHeader() {
  return (
    <div
      ario-hidden="true"
      style={{
        display: 'flex',
        backgroundColor: 'rgb(235, 235, 235)',
        color: 'black',
        fontSize: '2rem',
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        borderRadius: '0.25rem',
      }}
    >
      <span
        style={{
          fontWeight: 600,
          paddingRight: '0.5rem',
        }}
      >
        Arithmico
      </span>
      <span
        style={{
          fontWeight: 100,
        }}
      >
        Accounts
      </span>
    </div>
  );
}
