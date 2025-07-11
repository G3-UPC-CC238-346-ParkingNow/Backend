import { PartialType } from '@nestjs/mapped-types';
import { CreateReservaDto } from './create-reserva.dto';
import { IsOptional, IsEnum } from 'class-validator';
import { EstadoReserva } from '../reserva.entity';

export class UpdateReservaDto extends PartialType(CreateReservaDto) {
  @IsOptional()
  @IsEnum(EstadoReserva)
  estado?: EstadoReserva;
}
