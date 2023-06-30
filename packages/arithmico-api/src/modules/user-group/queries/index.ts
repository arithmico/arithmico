import { GetSecurityPoliciesAttachedToUserGroupController } from './get-security-policies-attached-to-user-group/get-security-policies-attached-to-user-group.controller';
import { GetSecurityPoliciesAttachedToUserGroupHandler } from './get-security-policies-attached-to-user-group/get-security-policies-attached-to-user-group.handler';
import { GetUserGroupByIdController } from './get-user-group-by-id/get-user-group-by-id.controller';
import { GetUserGroupByIdHandler } from './get-user-group-by-id/get-user-group-by-id.handler';
import { GetUserGroupsController } from './get-user-groups/get-user-groups.controller';
import { GetUserGroupsHandler } from './get-user-groups/get-user-groups.handler';
import { GetUsersForUserGroupController } from './get-users-for-user-group/get-users-for-user-group.controller';
import { GetUsersForUserGroupHandler } from './get-users-for-user-group/get-users-for-user-group.handler';

export const queryHandlers = [
  GetUserGroupsHandler,
  GetUserGroupByIdHandler,
  GetUsersForUserGroupHandler,
  GetSecurityPoliciesAttachedToUserGroupHandler,
];

export const queryControllers = [
  GetUserGroupsController,
  GetUserGroupByIdController,
  GetUsersForUserGroupController,
  GetSecurityPoliciesAttachedToUserGroupController,
];
