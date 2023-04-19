import { GetUsersController } from './get-users/get-users.controller';
import { GetUsersQueryHandler } from './get-users/get-users.handler';

export const queryHandlers = [GetUsersQueryHandler];
export const queryControllers = [GetUsersController];
