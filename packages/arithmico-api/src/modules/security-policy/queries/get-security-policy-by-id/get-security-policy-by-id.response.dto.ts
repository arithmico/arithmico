import { SecurityPolicyDto } from '../../common/security-policy.dto';

export class GetSecurityPolicyByIdResponseDto extends SecurityPolicyDto {
  principals: {
    total: number;
    users: number;
    groups: number;
  };
}
