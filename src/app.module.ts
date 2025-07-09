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
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoginController } from './login/login.controller';
import { LoginService } from './login/login.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './login/strategies/local.strategy';
import { JwtStrategy } from './login/strategies/jwt.strategy';

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
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '24h' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController, UsuarioController, LocalController, ReservaController, LoginController],
  providers: [AppService, UsuarioService, LocalService, ReservaService, LoginService, LocalStrategy, JwtStrategy],
})
export class AppModule {}
