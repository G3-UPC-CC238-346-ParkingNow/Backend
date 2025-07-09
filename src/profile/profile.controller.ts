import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../login/guards/jwt-auth.guard';

@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  
  @Get()
  getProfile(@Request() req) {
    // req.user contiene los datos del token JWT
    return {
      message: 'Este es tu perfil',
      user: req.user, // { userId: 13, email: "juan@example.com", tipoUsuario: "dueno_estacionamiento" }
    };
  }

  @Post('update')
  updateProfile(@Request() req, @Body() updateData: any) {
    const userId = req.user.userId; // Obtienes el ID del usuario del token
    // Aquí puedes usar userId para actualizar solo los datos del usuario autenticado
    return { 
      message: `Perfil actualizado para usuario ${userId}`, 
      data: updateData 
    };
  }
}
