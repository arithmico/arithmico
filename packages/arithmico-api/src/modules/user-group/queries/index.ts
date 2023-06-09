import { GetUserGroupsController } from './get-user-groups/get-user-groups.controller';
import { GetUserGroupsHandler } from './get-user-groups/get-user-groups.handler';

export const queryHandlers = [GetUserGroupsHandler];
export const queryControllers = [GetUserGroupsController];
