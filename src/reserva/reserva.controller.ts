import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Query } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { Reserva, EstadoReserva } from './reserva.entity';
import { JwtAuthGuard } from '../login/guards/jwt-auth.guard';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { ReservaResponseDto } from './dto/reserva-response.dto';
import { CurrentUser } from '../login/decorators/current-user.decorator';
import { Usuario } from '../usuario/usuario.entity';

@Controller('reserva')
@UseGuards(JwtAuthGuard) // Protege TODAS las rutas del controlador
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) {}

  // Obtener todas las reservas del usuario autenticado
  @Get()
  async getMyReservas(@CurrentUser() usuario: Usuario): Promise<ReservaResponseDto[]> {
    return this.reservaService.findByUsuario(usuario.id);
  }

  // Obtener reservas por estado
  @Get('estado/:estado')
  async getReservasByEstado(
    @Param('estado') estado: EstadoReserva,
    @CurrentUser() usuario: Usuario
  ): Promise<ReservaResponseDto[]> {
    return this.reservaService.findByUsuarioAndEstado(usuario.id, estado);
  }

  // Obtener reservas activas del usuario
  @Get('activas')
  async getReservasActivas(@CurrentUser() usuario: Usuario): Promise<ReservaResponseDto[]> {
    return this.reservaService.findActiveByUsuario(usuario.id);
  }

  // Obtener reservas de un local específico (solo para propietarios)
  @Get('local/:localId')
  async getReservasByLocal(
    @Param('localId') localId: number,
    @CurrentUser() usuario: Usuario
  ): Promise<ReservaResponseDto[]> {
    return this.reservaService.findByLocal(localId, usuario);
  }

  // Obtener historial de reservas
  @Get('historial')
  async getHistorialReservas(
    @Query('limit') limit: number = 10,
    @CurrentUser() usuario: Usuario
  ): Promise<ReservaResponseDto[]> {
    return this.reservaService.findHistorialByUsuario(usuario.id, limit);
  }

  // Obtener reserva específica
  @Get(':id')
  async getReservaById(
    @Param('id') id: number,
    @CurrentUser() usuario: Usuario
  ): Promise<ReservaResponseDto> {
    return this.reservaService.findOne(id, usuario);
  }

  // Crear nueva reserva
  @Post()
  async createReserva(
    @Body() reservaData: CreateReservaDto,
    @CurrentUser() usuario: Usuario
  ): Promise<ReservaResponseDto> {
    return this.reservaService.create(reservaData, usuario);
  }

  // Actualizar reserva
  @Put(':id')
  async updateReserva(
    @Param('id') id: number,
    @Body() reservaData: UpdateReservaDto,
    @CurrentUser() usuario: Usuario
  ): Promise<ReservaResponseDto> {
    return this.reservaService.update(id, reservaData, usuario);
  }

  // Cancelar reserva
  @Put(':id/cancelar')
  async cancelarReserva(
    @Param('id') id: number,
    @CurrentUser() usuario: Usuario
  ): Promise<ReservaResponseDto> {
    return this.reservaService.cancelar(id, usuario);
  }

  // Confirmar llegada (iniciar reserva)
  @Put(':id/iniciar')
  async iniciarReserva(
    @Param('id') id: number,
    @CurrentUser() usuario: Usuario
  ): Promise<ReservaResponseDto> {
    return this.reservaService.iniciar(id, usuario);
  }

  // Finalizar reserva
  @Put(':id/finalizar')
  async finalizarReserva(
    @Param('id') id: number,
    @CurrentUser() usuario: Usuario
  ): Promise<ReservaResponseDto> {
    return this.reservaService.finalizar(id, usuario);
  }

  // Eliminar reserva (solo si está pendiente)
  @Delete(':id')
  async deleteReserva(
    @Param('id') id: number,
    @CurrentUser() usuario: Usuario
  ): Promise<{ message: string }> {
    await this.reservaService.remove(id, usuario);
    return { message: 'Reserva eliminada exitosamente' };
  }

  // Verificar disponibilidad para nueva reserva
  @Post('verificar-disponibilidad')
  async verificarDisponibilidad(
    @Body() data: { id_local: number; fh_inicio: string; duracion_horas: number }
  ): Promise<{ disponible: boolean; plazas_disponibles: number[] }> {
    return this.reservaService.verificarDisponibilidad(
      data.id_local,
      new Date(data.fh_inicio),
      data.duracion_horas
    );
  }
}