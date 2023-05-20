import { IsInt, IsPositive, Min } from 'class-validator';

export class GetSecurityPoliciesAttachedToUserQueryDto {
  @IsInt()
  @Min(0)
  skip: number;

  @IsInt()
  @IsPositive()
  limit: number;
}
