import { CreateSecurityPolicyController } from './create-security-policy/create-security-policy.controller';
import { CreateSecurityPolicyHandler } from './create-security-policy/create-security-policy.handler';

export const commandHandlers = [CreateSecurityPolicyHandler];
export const commandControllers = [CreateSecurityPolicyController];
