import { GetSecurityPoliciesAttachedToUserController } from './get-security-policies-attached-to-user/get-security-policies-attached-to-user.controller';
import { GetSecurityPoliciesAttachedToUserHandler } from './get-security-policies-attached-to-user/get-security-policies-attached-to-user.handler';
import { GetUsersController } from './get-users/get-users.controller';
import { GetUsersQueryHandler } from './get-users/get-users.handler';

export const queryHandlers = [
  GetUsersQueryHandler,
  GetSecurityPoliciesAttachedToUserHandler,
];

export const queryControllers = [
  GetUsersController,
  GetSecurityPoliciesAttachedToUserController,
];
