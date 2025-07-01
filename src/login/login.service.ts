import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async validateUser(email: string, password: string): Promise<Usuario | null> {
    try {
      // Buscar usuario por email
      const user = await this.usuarioRepository.findOne({
        where: { email },
      });

      // Verificar si el usuario existe y la contraseña es correcta
      if (user && user.password === password) {
        return user;
      }

      return null;
    } catch (error) {
      return null;
    }
  }
}