import React from 'react';

export default function EmailFooter() {
  return (
    <div
      style={{
        borderTop: '2px solid rgb(235, 235, 235)',
        marginTop: '0.5rem',
        marginBottom: '0.5rem',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <p>
        Arithmico ist ein freies und unabhängiges Open-Source-Projekt. Besuchen
        Sie unsere Website, um mehr über unsere Plattform und unsere anderen
        Apps zu erfahren:
      </p>
      <ul>
        <li>
          <a href="https://blog.arithmico.com">Arithmico Blog</a>
        </li>
        <li>
          <a href="https://calc.arithmico.com">Arithmico Calc</a>
        </li>
        <li>
          <a href="https://docs.arithmico.com">Arithmico Docs</a>
        </li>
      </ul>
    </div>
  );
}
