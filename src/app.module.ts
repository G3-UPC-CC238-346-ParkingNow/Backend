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
import { LoginController } from './login/login.controller';
import { LoginService } from './login/login.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as any,
      host: process.env.DATABASE_HOST,
      port: +(process.env.DATABASE_PORT || 5432),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
    }),
    TypeOrmModule.forFeature(
      getMetadataArgsStorage().tables.map((tbl) => tbl.target as any),
    ),
  ],
  controllers: [AppController, UsuarioController, LocalController, ReservaController, LoginController],
  providers: [AppService, UsuarioService, LocalService, ReservaService, LoginService],
})
export class AppModule {}
