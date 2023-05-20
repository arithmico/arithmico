import { SecurityAttribute } from '../../../../../common/types/security-attributes.enum';

export class RemoveAttributeFromSecurityPolicyCommand {
  constructor(
    public readonly policyId: string,
    public readonly attributes: SecurityAttribute[],
  ) {}
}
