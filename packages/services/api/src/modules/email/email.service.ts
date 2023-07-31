import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import fs from 'fs';

@Injectable()
export class EmailService {
  private sesClient: SESClient;
  private readonly isProduction: boolean;

  constructor(private configService: ConfigService) {
    if (this.configService.get<string>('mail.mode') !== 'production') {
      this.isProduction = false;
      return;
    }
    this.isProduction = true;

    const accessKeyId = configService.get('aws.access_key_id') as
      | string
      | undefined;
    const secretAccessKey = configService.get('aws.secret_access_key') as
      | string
      | undefined;

    const credentials = accessKeyId &&
      secretAccessKey && {
        accessKeyId,
        secretAccessKey,
      };

    this.sesClient = new SESClient({
      region: 'eu-west-1',
      credentials,
    });
  }

  public async sendEmail(to: string, subject: string, content: string) {
    if (this.isProduction) {
      const sendEmailCommand: SendEmailCommand = new SendEmailCommand({
        Destination: {
          ToAddresses: [to],
        },
        Message: {
          Subject: {
            Charset: 'UTF-8',
            Data: subject,
          },
          Body: {
            Html: {
              Charset: 'UTF-8',
              Data: content,
            },
          },
        },
        Source: 'noreply@arithmico.com',
      });

      try {
        await this.sesClient.send(sendEmailCommand);
      } catch (error) {
        Logger.error(error);
      }
    } else {
      const serializedMail = `
        <html>
          <p>to: ${to}</p>
          <p>subject: ${subject}</p>
          <p>content:
          <div> 
            ${content.replace(/html/g, 'div')}</p>
          </div>
        </html>
      `;

      await fs.promises
        .stat('./mails')
        .then((value) => {
          if (!value.isDirectory) {
            throw './mails is not a directory';
          }
        })
        .catch(() => {
          return fs.promises.mkdir('./mails');
        });

      const fileName = new Date().toISOString() + '.html';
      const file = await fs.promises.open('./mails/' + fileName, 'w');
      await file.write(serializedMail);
      await file.close();
    }
  }
}
