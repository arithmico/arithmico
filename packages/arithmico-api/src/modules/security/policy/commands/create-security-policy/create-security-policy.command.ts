import { SecurityAttribute } from '../../../../../common/constants/security-attributes.enum';

export class CreateSecurityPolicyCommand {
  constructor(
    public readonly name: string,
    public readonly attributes: SecurityAttribute[],
  ) {}
}
