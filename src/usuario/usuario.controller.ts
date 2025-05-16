import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.entity';
import { Local } from '../local/local.entity';

@Controller('usuario')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) {}

    @Get()
    async getAllUsers(): Promise<Usuario[]> {
      return this.usuarioService.findAll();
    }
  
    @Get(':id')
    async getUserById(@Param('id') id: number): Promise<Usuario> {
      return this.usuarioService.findOne(id);
    }
  
    @Get(':id/locales')
    async getLocalesByUsuario(@Param('id') id: number): Promise<Local[]> {
      return this.usuarioService.getLocalesByUsuario(id);
    }

    @Post()
    async createUser(@Body() userData: Partial<Usuario>): Promise<Usuario> {
      return this.usuarioService.create(userData);
    }
  
    @Put(':id')
    async updateUser(
      @Param('id') id: number,
      @Body() userData: Partial<Usuario>,
    ): Promise<Usuario> {
      return this.usuarioService.update(id, userData);
    }
  
    @Delete(':id')
    async deleteUser(@Param('id') id: number): Promise<void> {
      return this.usuarioService.remove(id);
    }
}
