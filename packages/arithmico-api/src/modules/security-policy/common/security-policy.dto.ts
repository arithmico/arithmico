export class SecurityPolicyDto {
  id: string;
  name: string;
  readonly: boolean;
  attributes: string[];
  createdAt: Date;
}
