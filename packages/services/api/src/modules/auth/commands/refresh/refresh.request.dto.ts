import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshRequestDto {
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
