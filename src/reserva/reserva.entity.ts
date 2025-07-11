import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';
import { Local } from '../local/local.entity';

export enum TipoVehiculo {
  AUTO = 'auto',
  CAMIONETA = 'camioneta',
  MOTO = 'moto',
  FURGONETA = 'furgoneta',
  BICICLETA = 'bicicleta'
}

export enum EstadoReserva {
  PENDIENTE = 'pendiente',
  CONFIRMADA = 'confirmada',
  EN_CURSO = 'en_curso',
  COMPLETADA = 'completada',
  CANCELADA = 'cancelada',
  EXPIRADA = 'expirada'
}

@Entity('reserva')
export class Reserva {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @ManyToOne(() => Local, (local) => local.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_local' })
  local: Local;

  // === TIEMPOS Y FECHAS ===
  @Column({ name: 'fh_inicio', type: 'timestamp' })
  fh_inicio: Date;

  @Column({ name: 'fh_fin', type: 'timestamp' })
  fh_fin: Date;

  @Column({ name: 'duracion_horas', type: 'decimal', precision: 4, scale: 2 })
  duracion_horas: number;

  // === INFORMACIÓN DEL VEHÍCULO ===
  @Column({ 
    name: 'tipo_vehiculo', 
    type: 'enum', 
    enum: TipoVehiculo,
    default: TipoVehiculo.AUTO 
  })
  tipo_vehiculo: TipoVehiculo;

  @Column({ name: 'placa_vehiculo', type: 'varchar', length: 10, nullable: true })
  placa_vehiculo: string;

  // === INFORMACIÓN DE PRECIOS ===
  @Column({ name: 'precio_por_hora', type: 'decimal', precision: 8, scale: 2 })
  precio_por_hora: number;

  @Column({ name: 'total_pagado', type: 'decimal', precision: 8, scale: 2 })
  total_pagado: number;

  // === ESTADO Y CONTROL ===
  @Column({
    name: 'estado',
    type: 'enum',
    enum: EstadoReserva,
    default: EstadoReserva.PENDIENTE
  })
  estado: EstadoReserva;

  @Column({ name: 'nro_plaza', type: 'int', nullable: true })
  nro_plaza: number;

  // === INFORMACIÓN ADICIONAL ===
  @Column({ name: 'notas', type: 'text', nullable: true })
  notas: string;

  @Column({ name: 'codigo_reserva', type: 'varchar', length: 12, unique: true })
  codigo_reserva: string;

  // === TIMESTAMPS ===
  @Column({ name: 'fecha_creacion', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion: Date;

  @Column({ name: 'fecha_actualizacion', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_actualizacion: Date;

  // === MÉTODOS CALCULADOS ===
  @BeforeInsert()
  @BeforeUpdate()
  calcularTotales(): void {
    // Calcular duración en horas
    if (this.fh_inicio && this.fh_fin) {
      const diffMs = this.fh_fin.getTime() - this.fh_inicio.getTime();
      this.duracion_horas = Number((diffMs / (1000 * 60 * 60)).toFixed(2));
    }

    // Calcular total a pagar
    if (this.duracion_horas && this.precio_por_hora) {
      this.total_pagado = Number((this.duracion_horas * this.precio_por_hora).toFixed(2));
    }

    // Generar código de reserva si no existe
    if (!this.codigo_reserva) {
      this.codigo_reserva = this.generarCodigoReserva();
    }

    this.fecha_actualizacion = new Date();
  }

  // === MÉTODOS AUXILIARES ===
  private generarCodigoReserva(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'PRK-';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  // Verificar si la reserva está activa
  getEstaActiva(): boolean {
    const now = new Date();
    return this.estado === EstadoReserva.EN_CURSO && 
           now >= this.fh_inicio && 
           now <= this.fh_fin;
  }

  // Verificar si la reserva ha expirado
  getHaExpirado(): boolean {
    const now = new Date();
    return now > this.fh_fin && 
           (this.estado === EstadoReserva.CONFIRMADA || this.estado === EstadoReserva.EN_CURSO);
  }

  // Calcular tiempo restante en minutos
  getTiempoRestante(): number {
    if (!this.getEstaActiva()) return 0;
    const now = new Date();
    const diffMs = this.fh_fin.getTime() - now.getTime();
    return Math.max(0, Math.floor(diffMs / (1000 * 60)));
  }

  // Obtener formato legible del tipo de vehículo
  getTipoVehiculoTexto(): string {
    const tipos = {
      [TipoVehiculo.AUTO]: 'Automóvil',
      [TipoVehiculo.CAMIONETA]: 'Camioneta',
      [TipoVehiculo.MOTO]: 'Motocicleta',
      [TipoVehiculo.FURGONETA]: 'Furgoneta',
      [TipoVehiculo.BICICLETA]: 'Bicicleta'
    };
    return tipos[this.tipo_vehiculo] || 'Vehículo';
  }
}