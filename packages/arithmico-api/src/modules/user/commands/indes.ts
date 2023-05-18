import { ActivateUserController } from './activate-user/activate-user.controller';
import { ActivateUserCommandHandler } from './activate-user/activate-user.handler';
import { AttachSecurityPolicyToUserController } from './attach-security-policy-to-user/attach-security-policy-to-user.controller';
import { AttachSecurityPolicytouserHandler } from './attach-security-policy-to-user/attach-security-policy-to-user.handler';
import { CreateUserController } from './create-user/create-user.controller';
import { CreateUserCommandHandler } from './create-user/create-user.handler';

export const commandHandlers = [
  CreateUserCommandHandler,
  ActivateUserCommandHandler,
  AttachSecurityPolicytouserHandler,
];
export const commandControllers = [
  CreateUserController,
  ActivateUserController,
  AttachSecurityPolicyToUserController,
];
