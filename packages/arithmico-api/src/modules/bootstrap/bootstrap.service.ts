import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandBus } from '@nestjs/cqrs';
import { UserRepository } from '../../infrastructure/database/repositories/user.repository';
import { CreateUserCommand } from '../user/commands/create-user/create-user.command';
import { CreateUserResponseDto } from '../user/commands/create-user/create-user.response.dto';

@Injectable()
export class BootstrapService {
  constructor(
    private userRepository: UserRepository,
    private commandBus: CommandBus,
    private configService: ConfigService,
  ) {}

  async onApplicationBootstrap() {
    Logger.log('looking for users', 'CreateSeedUserService');
    if (!(await this.userRepository.hasUsers())) {
      Logger.log('create seed user', 'CreateSeedUserService');
      this.commandBus.execute<CreateUserCommand, CreateUserResponseDto>(
        new CreateUserCommand(
          this.configService.get('seed_user.username'),
          this.configService.get('seed_user.email'),
        ),
      );
    }
  }
}
