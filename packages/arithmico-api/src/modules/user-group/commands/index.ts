import { CreateUserGroupController } from './create-user-group/create-user-group.controller';
import { CreateUserGroupHandler } from './create-user-group/create-user-group.handler';
import { DeleteUserGroupController } from './delete-user-group/delete-user-group.controller';
import { DeleteUserGroupHandler } from './delete-user-group/delete-user-group.handler';
import { RenameUserGroupController } from './rename-user-group/rename-user-group.controller';
import { RenameUserGroupHandler } from './rename-user-group/rename-user-group.handler';

export const commandHandlers = [
  CreateUserGroupHandler,
  RenameUserGroupHandler,
  DeleteUserGroupHandler,
];

export const commandControllers = [
  CreateUserGroupController,
  RenameUserGroupController,
  DeleteUserGroupController,
];
