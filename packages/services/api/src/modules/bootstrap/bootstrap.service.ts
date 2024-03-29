import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandBus } from '@nestjs/cqrs';
import { SecurityAttribute } from '../../common/constants/security-attributes.enum';
import { SecurityPolicyRepository } from '../../infrastructure/database/repositories/security-policy/security-policy.repository';
import { UserRepository } from '../../infrastructure/database/repositories/user/user.repository';
import { SecurityPolicyDocument } from '../../infrastructure/database/schemas/security-policy/security-policy.schema';
import { UserDocument } from '../../infrastructure/database/schemas/user/user.schema';
import { CreateUserCommand } from '../user/commands/create-user/create-user.command';
import { CreateUserResponseDto } from '../user/commands/create-user/create-user.response.dto';

@Injectable()
export class BootstrapService {
  private logger: Logger;

  constructor(
    private userRepository: UserRepository,
    private securityPolicyRepository: SecurityPolicyRepository,
    private commandBus: CommandBus,
    private configService: ConfigService,
  ) {
    this.logger = new Logger('BootstrapService');
  }

  async onApplicationBootstrap() {
    const initialUser = await this.findOrCreateInitialUser();
    const adminPolicy = await this.findOrCreateAdminSecurityPolicy();
    await this.securityPolicyRepository.attachSecurityPolicyToUser(
      adminPolicy._id,
      initialUser._id,
    );
  }

  private async findOrCreateInitialUser(): Promise<UserDocument> {
    const initialUser = await this.userRepository.getByUsername(
      this.configService.get('seed_user.username'),
    );

    if (initialUser) {
      return initialUser;
    }

    this.logger.log('create initial user');
    await this.commandBus.execute<CreateUserCommand, CreateUserResponseDto>(
      new CreateUserCommand(
        this.configService.get('seed_user.username'),
        this.configService.get('seed_user.email'),
      ),
    );

    return await this.userRepository.getByUsername(
      this.configService.get('seed_user.username'),
    );
  }

  private async findOrCreateAdminSecurityPolicy(): Promise<SecurityPolicyDocument> {
    const attributes = Object.values(Object.values(SecurityAttribute));
    const adminPolicy =
      await this.securityPolicyRepository.findSecurityPolicyByName('admin');

    if (adminPolicy) {
      const missingAttributes = attributes.filter(
        (attribute) => !adminPolicy.attributes.includes(attribute),
      );
      const removedAttributes = adminPolicy.attributes.filter(
        (attribute) => !attributes.includes(attribute as SecurityAttribute),
      );

      if (missingAttributes.length > 0) {
        this.logger.log(
          'adding missing attributes to admin security policy: ' +
            missingAttributes.join(', '),
        );
        await this.securityPolicyRepository.addAttributesToSecurityPolicy(
          adminPolicy._id,
          missingAttributes,
          true,
        );
      }

      if (removedAttributes.length > 0) {
        this.logger.log(
          'removing old attributes from admin security policy: ' +
            removedAttributes.join(', '),
        );
        await this.securityPolicyRepository.removeAttributesFromSecurityPolicy(
          adminPolicy._id,
          removedAttributes,
          true,
        );
      }
    } else {
      await this.securityPolicyRepository.createSecurityPolicy(
        'admin',
        attributes,
        true,
      );
    }

    return await this.securityPolicyRepository.findSecurityPolicyByName(
      'admin',
    );
  }
}
