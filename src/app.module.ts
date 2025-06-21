import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioController } from './usuario/usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioService } from './usuario/usuario.service';
import { LocalService } from './local/local.service';
import { ReservaService } from './reserva/reserva.service';
import { getMetadataArgsStorage } from 'typeorm';
import { LocalController } from './local/local.controller';
import { ReservaController } from './reserva/reserva.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // para la creacion automática de tablas (solo en desarrollo)
      ssl: {
        rejectUnauthorized: false, // Neon requiere SSL
      },
    }),
    TypeOrmModule.forFeature(
      getMetadataArgsStorage().tables.map((tbl) => tbl.target as any),
    ),
  ],
  controllers: [AppController, UsuarioController, LocalController, ReservaController],
  providers: [AppService, UsuarioService, LocalService, ReservaService],
})
export class AppModule {}
