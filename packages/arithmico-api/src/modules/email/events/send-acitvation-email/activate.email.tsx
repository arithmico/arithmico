import React from 'react';
import { EmailContainer } from '../email-components/email-container';
import EmailFooter from '../email-components/email-footer';
import { EmailHeader } from '../email-components/email-header';

export interface ActivateAccountEmailProps {
  name: string;
  url: string;
}

export function ActivateAccountEmail({ name, url }: ActivateAccountEmailProps) {
  return (
    <EmailContainer>
      <EmailHeader />
      <div
        style={{
          paddingLeft: '1rem',
          paddingRight: '1rem',
        }}
      >
        <p>Sehr geehrte*r {name},</p>
        <p>
          herzlich Willkommen bei Arithmico! Wir freuen uns, dass Sie sich für
          unsere Plattform entschieden haben.
        </p>
        <p>
          Um Ihr Konto zu aktivieren, klicken Sie bitte auf den folgenden Link:
          {url}. Sie werden direkt zur Passwortvergabe aufgefordert. Bitte
          vergeben Sie ein sicheres Passwort und bestätigen Sie dieses.
        </p>
        <p>
          Vielen Dank für Ihr Vertrauen in unsere Plattform. Bei Fragen stehen
          wir Ihnen gerne zur Verfügung.
        </p>
        <p>Beste Grüße,</p>
        <p>Das Arithmico-Team</p>
      </div>
      <EmailFooter />
    </EmailContainer>
  );
}
