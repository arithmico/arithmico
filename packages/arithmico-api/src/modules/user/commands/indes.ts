import { CreateUserController } from './create-user/create-user.controller';
import { CreateUserCommandHandler } from './create-user/create-user.handler';

export const commandHandlers = [CreateUserCommandHandler];
export const commandControllers = [CreateUserController];
