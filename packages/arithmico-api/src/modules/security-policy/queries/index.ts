import { GetAvailableSecurityAttributesController } from './get-available-security-attributes/get-available-security-attributes.controller';
import { GetAvailableSecurityAttributesHandler } from './get-available-security-attributes/get-available-security-attributes.handler';
import { GetSecurityPoliciesController } from './get-security-policies/get-security-polices.controller';
import { GetSecurityPoliciesHandler } from './get-security-policies/get-security-policies.handler';
import { GetSecurityPolicyByIdController } from './get-security-policy-by-id/get-security-policy-by-id.controller';
import { GetSecurityPolicyByIdHandler } from './get-security-policy-by-id/get-security-policy-by-id.handler';
import { GetUserGroupsForSecurityPolicyController } from './get-user-groups-for-security-policy/get-user-groups-for-security-policy.controller';
import { GetUserGroupsForSecurityPolicyHandler } from './get-user-groups-for-security-policy/get-user-groups-for-security-policy.handler';
import { GetUsersAttachedToSecurityPolicyController } from './get-users-attached-to-security-policy/get-users-attached-to-security-policy.controller';
import { GetUsersAttachedToSecurityPolicyHandler } from './get-users-attached-to-security-policy/get-users-attached-to-security-policy.handler';

export const queryHandlers = [
  GetSecurityPoliciesHandler,
  GetAvailableSecurityAttributesHandler,
  GetSecurityPolicyByIdHandler,
  GetUsersAttachedToSecurityPolicyHandler,
  GetUserGroupsForSecurityPolicyHandler,
];

export const queryControllers = [
  GetSecurityPoliciesController,
  GetAvailableSecurityAttributesController,
  GetSecurityPolicyByIdController,
  GetUsersAttachedToSecurityPolicyController,
  GetUserGroupsForSecurityPolicyController,
];
