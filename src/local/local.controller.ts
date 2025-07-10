import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Query } from '@nestjs/common';
import { LocalService } from './local.service';
import { Local } from './local.entity';
import { Usuario } from '../usuario/usuario.entity';
import { JwtAuthGuard } from '../login/guards/jwt-auth.guard';
import { CreateLocalDto } from './dto/create-local.dto';
import { UpdateLocalDto } from './dto/update-local.dto';
import { LocalResponseDto } from './dto/local-response.dto';
import { CurrentUser } from '../login/decorators/current-user.decorator';

@Controller('local')
export class LocalController {
  constructor(private readonly localService: LocalService) {}

  // Obtiene todos los locales disponibles con información completa
  @Get()
  async getAllLocales(@Query('disponibles') disponibles?: string): Promise<LocalResponseDto[]> {
    const soloDisponibles = disponibles === 'true';
    return this.localService.findAll(soloDisponibles);
  }

  // Busca locales cercanos por coordenadas
  @Get('cercanos')
  async getLocalesCercanos(
    @Query('lat') latitud: number,
    @Query('lng') longitud: number,
    @Query('radio') radio: number = 5000, // metros
  ): Promise<LocalResponseDto[]> {
    return this.localService.findCercanos(latitud, longitud, radio);
  }

  // Obtiene la información de un local específico
  @Get(':id')
  async getLocalById(@Param('id') id: number): Promise<LocalResponseDto> {
    return this.localService.findOne(id);
  }

  // Crea un nuevo local (protegido con JWT)
  @UseGuards(JwtAuthGuard)
  @Post()
  async createLocal(
    @Body() localData: CreateLocalDto,
    @CurrentUser() usuario: Usuario
  ): Promise<LocalResponseDto> {
    return this.localService.create(localData, usuario);
  }

  // Actualiza un local existente (protegido con JWT)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateLocal(
    @Param('id') id: number,
    @Body() localData: UpdateLocalDto,
    @CurrentUser() usuario: Usuario
  ): Promise<LocalResponseDto> {
    return this.localService.update(id, localData, usuario);
  }

  // Elimina un local (protegido con JWT)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteLocal(
    @Param('id') id: number,
    @CurrentUser() usuario: Usuario
  ): Promise<{ message: string }> {
    await this.localService.remove(id, usuario);
    return { message: 'Local eliminado exitosamente' };
  }

  // Obtiene el usuario asociado a un local específico (El dueño de estacionamiento)
  @Get(':id/usuario')
  async getUsuarioByLocal(@Param('id') id: number): Promise<Usuario> {
    return this.localService.getUsuarioByLocal(id);
  }

  // Actualiza la disponibilidad en tiempo real
  @UseGuards(JwtAuthGuard)
  @Put(':id/disponibilidad')
  async updateDisponibilidad(
    @Param('id') id: number,
    @Body('espacios_ocupados') espacios_ocupados: number,
    @CurrentUser() usuario: Usuario
  ): Promise<LocalResponseDto> {
    return this.localService.updateDisponibilidad(id, espacios_ocupados, usuario);
  }
}