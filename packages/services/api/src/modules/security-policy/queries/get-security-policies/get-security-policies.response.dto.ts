import { SecurityPolicyDto } from '../../common/security-policy.dto';

export class GetSecurityPoliciesResponseDtoWithPrincipals extends SecurityPolicyDto {
  principals: number;
}

export class GetSecurityPoliciesResponseDtoWithIsAttached extends SecurityPolicyDto {
  isAttached: boolean;
}
