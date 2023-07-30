import { IsInt, IsPositive, Max, Min } from 'class-validator';

export class PageParameterQueryDto {
  @IsInt()
  @Min(0)
  skip: number;

  @IsInt()
  @IsPositive()
  @Max(128)
  limit: number;
}
