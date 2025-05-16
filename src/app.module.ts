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


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'parkingnow',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature(
      getMetadataArgsStorage().tables.map((tbl) => tbl.target as any),
    ),
  ],
  controllers: [AppController, UsuarioController, LocalController, ReservaController],
  providers: [AppService, UsuarioService, LocalService, ReservaService],
})
export class AppModule {}
