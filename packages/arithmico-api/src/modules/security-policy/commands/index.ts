import { CreateSecurityPolicyController } from './create-security-policy/create-security-policy.controller';
import { CreateSecurityPolicyHandler } from './create-security-policy/create-security-policy.handler';
import { DeleteSecurityPolicyController } from './delete-security-policy/delete-security-policy.controller';
import { DeleteSecurityPolicyHandler } from './delete-security-policy/delete-security-policy.handler';
import { RenameSecurityPolicyController } from './rename-security-policy/rename-security-policy.controller';
import { RenameSecurityPolicyHandler } from './rename-security-policy/rename-security-policy.handler';
import { SetSecurityPolicyAttributesController } from './set-policy-attributes/set-security-policy-attributes.controller';
import { SetSecurityPolicyAttributesHandler } from './set-policy-attributes/set-security-policy-attributes.handler';

export const commandHandlers = [
  CreateSecurityPolicyHandler,
  DeleteSecurityPolicyHandler,
  SetSecurityPolicyAttributesHandler,
  RenameSecurityPolicyHandler,
];

export const commandControllers = [
  CreateSecurityPolicyController,
  DeleteSecurityPolicyController,
  SetSecurityPolicyAttributesController,
  RenameSecurityPolicyController,
];
