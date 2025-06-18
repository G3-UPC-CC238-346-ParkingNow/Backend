import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reserva } from './reserva.entity';

@Injectable()
export class ReservaService {
  constructor(
    @InjectRepository(Reserva)
    private readonly reservaRepository: Repository<Reserva>,
  ) {}
  
  async findByLocal(localId: number): Promise<Reserva[]> {
    const reservas = await this.reservaRepository.find({
      where: { local: { id: localId } },
      relations: ['usuario', 'local'],
    });
  
    if (!reservas || reservas.length === 0) {
      throw new NotFoundException(`No se encontraron reservas para el local con ID ${localId}`);
    }
  
    return reservas;
  }

  async findAll(): Promise<Reserva[]> {
    return this.reservaRepository.find({ relations: ['usuario', 'local'] });
  }

  async findOne(id: number): Promise<Reserva> {
    const reserva = await this.reservaRepository.findOne({ where: { id }, relations: ['usuario', 'local'] });
    if (!reserva) {
      throw new NotFoundException(`Reserva con ID ${id} no encontrada`);
    }
    return reserva;
  }

  async create(reservaData: Partial<Reserva>): Promise<Reserva> {
    const newReserva = this.reservaRepository.create(reservaData);
    return this.reservaRepository.save(newReserva);
  }

  async update(id: number, reservaData: Partial<Reserva>): Promise<Reserva> {
    const reserva = await this.findOne(id);
    Object.assign(reserva, reservaData);
    return this.reservaRepository.save(reserva);
  }

  async remove(id: number): Promise<void> {
    const reserva = await this.findOne(id);
    await this.reservaRepository.remove(reserva);
  }
}