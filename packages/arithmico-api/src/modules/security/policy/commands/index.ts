import { AddAttributesToSecurityPolicyController } from './add-attributes-to-security-policy/add-attributes-to-security-policy.controller';
import { AddAttributesToSecurityPolicyHandler } from './add-attributes-to-security-policy/add-attributes-to-security-policy.handler';
import { CreateSecurityPolicyController } from './create-security-policy/create-security-policy.controller';
import { CreateSecurityPolicyHandler } from './create-security-policy/create-security-policy.handler';

export const commandHandlers = [
  CreateSecurityPolicyHandler,
  AddAttributesToSecurityPolicyHandler,
];

export const commandControllers = [
  CreateSecurityPolicyController,
  AddAttributesToSecurityPolicyController,
];
