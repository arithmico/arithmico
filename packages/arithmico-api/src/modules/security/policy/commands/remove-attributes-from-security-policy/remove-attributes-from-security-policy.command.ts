import { SecurityAttribute } from '../../../../../common/constants/security-attributes.enum';

export class RemoveAttributeFromSecurityPolicyCommand {
  constructor(
    public readonly policyId: string,
    public readonly attributes: SecurityAttribute[],
  ) {}
}
