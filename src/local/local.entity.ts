import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';

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

  @ManyToOne(() => Usuario, (usuario) => usuario.locales, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;
}