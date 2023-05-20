import { AddAttributesToSecurityPolicyController } from './add-attributes-to-security-policy/add-attributes-to-security-policy.controller';
import { AddAttributesToSecurityPolicyHandler } from './add-attributes-to-security-policy/add-attributes-to-security-policy.handler';
import { CreateSecurityPolicyController } from './create-security-policy/create-security-policy.controller';
import { CreateSecurityPolicyHandler } from './create-security-policy/create-security-policy.handler';
import { DeleteSecurityPolicyController } from './delete-security-policy/delete-security-policy.controller';
import { DeleteSecurityPolicyHandler } from './delete-security-policy/delete-security-policy.handler';
import { RemoveAttributeFromSecurityPolicyController } from './remove-attributes-from-security-policy/remove-attributes-from-security-policy.controller';
import { RemoveAttributeFromSecurityPolicyHandler } from './remove-attributes-from-security-policy/remove-attributes-from-security-policy.handler';

export const commandHandlers = [
  CreateSecurityPolicyHandler,
  DeleteSecurityPolicyHandler,
  AddAttributesToSecurityPolicyHandler,
  RemoveAttributeFromSecurityPolicyHandler,
];

export const commandControllers = [
  CreateSecurityPolicyController,
  DeleteSecurityPolicyController,
  AddAttributesToSecurityPolicyController,
  RemoveAttributeFromSecurityPolicyController,
];
