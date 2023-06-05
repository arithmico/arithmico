import { GetAvailableSecurityAttributesController } from './get-available-security-attributes/get-available-security-attributes.controller';
import { GetAvailableSecurityAttributesHandler } from './get-available-security-attributes/get-available-security-attributes.handler';
import { GetSecurityPoliciesController } from './get-security-policies/get-security-polices.controller';
import { GetSecurityPoliciesHandler } from './get-security-policies/get-security-policies.handler';
import { GetSecurityPolicyByIdController } from './get-security-policy-by-id/get-security-policy-by-id.controller';
import { GetSecurityPolicyByIdHandler } from './get-security-policy-by-id/get-security-policy-by-id.handler';

export const queryHandlers = [
  GetSecurityPoliciesHandler,
  GetAvailableSecurityAttributesHandler,
  GetSecurityPolicyByIdHandler,
];

export const queryControllers = [
  GetSecurityPoliciesController,
  GetAvailableSecurityAttributesController,
  GetSecurityPolicyByIdController,
];
