import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';

export class AuthCredentialsDto {
  @IsOptional()
  @IsString()
  username: string;

  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
