import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { LocalService } from './local.service';
import { Local } from './local.entity';
import { Usuario } from '../usuario/usuario.entity';

@Controller('local')
export class LocalController {
  constructor(private readonly localService: LocalService) {}

  @Get()
  async getAllLocales(): Promise<Local[]> {
    return this.localService.findAll();
  }

  @Get(':id')
  async getLocalById(@Param('id') id: number): Promise<Local> {
    return this.localService.findOne(id);
  }

  @Post()
  async createLocal(@Body() localData: Partial<Local>): Promise<Local> {
    return this.localService.create(localData);
  }

  @Put(':id')
  async updateLocal(
    @Param('id') id: number,
    @Body() localData: Partial<Local>,
  ): Promise<Local> {
    return this.localService.update(id, localData);
  }

  @Delete(':id')
  async deleteLocal(@Param('id') id: number): Promise<void> {
    return this.localService.remove(id);
  }

  @Get(':id/usuario')
  async getUsuarioByLocal(@Param('id') id: number): Promise<Usuario> {
    return this.localService.getUsuarioByLocal(id);
  }
}