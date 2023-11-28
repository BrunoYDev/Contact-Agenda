import { ApiProperty } from "@nestjs/swagger";
import { IsString,IsEmail,MinLength,MaxLength, IsNotEmpty, IsOptional } from "class-validator";

export class CreateContactDto {
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
    description: "Numero de celular",
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(11)
  @MaxLength(12)
  cellphone: string;
}
