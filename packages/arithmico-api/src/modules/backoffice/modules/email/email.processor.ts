import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import {
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import * as mailparser from 'mailparser';
import { EmailRepository } from '../../../../infrastructure/database/repositories/email.repository';
import { MessageRepository } from '../../../../infrastructure/database/repositories/message.repository';

@Processor('cron-jobs')
export class EmailProcessor {
  private s3client: S3Client;

  constructor(
    private configService: ConfigService,
    private emailRepository: EmailRepository,
    private messageRepository: MessageRepository,
  ) {
    this.s3client = new S3Client({
      region: 'eu-central-1',
      credentials: {
        accessKeyId: this.configService.get('aws.access_key_id'),
        secretAccessKey: this.configService.get('aws.secret_access_key'),
      },
    });
  }

  @Process('fetch-emails')
  async fetchEmails() {
    Logger.log('scanning for emails', 'FetchEmails');
    const objects = (
      await this.s3client.send(
        new ListObjectsCommand({
          Bucket: this.configService.get('mail.bucket'),
          MaxKeys: 100,
        }),
      )
    ).Contents;

    if (!objects) {
      Logger.log('no new emails', 'FetchEmails');
      return;
    }

    for (const obj of objects) {
      const response = await this.s3client.send(
        new GetObjectCommand({
          Bucket: this.configService.get('mail.bucket'),
          Key: obj.Key,
        }),
      );

      const content = await response.Body.transformToString();
      const emailDocument = await this.emailRepository.create({
        rawEmail: content,
      });

      try {
        const parsedEmail = await mailparser.simpleParser(content);
        const replyTo =
          parsedEmail.replyTo?.value
            .filter((a) => !!a.address)
            .map((a) => a.address)
            .at(0) ??
          parsedEmail.from?.value
            .filter((a) => !!a.address)
            .map((a) => a.address)
            .at(0);

        if (!replyTo) {
          Logger.warn('unable to get reply-to address');
          continue;
        }

        const toAddresses: string[] = [];

        if (Array.isArray(parsedEmail.to)) {
          parsedEmail.to
            .flatMap((address) => address.value)
            .forEach((address) => {
              if (address.address) {
                toAddresses.push(address.address);
              }
            });
        } else {
          parsedEmail.to.value.forEach((address) => {
            if (address.address) {
              toAddresses.push(address.address);
            }
          });
        }

        const internalAddresses = toAddresses.filter((address) =>
          address.endsWith(this.configService.get('mail.domain')),
        );
        const internalAddress = internalAddresses.at(0);

        if (!internalAddress) {
          Logger.warn('no internal address found');
          continue;
        }

        const channel = internalAddress.substring(
          0,
          internalAddress.length -
            this.configService.get('mail.domain').length -
            1,
        );

        this.messageRepository.create({
          channel,
          createdAt: new Date(),
          subject: parsedEmail.subject,
          type: 'external',
          replyTo: replyTo,
          text: parsedEmail.text,
          emailRef: emailDocument._id,
        });
      } catch (e) {
        Logger.warn('failed to process email: ' + e, 'FetchEmails');
      }

      await this.s3client.send(
        new DeleteObjectCommand({
          Bucket: this.configService.get('mail.bucket'),
          Key: obj.Key,
        }),
      );
    }

    Logger.log('finished', 'FetchEmails');
  }
}
