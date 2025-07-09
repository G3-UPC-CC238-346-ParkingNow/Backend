import { IsEmail, IsNotEmpty, IsOptional, IsEnum, MinLength } from 'class-validator';
import { TipoUsuario } from '../../usuario/usuario.entity';

export class RegisterDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsOptional()
  placa?: string;

  @IsOptional()
  dni?: string;

  @IsOptional()
  ruc?: string;

  @IsOptional()
  @IsEnum(TipoUsuario)
  tipoUsuario?: TipoUsuario;
}
