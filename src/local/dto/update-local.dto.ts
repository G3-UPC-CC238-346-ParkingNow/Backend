import { PartialType } from '@nestjs/mapped-types';
import { CreateLocalDto } from './create-local.dto';
import { IsOptional, IsNumber, Min, Max } from 'class-validator';

export class UpdateLocalDto extends PartialType(CreateLocalDto) {
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  rating?: number; // Permitir actualizar el rating (0-5 estrellas)

  @IsOptional()
  @IsNumber()
  @Min(0)
  espacios_ocupados?: number; // Para actualizar disponibilidad en tiempo real
}
