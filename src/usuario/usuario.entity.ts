import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate, OneToMany   } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Local } from '../local/local.entity';

export enum TipoUsuario {
    CONDUCTOR = 'conductor',
    DUENO_ESTACIONAMIENTO = 'dueno_estacionamiento',
}

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  placa: string;

  @Column({ nullable: true })
  dni: string;

  @Column({ nullable: true })
  ruc: string;

  @Column({
    name: 'tipo_usuario',
    type: 'enum',
    enum: TipoUsuario,
    default: TipoUsuario.CONDUCTOR,
  })
  tipoUsuario: TipoUsuario;

  @OneToMany(() => Local, (local) => local.usuario)
  locales: Local[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password && !this.password.startsWith('$2a$')) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    this.setTipoUsuario();
  }

  @BeforeInsert()
  @BeforeUpdate()
  setTipoUsuario() {
    if (this.ruc) {
      this.tipoUsuario = TipoUsuario.DUENO_ESTACIONAMIENTO;
    } else {
      this.tipoUsuario = TipoUsuario.CONDUCTOR;
    }
  }
}