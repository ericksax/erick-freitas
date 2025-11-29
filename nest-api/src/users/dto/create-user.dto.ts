import { IsEmail, IsString, MinLength } from 'class-validator';

export class UserCreateDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @MinLength(6)
  password: string;
}
