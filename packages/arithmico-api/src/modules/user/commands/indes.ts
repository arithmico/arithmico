import { ActivateUserController } from './activate-user/activate-user.controller';
import { ActivateUserCommandHandler } from './activate-user/activate-user.handler';
import { CreateUserController } from './create-user/create-user.controller';
import { CreateUserCommandHandler } from './create-user/create-user.handler';

export const commandHandlers = [
  CreateUserCommandHandler,
  ActivateUserCommandHandler,
];
export const commandControllers = [
  CreateUserController,
  ActivateUserController,
];
