import { hashSync } from 'bcryptjs';
import { Transform } from 'class-transformer';
import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsNotEmpty,
  Matches,
} from 'class-validator';

export class CreateClientDto {
  @ApiProperty({
    description: "Nome completo",
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  fullname: string;

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
  @MinLength(8)
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)
  @Transform(({ value }: { value: string }) => hashSync(value, 10), {
    groups: ['transform'],
  })
  password: string;

  @ApiProperty({
    description: "Numero de celular",
    type: String,
  })
  @IsString()
  @MinLength(11)
  @MaxLength(12)
  @IsNotEmpty()
  cellphone: string;
}
