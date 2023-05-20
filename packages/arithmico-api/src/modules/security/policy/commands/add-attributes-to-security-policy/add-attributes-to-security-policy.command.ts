import { SecurityAttribute } from '../../../../../common/constants/security-attributes.enum';

export class AddAttributesToSecurityPolicyCommand {
  constructor(
    public readonly policyId: string,
    public readonly attributes: SecurityAttribute[],
  ) {}
}
