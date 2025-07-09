import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Usuario } from '../usuario/usuario.entity';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<Usuario | null> {
    try {
      // Buscar usuario por email
      const user = await this.usuarioRepository.findOne({
        where: { email },
      });

      // Verificar si el usuario existe y la contraseña es correcta
      if (user && await bcrypt.compare(password, user.password)) {
        return user;
      }

      return null;
    } catch (error) {
      return null;
    }
  }

  async login(user: any) {
    const payload = { 
      email: user.email, 
      sub: user.id, 
      tipoUsuario: user.tipoUsuario 
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        tipoUsuario: user.tipoUsuario,
      },
    };
  }

  async register(registerDto: RegisterDto) {
    // Verificar si el usuario ya existe
    const existingUser = await this.usuarioRepository.findOne({ 
      where: { email: registerDto.email } 
    });
    
    if (existingUser) {
      throw new ConflictException('El email ya está registrado');
    }

    // Crear usuario (el password se hasheará automáticamente en el @BeforeInsert)
    const newUser = this.usuarioRepository.create(registerDto);
    const savedUser = await this.usuarioRepository.save(newUser);
    
    // Retornar token y datos del usuario
    return this.login(savedUser);
  }
}