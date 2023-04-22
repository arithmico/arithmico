import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import databaseConfig from './infrastructure/config/database';
import awsConfig from './infrastructure/config/aws';
import seedUserConfig from './infrastructure/config/seed-user';
import configValidationSchema from './infrastructure/config/config-validation';
import { RouterModule } from '@nestjs/core';
import { DatabaseModule } from './infrastructure/database/database.module';
import { EmailServiceModule } from './infrastructure/email-service/email.module';
import { ReleaseModule } from './modules/release/release.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('database.mongodb_uri'),
        autoIndex: true,
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [databaseConfig, awsConfig, seedUserConfig],
      validationSchema: configValidationSchema,
      validationOptions: {
        abortEarly: false,
        allowUnknown: true,
      },
    }),
    DatabaseModule,
    UserModule,
    RouterModule.register([
      {
        path: 'users',
        module: UserModule,
      },
    ]),
    EmailServiceModule,
    ReleaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
