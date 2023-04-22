import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandBus } from '@nestjs/cqrs';
import { UserRepository } from '../../infrastructure/database/repositories/user.repository';
import { CreateUserCommand } from './commands/create-user/create-user.command';

@Injectable()
export class CreateSeedUserService implements OnApplicationBootstrap {
  constructor(
    private userRepository: UserRepository,
    private commandBus: CommandBus,
    private configService: ConfigService,
  ) {}

  async onApplicationBootstrap() {
    Logger.log('looking for users', 'CreateSeedUserService');
    if (!(await this.userRepository.hasUsers())) {
      Logger.log('create seed user', 'CreateSeedUserService');
      this.commandBus.execute(
        new CreateUserCommand(
          this.configService.get('seed_user.username'),
          this.configService.get('seed_user.email'),
        ),
      );
    }
  }
}
