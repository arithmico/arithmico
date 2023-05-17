import { IsNumber, Max, Min } from 'class-validator';

export class GetSecurityPoliciesRequestDto {
  @IsNumber()
  @Min(0)
  skip: number;

  @IsNumber()
  @Min(1)
  @Max(100)
  limit: number;
}
