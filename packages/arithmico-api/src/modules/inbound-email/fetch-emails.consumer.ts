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
import { EmailRepository } from '../../infrastructure/database/repositories/email.repository';

@Processor('cron-jobs')
export class InboundEmailProducer {
  private s3client: S3Client;

  constructor(
    private configService: ConfigService,
    private emailRepository: EmailRepository,
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
        }),
      )
    ).Contents;

    for (const obj of objects) {
      const response = await this.s3client.send(
        new GetObjectCommand({
          Bucket: this.configService.get('mail.bucket'),
          Key: obj.Key,
        }),
      );

      const content = await response.Body.transformToString();
      try {
        const parsedEmail = await mailparser.simpleParser(content);
        this.emailRepository.create({
          from: parsedEmail?.from?.value?.at(0).address,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          to: parsedEmail?.to.value.at(0).address,
          subject: parsedEmail.subject,
          content: parsedEmail.text,
        });
      } catch (e) {}

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
