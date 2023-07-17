import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import appConfig from './infrastructure/config/app';
import redisConfig from './infrastructure/config/redis';
import mailConfig from './infrastructure/config/mail';
import databaseConfig from './infrastructure/config/database';
import awsConfig from './infrastructure/config/aws';
import jwtConfig from './infrastructure/config/jwt';
import seedUserConfig from './infrastructure/config/seed-user';
import githubConfig from './infrastructure/config/github';
import configValidationSchema from './infrastructure/config/config-validation';
import { APP_GUARD, RouterModule } from '@nestjs/core';
import { DatabaseModule } from './infrastructure/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { CacheModule } from '@nestjs/cache-manager';
import { BullModule } from '@nestjs/bull';
import { QueuesModule } from './infrastructure/queues/queues.module';
import { AuthGuard } from './guards/auth.guard';
import { BootstrapModule } from './modules/bootstrap/bootstrap.module';
import { SecurityPolicyModule } from './modules/security-policy/security-policy.module';
import { UserGroupModule } from './modules/user-group/user-group.module';
import { VersionTagModule } from './modules/version-tag/version-tag.module';
import { EmailModule } from './modules/email/email.module';
import { FeatureFlagModule } from './modules/feature-flag/feature-flag.module';
import { CloudfrontModule } from './modules/cloudfront/cloudfront.module';
import { HealthModule } from './modules/health/health.module';

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
      load: [
        appConfig,
        databaseConfig,
        awsConfig,
        seedUserConfig,
        jwtConfig,
        redisConfig,
        mailConfig,
        githubConfig,
      ],
      validationSchema: configValidationSchema,
      validationOptions: {
        abortEarly: false,
        allowUnknown: true,
      },
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get<string>('redis.host'),
          port: configService.get<number>('redis.port'),
        },
      }),
    }),
    CacheModule.register({
      isGlobal: true,
      ttl: 10000, // 10s
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
      {
        path: 'security-policies',
        module: SecurityPolicyModule,
      },
      {
        path: 'user-groups',
        module: UserGroupModule,
      },
      {
        path: 'version-tags',
        module: VersionTagModule,
      },
      {
        path: 'feature-flags',
        module: FeatureFlagModule,
      },
      {
        path: 'health',
        module: HealthModule,
      },
    ]),
    UserModule,
    AuthModule,
    QueuesModule,
    EmailModule,
    SecurityPolicyModule,
    BootstrapModule,
    UserGroupModule,
    VersionTagModule,
    FeatureFlagModule,
    CloudfrontModule,
    HealthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
