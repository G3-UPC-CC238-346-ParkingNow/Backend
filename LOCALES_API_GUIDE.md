# API de Locales (Playas de Estacionamiento) - Guía de Uso

## Características Ampliadas

La entidad `Local` ahora incluye:

### Campos Básicos
- `nombre`: Nombre del estacionamiento
- `direccion`: Dirección física
- `telefono`: Número de contacto (opcional)
- `plazas`: Capacidad total de vehículos

### Rating y Precio
- `rating`: Calificación promedio (0-5 estrellas)
- `precio_por_hora`: Precio por hora en moneda local

### Ubicación (Coordenadas)
- `latitud`: Coordenada de latitud
- `longitud`: Coordenada de longitud

### Disponibilidad en Tiempo Real
- `espacios_ocupados`: Espacios actualmente ocupados
- `espacios_disponibles`: Espacios disponibles (calculado automáticamente)

### Servicios y Características
- `tiene_camaras`: Cámaras de seguridad
- `seguridad_24h`: Seguridad las 24 horas
- `techado`: Estacionamiento techado

### Información Adicional
- `descripcion`: Descripción detallada (opcional)
- `estado`: Estado del local (disponible, ocupado, mantenimiento, cerrado)
- `hora_apertura`: Hora de apertura (formato HH:MM:SS)
- `hora_cierre`: Hora de cierre (formato HH:MM:SS)

## Endpoints Disponibles

### 1. Obtener Todos los Locales
```http
GET /local
GET /local?disponibles=true
```

**Respuesta:**
```json
[
  {
    "id": 1,
    "nombre": "Estacionamiento Centro",
    "direccion": "Calle Principal 123",
    "telefono": "555-0123",
    "plazas": 50,
    "rating": 4.5,
    "precio_por_hora": 2.50,
    "latitud": -12.046374,
    "longitud": -77.042793,
    "espacios_ocupados": 30,
    "espacios_disponibles": 20,
    "tiene_camaras": true,
    "seguridad_24h": true,
    "techado": false,
    "descripcion": "Estacionamiento seguro en el centro de la ciudad",
    "estado": "disponible",
    "hora_apertura": "06:00:00",
    "hora_cierre": "22:00:00",
    "fecha_creacion": "2024-01-15T10:30:00Z",
    "fecha_actualizacion": "2024-01-15T15:45:00Z",
    "porcentaje_disponibilidad": 40,
    "esta_abierto": true,
    "caracteristicas": ["Cámaras de Seguridad", "Seguridad 24h"],
    "usuario": {
      "id": 2,
      "nombre": "María García",
      "email": "maria@example.com"
    }
  }
]
```

### 2. Buscar Locales Cercanos
```http
GET /local/cercanos?lat=-12.046374&lng=-77.042793&radio=5000
```

**Parámetros:**
- `lat`: Latitud actual
- `lng`: Longitud actual
- `radio`: Radio de búsqueda en metros (default: 5000)

### 3. Obtener Local por ID
```http
GET /local/1
```

### 4. Crear Nuevo Local (Requiere JWT)
```http
POST /local
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "nombre": "Mi Estacionamiento",
  "direccion": "Av. Ejemplo 456",
  "telefono": "555-0456",
  "plazas": 30,
  "precio_por_hora": 3.00,
  "latitud": -12.046374,
  "longitud": -77.042793,
  "tiene_camaras": true,
  "seguridad_24h": false,
  "techado": true,
  "descripcion": "Estacionamiento techado con cámaras",
  "hora_apertura": "07:00:00",
  "hora_cierre": "20:00:00",
  "id_usuario": 2
}
```

### 5. Actualizar Local (Requiere JWT)
```http
PUT /local/1
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "precio_por_hora": 3.50,
  "espacios_ocupados": 25,
  "rating": 4.2,
  "descripcion": "Descripción actualizada"
}
```

