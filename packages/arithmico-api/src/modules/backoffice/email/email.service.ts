import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import fs from 'fs';

@Injectable()
export class EmailService {
  private sesClient: SESClient;

  constructor(private configService: ConfigService) {
    this.sesClient = new SESClient({
      region: 'eu-west-1',
      credentials: {
        accessKeyId: configService.get('aws.access_key_id'),
        secretAccessKey: configService.get('aws.secret_access_key'),
      },
    });
  }

  public async sendEmail(to: string, subject: string, content: string) {
    if (this.configService.get<string>('mail.mode') === 'prod') {
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
      const serializedMail = JSON.stringify(
        {
          to,
          subject,
          content,
        },
        null,
        2,
      );

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

      const fileName = new Date().toISOString() + '.json';
      const file = await fs.promises.open('./mails/' + fileName, 'w');
      await file.write(serializedMail);
      await file.close();
    }
  }
}
