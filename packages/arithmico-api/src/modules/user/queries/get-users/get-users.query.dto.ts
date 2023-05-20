import { IsInt, IsPositive, Min } from 'class-validator';

export class GetUserQueryDto {
  @IsInt()
  @Min(0)
  skip: number;

  @IsInt()
  @IsPositive()
  limit: number;
}
