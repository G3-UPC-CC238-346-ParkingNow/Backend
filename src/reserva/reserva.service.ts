import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan, LessThan, Between, In } from 'typeorm';
import { Reserva, EstadoReserva, TipoVehiculo } from './reserva.entity';
import { Usuario } from '../usuario/usuario.entity';
import { Local } from '../local/local.entity';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { ReservaResponseDto } from './dto/reserva-response.dto';

@Injectable()
export class ReservaService {
  constructor(
    @InjectRepository(Reserva)
    private readonly reservaRepository: Repository<Reserva>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Local)
    private readonly localRepository: Repository<Local>,
  ) {}

  // === MÉTODOS DE BÚSQUEDA ===

  async findByUsuario(usuarioId: number): Promise<ReservaResponseDto[]> {
    const reservas = await this.reservaRepository.find({
      where: { usuario: { id: usuarioId } },
      relations: ['usuario', 'local'],
      order: { fecha_creacion: 'DESC' }
    });
    return reservas.map(reserva => this.toResponseDto(reserva));
  }

  async findByUsuarioAndEstado(usuarioId: number, estado: EstadoReserva): Promise<ReservaResponseDto[]> {
    const reservas = await this.reservaRepository.find({
      where: { 
        usuario: { id: usuarioId },
        estado: estado
      },
      relations: ['usuario', 'local'],
      order: { fecha_creacion: 'DESC' }
    });
    return reservas.map(reserva => this.toResponseDto(reserva));
  }

  async findActiveByUsuario(usuarioId: number): Promise<ReservaResponseDto[]> {
    const now = new Date();
    console.log('🔍 Buscando reservas activas para usuario:', usuarioId);
    console.log('⏰ Fecha actual:', now);
    
    // Primero busquemos todas las reservas del usuario sin filtros de fecha
    const todasReservas = await this.reservaRepository.find({
      where: { 
        usuario: { id: usuarioId }
      },
      relations: ['usuario', 'local'],
      order: { fh_inicio: 'ASC' }
    });
    console.log('📝 Total reservas del usuario:', todasReservas.length);
    
    // Ahora aplicamos los filtros
    const reservas = await this.reservaRepository.find({
      where: { 
        usuario: { id: usuarioId },
        estado: In([EstadoReserva.PENDIENTE, EstadoReserva.CONFIRMADA, EstadoReserva.EN_CURSO]),
        fh_fin: MoreThan(now)
      },
      relations: ['usuario', 'local'],
      order: { fh_inicio: 'ASC' }
    });
    
    console.log('✅ Reservas activas encontradas:', reservas.length);
    if (reservas.length > 0) {
      console.log('📋 Estados encontrados:', reservas.map(r => r.estado));
    }
    
    return reservas.map(reserva => this.toResponseDto(reserva));
  }

  async findByLocal(localId: number, usuario: Usuario): Promise<ReservaResponseDto[]> {
    // Verificar que el usuario es propietario del local
    const local = await this.localRepository.findOne({
      where: { id: localId },
      relations: ['usuario']
    });

    if (!local) {
      throw new NotFoundException(`Local con ID ${localId} no encontrado`);
    }

    if (local.usuario.id !== usuario.id && usuario.email !== 'admin@parkingnow.com') {
      throw new ForbiddenException('No tienes permisos para ver las reservas de este local');
    }

    const reservas = await this.reservaRepository.find({
      where: { local: { id: localId } },
      relations: ['usuario', 'local'],
      order: { fh_inicio: 'DESC' }
    });

    return reservas.map(reserva => this.toResponseDto(reserva));
  }

  async findHistorialByUsuario(usuarioId: number, limit: number): Promise<ReservaResponseDto[]> {
    const reservas = await this.reservaRepository.find({
      where: { 
        usuario: { id: usuarioId },
        estado: EstadoReserva.COMPLETADA
      },
      relations: ['usuario', 'local'],
      order: { fecha_actualizacion: 'DESC' },
      take: limit
    });
    return reservas.map(reserva => this.toResponseDto(reserva));
  }

  async findOne(id: number, usuario: Usuario): Promise<ReservaResponseDto> {
    const reserva = await this.reservaRepository.findOne({ 
      where: { id }, 
      relations: ['usuario', 'local'] 
    });
    
    if (!reserva) {
      throw new NotFoundException(`Reserva con ID ${id} no encontrada`);
    }

    // Verificar permisos: solo el usuario que hizo la reserva o el dueño del local
    if (reserva.usuario.id !== usuario.id && 
        reserva.local.usuario?.id !== usuario.id && 
        usuario.email !== 'admin@parkingnow.com') {
      throw new ForbiddenException('No tienes permisos para ver esta reserva');
    }

    return this.toResponseDto(reserva);
  }

  // === MÉTODOS DE CREACIÓN Y ACTUALIZACIÓN ===

  async create(reservaData: CreateReservaDto, usuario: Usuario): Promise<ReservaResponseDto> {
    // Verificar que el local existe
    const local = await this.localRepository.findOne({ 
      where: { id: reservaData.id_local },
      relations: ['usuario']
    });
    if (!local) {
      throw new NotFoundException(`Local con ID ${reservaData.id_local} no encontrado`);
    }

    // Calcular fecha de fin
    const fh_inicio = new Date(reservaData.fh_inicio);
    const fh_fin = new Date(fh_inicio.getTime() + (reservaData.duracion_horas * 60 * 60 * 1000));

    // Verificar disponibilidad
    const disponibilidad = await this.verificarDisponibilidad(
      reservaData.id_local,
      fh_inicio,
      reservaData.duracion_horas
    );

    if (!disponibilidad.disponible) {
      throw new BadRequestException('No hay espacios disponibles para el horario solicitado');
    }

    // Asignar plaza automáticamente si no se especificó
    let nro_plaza = reservaData.nro_plaza;
    if (!nro_plaza && disponibilidad.plazas_disponibles.length > 0) {
      nro_plaza = disponibilidad.plazas_disponibles[0];
    }

    const newReserva = this.reservaRepository.create({
      usuario: usuario,
      local: local,
      fh_inicio: fh_inicio,
      fh_fin: fh_fin,
      duracion_horas: reservaData.duracion_horas,
      tipo_vehiculo: reservaData.tipo_vehiculo || TipoVehiculo.AUTO,
      placa_vehiculo: reservaData.placa_vehiculo,
      precio_por_hora: local.precio_por_hora,
      nro_plaza: nro_plaza,
      notas: reservaData.notas,
      estado: EstadoReserva.CONFIRMADA
    });

    const savedReserva = await this.reservaRepository.save(newReserva);
    return this.toResponseDto(savedReserva);
  }

  async update(id: number, reservaData: UpdateReservaDto, usuario: Usuario): Promise<ReservaResponseDto> {
    const reserva = await this.reservaRepository.findOne({ 
      where: { id }, 
      relations: ['usuario', 'local'] 
    });
    
    if (!reserva) {
      throw new NotFoundException(`Reserva con ID ${id} no encontrada`);
    }

    // Verificar permisos
    if (reserva.usuario.id !== usuario.id && usuario.email !== 'admin@parkingnow.com') {
      throw new ForbiddenException('No tienes permisos para actualizar esta reserva');
    }

    // No permitir actualizar reservas ya completadas o canceladas
    if ([EstadoReserva.COMPLETADA, EstadoReserva.CANCELADA].includes(reserva.estado)) {
      throw new BadRequestException('No se puede actualizar una reserva completada o cancelada');
    }

    // Si se cambia la duración, recalcular fecha fin
    if (reservaData.duracion_horas && reservaData.duracion_horas !== reserva.duracion_horas) {
      const nuevaFechFin = new Date(reserva.fh_inicio.getTime() + (reservaData.duracion_horas * 60 * 60 * 1000));
      reserva.fh_fin = nuevaFechFin;
    }

    Object.assign(reserva, reservaData);
    const updatedReserva = await this.reservaRepository.save(reserva);
    return this.toResponseDto(updatedReserva);
  }

  // === MÉTODOS DE CONTROL DE ESTADO ===

  async cancelar(id: number, usuario: Usuario): Promise<ReservaResponseDto> {
    const reserva = await this.reservaRepository.findOne({ 
      where: { id }, 
      relations: ['usuario', 'local'] 
    });
    
    if (!reserva) {
      throw new NotFoundException(`Reserva con ID ${id} no encontrada`);
    }

    if (reserva.usuario.id !== usuario.id) {
      throw new ForbiddenException('No tienes permisos para cancelar esta reserva');
    }

    if (reserva.estado === EstadoReserva.COMPLETADA) {
      throw new BadRequestException('No se puede cancelar una reserva ya completada');
    }

    reserva.estado = EstadoReserva.CANCELADA;
    const updatedReserva = await this.reservaRepository.save(reserva);
    return this.toResponseDto(updatedReserva);
  }

  async iniciar(id: number, usuario: Usuario): Promise<ReservaResponseDto> {
    const reserva = await this.reservaRepository.findOne({ 
      where: { id }, 
      relations: ['usuario', 'local'] 
    });
    
    if (!reserva) {
      throw new NotFoundException(`Reserva con ID ${id} no encontrada`);
    }

    if (reserva.usuario.id !== usuario.id) {
      throw new ForbiddenException('No tienes permisos para iniciar esta reserva');
    }

    if (reserva.estado !== EstadoReserva.CONFIRMADA) {
      throw new BadRequestException('Solo se pueden iniciar reservas confirmadas');
    }

    const now = new Date();
    if (now < reserva.fh_inicio) {
      throw new BadRequestException('La reserva aún no puede iniciarse');
    }

    reserva.estado = EstadoReserva.EN_CURSO;
    const updatedReserva = await this.reservaRepository.save(reserva);
    return this.toResponseDto(updatedReserva);
  }

  async finalizar(id: number, usuario: Usuario): Promise<ReservaResponseDto> {
    const reserva = await this.reservaRepository.findOne({ 
      where: { id }, 
      relations: ['usuario', 'local'] 
    });
    
    if (!reserva) {
      throw new NotFoundException(`Reserva con ID ${id} no encontrada`);
    }

    if (reserva.usuario.id !== usuario.id) {
      throw new ForbiddenException('No tienes permisos para finalizar esta reserva');
    }

    if (reserva.estado !== EstadoReserva.EN_CURSO) {
      throw new BadRequestException('Solo se pueden finalizar reservas en curso');
    }

    reserva.estado = EstadoReserva.COMPLETADA;
    const updatedReserva = await this.reservaRepository.save(reserva);
    return this.toResponseDto(updatedReserva);
  }

  async remove(id: number, usuario: Usuario): Promise<void> {
    const reserva = await this.reservaRepository.findOne({ 
      where: { id }, 
      relations: ['usuario'] 
    });
    
    if (!reserva) {
      throw new NotFoundException(`Reserva con ID ${id} no encontrada`);
    }

    if (reserva.usuario.id !== usuario.id && usuario.email !== 'admin@parkingnow.com') {
      throw new ForbiddenException('No tienes permisos para eliminar esta reserva');
    }

    if (reserva.estado !== EstadoReserva.PENDIENTE) {
      throw new BadRequestException('Solo se pueden eliminar reservas pendientes');
    }

    await this.reservaRepository.remove(reserva);
  }

  // === MÉTODOS AUXILIARES ===

  async verificarDisponibilidad(
    localId: number, 
    fh_inicio: Date, 
    duracion_horas: number
  ): Promise<{ disponible: boolean; plazas_disponibles: number[] }> {
    const local = await this.localRepository.findOne({ where: { id: localId } });
    if (!local) {
      throw new NotFoundException(`Local con ID ${localId} no encontrado`);
    }

    const fh_fin = new Date(fh_inicio.getTime() + (duracion_horas * 60 * 60 * 1000));

    // Buscar reservas que se solapan con el horario solicitado
    const reservasConflicto = await this.reservaRepository.find({
      where: {
        local: { id: localId },
        estado: In([EstadoReserva.CONFIRMADA, EstadoReserva.EN_CURSO]),
        fh_inicio: LessThan(fh_fin),
        fh_fin: MoreThan(fh_inicio)
      }
    });

    // Calcular plazas ocupadas
    const plazasOcupadas = reservasConflicto.map(r => r.nro_plaza).filter(p => p !== null);
    
    // Generar array de todas las plazas disponibles
    const todasLasPlazas = Array.from({ length: local.plazas }, (_, i) => i + 1);
    const plazasDisponibles = todasLasPlazas.filter(plaza => !plazasOcupadas.includes(plaza));

    return {
      disponible: plazasDisponibles.length > 0,
      plazas_disponibles: plazasDisponibles
    };
  }

  private toResponseDto(reserva: Reserva): ReservaResponseDto {
    return {
      id: reserva.id,
      fh_inicio: reserva.fh_inicio,
      fh_fin: reserva.fh_fin,
      duracion_horas: reserva.duracion_horas,
      tipo_vehiculo: reserva.tipo_vehiculo,
      placa_vehiculo: reserva.placa_vehiculo,
      precio_por_hora: reserva.precio_por_hora,
      total_pagado: reserva.total_pagado,
      estado: reserva.estado,
      nro_plaza: reserva.nro_plaza,
      notas: reserva.notas,
      codigo_reserva: reserva.codigo_reserva,
      fecha_creacion: reserva.fecha_creacion,
      fecha_actualizacion: reserva.fecha_actualizacion,

      // Información calculada
      esta_activa: reserva.getEstaActiva(),
      ha_expirado: reserva.getHaExpirado(),
      tiempo_restante_minutos: reserva.getTiempoRestante(),
      tipo_vehiculo_texto: reserva.getTipoVehiculoTexto(),

      // Información del usuario
      usuario: {
        id: reserva.usuario.id,
        nombre: reserva.usuario.name,
        email: reserva.usuario.email,
        placa: reserva.usuario.placa
      },

      // Información del local
      local: {
        id: reserva.local.id,
        nombre: reserva.local.nombre,
        direccion: reserva.local.direccion,
        telefono: reserva.local.telefono,
        latitud: Number(reserva.local.latitud),
        longitud: Number(reserva.local.longitud)
      }
    };
  }
}