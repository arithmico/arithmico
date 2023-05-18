import { AddAttributesToSecurityPolicyController } from './add-attributes-to-security-policy/add-attributes-to-security-policy.controller';
import { AddAttributesToSecurityPolicyHandler } from './add-attributes-to-security-policy/add-attributes-to-security-policy.handler';
import { CreateSecurityPolicyController } from './create-security-policy/create-security-policy.controller';
import { CreateSecurityPolicyHandler } from './create-security-policy/create-security-policy.handler';
import { RemoveAttributeFromSecurityPolicyController } from './remove-attributes-from-security-policy/remove-attributes-from-security-policy.controller';
import { RemoveAttributeFromSecurityPolicyHandler } from './remove-attributes-from-security-policy/remove-attributes-from-security-policy.handler';

export const commandHandlers = [
  CreateSecurityPolicyHandler,
  AddAttributesToSecurityPolicyHandler,
  RemoveAttributeFromSecurityPolicyHandler,
];

export const commandControllers = [
  CreateSecurityPolicyController,
  AddAttributesToSecurityPolicyController,
  RemoveAttributeFromSecurityPolicyController,
];
