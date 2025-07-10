import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';

export enum EstadoLocal {
  DISPONIBLE = 'disponible',
  OCUPADO = 'ocupado',
  MANTENIMIENTO = 'mantenimiento',
  CERRADO = 'cerrado'
}

@Entity('playa_estacionamiento')
export class Local {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  direccion: string;

  @Column({ nullable: true })
  telefono: string;

  @Column({ type: 'int', default: 1 })
  plazas: number;

  // === RATING Y PRECIO ===
  @Column({ type: 'decimal', precision: 2, scale: 1, default: 0.0 })
  rating: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.00 })
  precio_por_hora: number;

  // === UBICACIÓN (COORDENADAS) ===
  @Column({ type: 'decimal', precision: 10, scale: 8, default: 0.0 })
  latitud: number;

  @Column({ type: 'decimal', precision: 11, scale: 8, default: 0.0 })
  longitud: number;

  // === DISPONIBILIDAD (SIMULACIÓN) ===
  @Column({ type: 'int', default: 0 })
  espacios_ocupados: number;

  @Column({ type: 'int', default: 0 })
  espacios_disponibles: number;

  // === CARACTERÍSTICAS ===
  @Column({ default: false })
  tiene_camaras: boolean;

  @Column({ default: false })
  seguridad_24h: boolean;

  @Column({ default: false })
  techado: boolean;

  // === INFORMACIÓN ADICIONAL ===
  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({
    type: 'enum',
    enum: EstadoLocal,
    default: EstadoLocal.DISPONIBLE
  })
  estado: EstadoLocal;

  // === HORARIOS ===
  @Column({ type: 'time', default: '06:00:00' })
  hora_apertura: string;

  @Column({ type: 'time', default: '22:00:00' })
  hora_cierre: string;

  // === TIMESTAMPS ===
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_actualizacion: Date;

  // === RELACIONES ===
  @ManyToOne(() => Usuario, (usuario) => usuario.locales, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  // === MÉTODOS CALCULADOS ===
  @BeforeInsert()
  @BeforeUpdate()
  calcularDisponibilidad(): void {
    this.espacios_disponibles = Math.max(0, this.plazas - this.espacios_ocupados);
    this.fecha_actualizacion = new Date();
  }

  // Método para obtener el porcentaje de disponibilidad
  getPorcentajeDisponibilidad(): number {
    if (this.plazas === 0) return 0;
    return Math.round((this.espacios_disponibles / this.plazas) * 100);
  }

  // Método para verificar si está abierto
  getEstaAbierto(): boolean {
    if (this.estado !== EstadoLocal.DISPONIBLE) return false;
    
    const now = new Date();
    const hora_actual = now.toTimeString().slice(0, 5);
    return hora_actual >= this.hora_apertura && hora_actual <= this.hora_cierre;
  }

  // Método para obtener características como array
  getCaracteristicas(): string[] {
    const caracteristicas: string[] = [];
    if (this.tiene_camaras) caracteristicas.push('Cámaras de Seguridad');
    if (this.seguridad_24h) caracteristicas.push('Seguridad 24h');
    if (this.techado) caracteristicas.push('Techado');
    return caracteristicas;
  }
}