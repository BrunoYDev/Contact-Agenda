import { hashSync } from 'bcryptjs';
import { Transform } from 'class-transformer';
import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: "Email",
    type: String,
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: "Senha",
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

}
