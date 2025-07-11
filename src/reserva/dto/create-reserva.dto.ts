import { IsDateString, IsNumber, IsOptional, IsEnum, IsString, IsPositive, Min } from 'class-validator';
import { TipoVehiculo } from '../reserva.entity';

export class CreateReservaDto {
  @IsNumber()
  @IsPositive()
  id_local: number;

  @IsDateString()
  fh_inicio: string; // ISO 8601 format: "2024-01-15T14:30:00Z"

  @IsNumber()
  @IsPositive()
  @Min(0.5) // Mínimo 30 minutos
  duracion_horas: number;

  @IsOptional()
  @IsEnum(TipoVehiculo)
  tipo_vehiculo?: TipoVehiculo = TipoVehiculo.AUTO;

  @IsOptional()
  @IsString()
  placa_vehiculo?: string;

  @IsOptional()
  @IsString()
  notas?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  nro_plaza?: number; // Plaza específica solicitada
}
