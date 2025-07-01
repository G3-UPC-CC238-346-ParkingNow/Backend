import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async login(@Body() loginData: { email: string; password: string }) {
    const { email, password } = loginData;

    if (!email || !password) {
      throw new BadRequestException('Email y contraseña son obligatorios');
    }

    const user = await this.loginService.validateUser(email, password);
    
    if (!user) {
      throw new BadRequestException('Credenciales incorrectas');
    }

    return {
      success: true,
      message: 'Login exitoso',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        tipoUsuario: user.tipoUsuario,
      },
    };
  }
}