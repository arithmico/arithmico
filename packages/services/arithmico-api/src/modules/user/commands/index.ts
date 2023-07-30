import { ActivateUserController } from './activate-user/activate-user.controller';
import { ActivateUserCommandHandler } from './activate-user/activate-user.handler';
import { AddUserToUserGroupController } from './add-user-to-user-group/add-user-to-user-group.controller';
import { AddUserToUserGroupHandler } from './add-user-to-user-group/add-user-to-user-group.handler';
import { AttachSecurityPolicyToUserController } from './attach-security-policy-to-user/attach-security-policy-to-user.controller';
import { AttachSecurityPolicytouserHandler } from './attach-security-policy-to-user/attach-security-policy-to-user.handler';
import { CreateUserController } from './create-user/create-user.controller';
import { CreateUserCommandHandler } from './create-user/create-user.handler';
import { DetachSecurityPolicyFromUserController } from './detach-security-policy-from-user/detach-security-policy-from-user.controller';
import { DetachSecurityPolicyFromUserHandler } from './detach-security-policy-from-user/detach-security-policy-from-user.handler';
import { RemoveUserFromUserGroupController } from './remove-user-from-user-group/remove-user-from-user-group.controller';
import { RemoveUserFromUserGroupHandler } from './remove-user-from-user-group/remove-user-from-user-group.handler';

export const commandHandlers = [
  CreateUserCommandHandler,
  ActivateUserCommandHandler,
  AttachSecurityPolicytouserHandler,
  DetachSecurityPolicyFromUserHandler,
  AddUserToUserGroupHandler,
  RemoveUserFromUserGroupHandler,
];
export const commandControllers = [
  CreateUserController,
  ActivateUserController,
  AttachSecurityPolicyToUserController,
  DetachSecurityPolicyFromUserController,
  AddUserToUserGroupController,
  RemoveUserFromUserGroupController,
];
