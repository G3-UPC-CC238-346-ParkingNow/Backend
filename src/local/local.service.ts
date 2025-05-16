import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Local } from './local.entity';
import { Usuario } from '../usuario/usuario.entity';

@Injectable()
export class LocalService {
  constructor(
    @InjectRepository(Local)
    private readonly localRepository: Repository<Local>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async findAll(): Promise<Local[]> {
    return this.localRepository.find({ relations: ['usuario'] });
  }

  async findOne(id: number): Promise<Local> {
    const local = await this.localRepository.findOne({ where: { id }, relations: ['usuario'] });
    if (!local) {
      throw new NotFoundException(`Local con ID ${id} no encontrado`);
    }
    return local;
  }

  async create(localData: Partial<Local>): Promise<Local> {
    
    if (localData.usuario && localData.usuario.id) {
        const usuario = await this.usuarioRepository.findOne({ where: { id: localData.usuario.id } });
        if (!usuario) {
          throw new NotFoundException(`Usuario con ID ${localData.usuario.id} no encontrado`);
        }
    }

    const newLocal = this.localRepository.create(localData);
    return this.localRepository.save(newLocal);
  }

  async update(id: number, localData: Partial<Local>): Promise<Local> {
    const local = await this.findOne(id);
    Object.assign(local, localData);
    return this.localRepository.save(local);
  }

  async remove(id: number): Promise<void> {
    const local = await this.findOne(id);
    await this.localRepository.remove(local);
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
}