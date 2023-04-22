import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

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
          Text: {
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
  }
}
