import { GetSecurityPoliciesAttachedToUserController } from './get-security-policies-attached-to-user/get-security-policies-attached-to-user.controller';
import { GetSecurityPoliciesAttachedToUserHandler } from './get-security-policies-attached-to-user/get-security-policies-attached-to-user.handler';
import { GetUserByIdController } from './get-user-by-id/get-user-by-id.controller';
import { GetUserByIdHandler } from './get-user-by-id/get-user-by-id.handler';
import { GetUsersController } from './get-users/get-users.controller';
import { GetUsersQueryHandler } from './get-users/get-users.handler';

export const queryHandlers = [
  GetUsersQueryHandler,
  GetSecurityPoliciesAttachedToUserHandler,
  GetUserByIdHandler,
];

export const queryControllers = [
  GetUsersController,
  GetSecurityPoliciesAttachedToUserController,
  GetUserByIdController,
];
