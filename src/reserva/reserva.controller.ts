import { Controller, Get, Post, Put, Delete, Param, Body, BadRequestException, UseGuards } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { Reserva } from './reserva.entity';
import { JwtAuthGuard } from '../login/guards/jwt-auth.guard';

@Controller('reserva')
@UseGuards(JwtAuthGuard) // Protege TODAS las rutas del controlador
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) {}

  @Get()
  async getAllReservas(): Promise<Reserva[]> {
    return this.reservaService.findAll();
  }
  
  @Get('/local/:localId')
  async getReservasByLocal(@Param('localId') localId: number): Promise<Reserva[]> {
    return this.reservaService.findByLocal(localId);
  }

  @Get(':id')
  async getReservaById(@Param('id') id: number): Promise<Reserva> {
    return this.reservaService.findOne(id);
  }

  @Post()
  async createReserva(@Body() reservaData: Partial<Reserva>): Promise<Reserva> {
    if (!reservaData.nro_plaza) {
        throw new BadRequestException('El número de plaza es obligatorio.');
      }
      if (!reservaData.fh_inicio || !reservaData.fh_fin) {
        throw new BadRequestException('Las fechas de reserva son obligatorias.');
      }
    return this.reservaService.create(reservaData);
  }

  @Put(':id')
  async updateReserva(
    @Param('id') id: number,
    @Body() reservaData: Partial<Reserva>,
  ): Promise<Reserva> {
    return this.reservaService.update(id, reservaData);
  }

  @Delete(':id')
  async deleteReserva(@Param('id') id: number): Promise<void> {
    return this.reservaService.remove(id);
  }
}