import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';
import { Local } from '../local/local.entity';

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

  @Column({ name: 'nro_plaza', type: 'int' })
  nro_plaza: number;

  @Column({ name: 'fh_inicio', type: 'timestamp' })
  fh_inicio: Date;

  @Column({ name: 'fh_fin', type: 'timestamp' })
  fh_fin: Date;
}