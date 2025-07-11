export class ReservaResponseDto {
  id: number;
  fh_inicio: Date;
  fh_fin: Date;
  duracion_horas: number;
  tipo_vehiculo: string;
  placa_vehiculo?: string;
  precio_por_hora: number;
  total_pagado: number;
  estado: string;
  nro_plaza?: number;
  notas?: string;
  codigo_reserva: string;
  fecha_creacion: Date;
  fecha_actualizacion: Date;

  // Información calculada
  esta_activa: boolean;
  ha_expirado: boolean;
  tiempo_restante_minutos: number;
  tipo_vehiculo_texto: string;

  // Información del usuario
  usuario: {
    id: number;
    nombre: string;
    email: string;
    placa?: string;
  };

  // Información del local
  local: {
    id: number;
    nombre: string;
    direccion: string;
    telefono?: string;
    latitud: number;
    longitud: number;
  };
}
