import { GetSecurityPoliciesController } from './get-security-policies/get-security-polices.controller';
import { GetSecurityPoliciesHandler } from './get-security-policies/get-security-policies.handler';

export const queryHandlers = [GetSecurityPoliciesHandler];
export const queryControllers = [GetSecurityPoliciesController];
