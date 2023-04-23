import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import databaseConfig from './infrastructure/config/database';
import awsConfig from './infrastructure/config/aws';
import jwtConfig from './infrastructure/config/jwt';
import seedUserConfig from './infrastructure/config/seed-user';
import configValidationSchema from './infrastructure/config/config-validation';
import { RouterModule } from '@nestjs/core';
import { DatabaseModule } from './infrastructure/database/database.module';
import { ReleaseModule } from './modules/release/release.module';
import { EmailModule } from './modules/email/email.module';
import { AuthModule } from './modules/auth/auth.module';

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
      load: [databaseConfig, awsConfig, seedUserConfig, jwtConfig],
      validationSchema: configValidationSchema,
      validationOptions: {
        abortEarly: false,
        allowUnknown: true,
      },
    }),
    DatabaseModule,
    RouterModule.register([
      {
        path: 'users',
        module: UserModule,
      },
      {
        path: 'auth',
        module: AuthModule,
      },
    ]),
    UserModule,
    ReleaseModule,
    EmailModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
