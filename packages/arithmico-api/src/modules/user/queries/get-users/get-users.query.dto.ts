import { IsNumber, IsPositive, Min } from 'class-validator';

export class GetUserQueryDto {
  @IsNumber()
  @Min(0)
  skip: number;

  @IsNumber()
  @IsPositive()
  limit: number;
}
