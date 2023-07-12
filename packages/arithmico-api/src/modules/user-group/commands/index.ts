import { CreateUserGroupController } from './create-user-group/create-user-group.controller';
import { CreateUserGroupHandler } from './create-user-group/create-user-group.handler';
import { DeleteUserGroupController } from './delete-user-group/delete-user-group.controller';
import { DeleteUserGroupHandler } from './delete-user-group/delete-user-group.handler';
import { RenameUserGroupController } from './rename-user-group/rename-user-group.controller';
import { RenameUserGroupHandler } from './rename-user-group/rename-user-group.handler';
import { AttachSecurityPolicyToUserGroupController } from './attach-security-policy-to-user-group/attach-security-policy-to-user-group.controller';
import { AttachSecurityPolicyToUserGroupHandler } from './attach-security-policy-to-user-group/attach-security-policy-to-user-group.handler';
import { DetachSecurityPolicyFromUserGroupController } from './detach-security-policy-from-user-group/detach-security-policy-from-user-group.controller';
import { DetachSecurityPolicyFromUserGroupHandler } from './detach-security-policy-from-user-group/detach-security-policy-from-user-group.handler';

export const commandHandlers = [
  CreateUserGroupHandler,
  RenameUserGroupHandler,
  DeleteUserGroupHandler,
  AttachSecurityPolicyToUserGroupHandler,
  DetachSecurityPolicyFromUserGroupHandler,
];

export const commandControllers = [
  CreateUserGroupController,
  RenameUserGroupController,
  DeleteUserGroupController,
  AttachSecurityPolicyToUserGroupController,
  DetachSecurityPolicyFromUserGroupController,
];
