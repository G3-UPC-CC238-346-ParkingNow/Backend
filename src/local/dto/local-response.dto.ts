export class LocalResponseDto {
  id: number;
  nombre: string;
  direccion: string;
  telefono?: string;
  plazas: number;
  rating: number;
  precio_por_hora: number;
  latitud: number;
  longitud: number;
  espacios_ocupados: number;
  espacios_disponibles: number;
  tiene_camaras: boolean;
  seguridad_24h: boolean;
  techado: boolean;
  descripcion?: string;
  estado: string;
  hora_apertura: string;
  hora_cierre: string;
  fecha_creacion: Date;
  fecha_actualizacion: Date;
  
  // Información calculada
  porcentaje_disponibilidad: number;
  esta_abierto: boolean;
  caracteristicas: string[];
  
  // Información del propietario
  usuario: {
    id: number;
    nombre: string;
    email: string;
  };
}