### 6. Actualizar Solo Disponibilidad (Requiere JWT)
```http
PUT /local/1/disponibilidad
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "espacios_ocupados": 35
}
```

### 7. Eliminar Local (Requiere JWT)
```http
DELETE /local/1
Authorization: Bearer <jwt_token>
```

### 8. Obtener Propietario del Local
```http
GET /local/1/usuario
```

## Permisos y Seguridad

### Operaciones Públicas
- ✅ Ver todos los locales
- ✅ Ver local específico
- ✅ Buscar locales cercanos
- ✅ Ver propietario del local

### Operaciones Protegidas (Requieren JWT)
- 🔒 Crear local
- 🔒 Actualizar local (solo propietario o admin)
- 🔒 Eliminar local (solo propietario o admin)
- 🔒 Actualizar disponibilidad (solo propietario o admin)

### Sistema de Permisos
- **Propietario**: Puede gestionar sus propios locales
- **Admin**: Email `admin@parkingnow.com` puede gestionar todos los locales
- **Usuario regular**: Solo puede ver información pública

## Validaciones Implementadas

### CreateLocalDto
- `nombre`: Requerido, string
- `direccion`: Requerido, string
- `plazas`: Requerido, número positivo
- `precio_por_hora`: Requerido, número positivo
- `latitud`: Requerido, entre -90 y 90
- `longitud`: Requerido, entre -180 y 180
- `id_usuario`: Requerido, número positivo

### UpdateLocalDto
- Todos los campos opcionales
- `rating`: Entre 0 y 5
- `espacios_ocupados`: Mínimo 0

## Funcionalidades Calculadas Automáticamente

1. **Espacios Disponibles**: Se calcula automáticamente como `plazas - espacios_ocupados`
2. **Porcentaje de Disponibilidad**: Calculado en tiempo real
3. **Estado "Abierto"**: Basado en horarios y estado del local
4. **Lista de Características**: Array con servicios disponibles
5. **Timestamps**: Fecha de creación y actualización automáticas

## Ejemplos de Frontend

### JavaScript/Fetch
```javascript
// Obtener locales cercanos
async function getLocalesCercanos(lat, lng) {
  const response = await fetch(`/local/cercanos?lat=${lat}&lng=${lng}&radio=3000`);
  const locales = await response.json();
  return locales;
}

// Crear nuevo local
async function createLocal(localData, token) {
  const response = await fetch('/local', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(localData)
  });
  return response.json();
}

// Actualizar disponibilidad
async function updateDisponibilidad(localId, espaciosOcupados, token) {
  const response = await fetch(`/local/${localId}/disponibilidad`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ espacios_ocupados: espaciosOcupados })
  });
  return response.json();
}
```

### React/Axios
```javascript
import axios from 'axios';

// Configurar interceptor para JWT
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

// Hook para obtener locales
const useLocales = () => {
  const [locales, setLocales] = useState([]);
  
  useEffect(() => {
    axios.get('/local?disponibles=true')
      .then(response => setLocales(response.data))
      .catch(error => console.error(error));
  }, []);
  
  return locales;
};
```

## Estados de Respuesta HTTP

- `200 OK`: Operación exitosa
- `201 Created`: Local creado exitosamente
- `400 Bad Request`: Datos de entrada inválidos
- `401 Unauthorized`: Token JWT requerido o inválido
- `403 Forbidden`: Sin permisos para realizar la operación
- `404 Not Found`: Local no encontrado
- `500 Internal Server Error`: Error del servidor

## Notas para el Desarrollo

1. **Búsqueda Geográfica**: Implementada usando la fórmula de Haversine para cálculo de distancias
2. **Tiempo Real**: Los espacios disponibles se calculan automáticamente
3. **Seguridad**: Validación de permisos en todas las operaciones de escritura
4. **Flexibilidad**: DTOs separados para crear, actualizar y respuesta
5. **Escalabilidad**: Preparado para agregar más características en el futuro
