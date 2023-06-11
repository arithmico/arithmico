import { GetUserGroupByIdController } from './get-user-group-by-id/get-user-group-by-id.controller';
import { GetUserGroupByIdHandler } from './get-user-group-by-id/get-user-group-by-id.handler';
import { GetUserGroupsController } from './get-user-groups/get-user-groups.controller';
import { GetUserGroupsHandler } from './get-user-groups/get-user-groups.handler';

export const queryHandlers = [GetUserGroupsHandler, GetUserGroupByIdHandler];

export const queryControllers = [
  GetUserGroupsController,
  GetUserGroupByIdController,
];
