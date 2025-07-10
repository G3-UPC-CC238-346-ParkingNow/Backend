import { IsString, IsNumber, IsOptional, IsBoolean, IsEnum, IsPositive, Min, Max } from 'class-validator';
import { EstadoLocal } from '../local.entity';

export class CreateLocalDto {
  @IsString()
  nombre: string;

  @IsString()
  direccion: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsNumber()
  @IsPositive()
  plazas: number;

  @IsNumber()
  @IsPositive()
  precio_por_hora: number;

  @IsNumber()
  @Min(-90)
  @Max(90)
  latitud: number;

  @IsNumber()
  @Min(-180)
  @Max(180)
  longitud: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  espacios_ocupados?: number = 0;

  @IsOptional()
  @IsBoolean()
  tiene_camaras?: boolean = false;

  @IsOptional()
  @IsBoolean()
  seguridad_24h?: boolean = false;

  @IsOptional()
  @IsBoolean()
  techado?: boolean = false;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsEnum(EstadoLocal)
  estado?: EstadoLocal = EstadoLocal.DISPONIBLE;

  @IsOptional()
  @IsString()
  hora_apertura?: string = '06:00:00';

  @IsOptional()
  @IsString()
  hora_cierre?: string = '22:00:00';

  @IsNumber()
  @IsPositive()
  id_usuario: number; // ID del usuario propietario
}
