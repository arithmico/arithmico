import { SecurityPolicyDto } from '../../common/security-policy.dto';

export class GetSecurityPoliciesResponseDto extends SecurityPolicyDto {
  principals: number;
}
