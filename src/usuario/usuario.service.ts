import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { Local } from '../local/local.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async findOne(id: number): Promise<Usuario> {
    const user = await this.usuarioRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return user;
  }
  // Crea un nuevo usuario (Dueño y conductor)
  async create(userData: Partial<Usuario>): Promise<Usuario> {
    const newUser = this.usuarioRepository.create(userData);
    return this.usuarioRepository.save(newUser);
  }

  async update(id: number, userData: Partial<Usuario>): Promise<Usuario> {
    const user = await this.findOne(id);
    Object.assign(user, userData);
    return this.usuarioRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.usuarioRepository.remove(user);
  }
  // Obtiene los locales asociados a un usuario específico
  async getLocalesByUsuario(id: number): Promise<Local[]> {
    const usuario = await this.usuarioRepository.findOne({
        where: { id },
        relations: ['locales'], // Carga los locales asociados
    });
    if (!usuario) {
        throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return usuario.locales;
 }

}