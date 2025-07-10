import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Local, EstadoLocal } from './local.entity';
import { Usuario } from '../usuario/usuario.entity';
import { CreateLocalDto } from './dto/create-local.dto';
import { UpdateLocalDto } from './dto/update-local.dto';
import { LocalResponseDto } from './dto/local-response.dto';

@Injectable()
export class LocalService {
  constructor(
    @InjectRepository(Local)
    private readonly localRepository: Repository<Local>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async findAll(soloDisponibles: boolean = false): Promise<LocalResponseDto[]> {
    const query = this.localRepository
      .createQueryBuilder('local')
      .leftJoinAndSelect('local.usuario', 'usuario');

    if (soloDisponibles) {
      query.where('local.estado = :estado', { estado: EstadoLocal.DISPONIBLE })
           .andWhere('local.espacios_disponibles > 0');
    }

    const locales = await query.getMany();
    return locales.map(local => this.toResponseDto(local));
  }

  async findOne(id: number): Promise<LocalResponseDto> {
    const local = await this.localRepository.findOne({ 
      where: { id }, 
      relations: ['usuario'] 
    });
    if (!local) {
      throw new NotFoundException(`Local con ID ${id} no encontrado`);
    }
    return this.toResponseDto(local);
  }

  async findCercanos(latitud: number, longitud: number, radio: number): Promise<LocalResponseDto[]> {
    // Consulta usando la fórmula de distancia de Haversine
    const locales = await this.localRepository
      .createQueryBuilder('local')
      .leftJoinAndSelect('local.usuario', 'usuario')
      .where('local.estado = :estado', { estado: EstadoLocal.DISPONIBLE })
      .andWhere('local.espacios_disponibles > 0')
      .andWhere(`
        (6371000 * acos(
          cos(radians(:lat)) * cos(radians(local.latitud)) * 
          cos(radians(local.longitud) - radians(:lng)) + 
          sin(radians(:lat)) * sin(radians(local.latitud))
        )) <= :radio
      `, { lat: latitud, lng: longitud, radio })
      .orderBy(`
        (6371000 * acos(
          cos(radians(:lat)) * cos(radians(local.latitud)) * 
          cos(radians(local.longitud) - radians(:lng)) + 
          sin(radians(:lat)) * sin(radians(local.latitud))
        ))
      `)
      .setParameters({ lat: latitud, lng: longitud })
      .getMany();

    return locales.map(local => this.toResponseDto(local));
  }

  async create(localData: CreateLocalDto, usuario: Usuario): Promise<LocalResponseDto> {
    // Verificar que el usuario existe
    const usuarioExiste = await this.usuarioRepository.findOne({ 
      where: { id: localData.id_usuario } 
    });
    if (!usuarioExiste) {
      throw new NotFoundException(`Usuario con ID ${localData.id_usuario} no encontrado`);
    }

    // Verificar que el usuario tiene permisos (puede crear en su nombre o es admin)
    if (usuario.id !== localData.id_usuario && usuario.email !== 'admin@parkingnow.com') {
      throw new ForbiddenException('No tienes permisos para crear un local para otro usuario');
    }

    const newLocal = this.localRepository.create({
      ...localData,
      usuario: usuarioExiste,
      espacios_disponibles: localData.plazas - (localData.espacios_ocupados || 0)
    });

    const savedLocal = await this.localRepository.save(newLocal);
    return this.toResponseDto(savedLocal);
  }

  async update(id: number, localData: UpdateLocalDto, usuario: Usuario): Promise<LocalResponseDto> {
    const local = await this.localRepository.findOne({ 
      where: { id }, 
      relations: ['usuario'] 
    });
    
    if (!local) {
      throw new NotFoundException(`Local con ID ${id} no encontrado`);
    }

    // Verificar permisos: solo el propietario o admin puede actualizar
    if (local.usuario.id !== usuario.id && usuario.email !== 'admin@parkingnow.com') {
      throw new ForbiddenException('No tienes permisos para actualizar este local');
    }

    Object.assign(local, localData);
    const updatedLocal = await this.localRepository.save(local);
    return this.toResponseDto(updatedLocal);
  }

  async remove(id: number, usuario: Usuario): Promise<void> {
    const local = await this.localRepository.findOne({ 
      where: { id }, 
      relations: ['usuario'] 
    });
    
    if (!local) {
      throw new NotFoundException(`Local con ID ${id} no encontrado`);
    }

    // Verificar permisos: solo el propietario o admin puede eliminar
    if (local.usuario.id !== usuario.id && usuario.email !== 'admin@parkingnow.com') {
      throw new ForbiddenException('No tienes permisos para eliminar este local');
    }

    await this.localRepository.remove(local);
  }

  async updateDisponibilidad(id: number, espacios_ocupados: number, usuario: Usuario): Promise<LocalResponseDto> {
    const local = await this.localRepository.findOne({ 
      where: { id }, 
      relations: ['usuario'] 
    });
    
    if (!local) {
      throw new NotFoundException(`Local con ID ${id} no encontrado`);
    }

    // Verificar permisos
    if (local.usuario.id !== usuario.id && usuario.email !== 'admin@parkingnow.com') {
      throw new ForbiddenException('No tienes permisos para actualizar la disponibilidad de este local');
    }

    // Validar que no exceda la capacidad
    if (espacios_ocupados > local.plazas) {
      throw new ForbiddenException(`Los espacios ocupados (${espacios_ocupados}) no pueden exceder la capacidad total (${local.plazas})`);
    }

    local.espacios_ocupados = espacios_ocupados;
    const updatedLocal = await this.localRepository.save(local);
    return this.toResponseDto(updatedLocal);
  }

  async getUsuarioByLocal(id: number): Promise<Usuario> {
    const local = await this.localRepository.findOne({
        where: { id },
        relations: ['usuario'], // Carga el usuario asociado
    });
    if (!local) {
        throw new NotFoundException(`Local con ID ${id} no encontrado`);
    }
    return local.usuario;
  }

  // Método privado para convertir Local entity a DTO de respuesta
  private toResponseDto(local: Local): LocalResponseDto {
    return {
      id: local.id,
      nombre: local.nombre,
      direccion: local.direccion,
      telefono: local.telefono,
      plazas: local.plazas,
      rating: local.rating,
      precio_por_hora: local.precio_por_hora,
      latitud: local.latitud,
      longitud: local.longitud,
      espacios_ocupados: local.espacios_ocupados,
      espacios_disponibles: local.espacios_disponibles,
      tiene_camaras: local.tiene_camaras,
      seguridad_24h: local.seguridad_24h,
      techado: local.techado,
      descripcion: local.descripcion,
      estado: local.estado,
      hora_apertura: local.hora_apertura,
      hora_cierre: local.hora_cierre,
      fecha_creacion: local.fecha_creacion,
      fecha_actualizacion: local.fecha_actualizacion,
      
      // Información calculada
      porcentaje_disponibilidad: local.getPorcentajeDisponibilidad(),
      esta_abierto: local.getEstaAbierto(),
      caracteristicas: local.getCaracteristicas(),
      
      // Información del usuario (propietario)
      usuario: {
        id: local.usuario.id,
        nombre: local.usuario.name,
        email: local.usuario.email
      }
    };
  }
}