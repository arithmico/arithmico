import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from '../../infrastructure/database/database.module';
import { AuthService } from './auth.service';
import { commandControllers, commandHandlers } from './commands';
import { queryControllers, queryHandlers } from './queries';

@Module({
  imports: [
    CqrsModule,
    DatabaseModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('jwt.secret'),
      }),
    }),
  ],
  providers: [...commandHandlers, AuthService, ...queryHandlers],
  controllers: [...commandControllers, ...queryControllers],
  exports: [AuthService],
})
export class AuthModule {}
