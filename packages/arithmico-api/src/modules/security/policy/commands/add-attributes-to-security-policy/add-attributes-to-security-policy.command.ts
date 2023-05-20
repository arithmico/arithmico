import { SecurityAttribute } from '../../../../../common/types/security-attributes.enum';

export class AddAttributesToSecurityPolicyCommand {
  constructor(
    public readonly policyId: string,
    public readonly attributes: SecurityAttribute[],
  ) {}
}
