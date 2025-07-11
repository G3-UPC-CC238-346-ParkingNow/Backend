# API de Reservas - Sistema Completo de Estacionamientos

## 🎯 Características Implementadas

### ✅ **Sistema de Reservas Avanzado**
- **Cálculo Automático**: Duración, fecha fin y total a pagar
- **Estados de Reserva**: Pendiente, confirmada, en curso, completada, cancelada
- **Tipos de Vehículo**: Auto, camioneta, moto, furgoneta, bicicleta
- **Verificación de Disponibilidad**: Control de solapamiento de horarios
- **Códigos de Reserva**: Únicos y automáticos (PRK-XXXXXXXX)
- **Control de Plazas**: Asignación automática o manual

### 📋 **Campos de la Reserva**
```typescript
{
  id: number;
  fh_inicio: Date;              // Fecha y hora de inicio
  fh_fin: Date;                 // Calculada automáticamente
  duracion_horas: number;       // Duración en horas (ej: 2.5)
  tipo_vehiculo: TipoVehiculo;  // Auto, moto, etc.
  placa_vehiculo?: string;      // Placa del vehículo
  precio_por_hora: number;      // Copiado del local
  total_pagado: number;         // Calculado automáticamente
  estado: EstadoReserva;        // Estado actual
  nro_plaza?: number;           // Plaza asignada
  codigo_reserva: string;       // Código único (PRK-ABC12345)
  notas?: string;               // Notas adicionales
}
```

## 🚀 Endpoints Disponibles

### 📅 **Crear Reserva**
```http
POST /reserva
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "id_local": 12,
  "fh_inicio": "2024-01-20T14:30:00Z",
  "duracion_horas": 2.5,
  "tipo_vehiculo": "auto",
  "placa_vehiculo": "ABC-123",
  "notas": "Vehículo rojo, estacionar cerca de la entrada"
}
```

**Respuesta:**
```json
{
  "id": 15,
  "fh_inicio": "2024-01-20T14:30:00Z",
  "fh_fin": "2024-01-20T17:00:00Z",
  "duracion_horas": 2.5,
  "tipo_vehiculo": "auto",
  "placa_vehiculo": "ABC-123",
  "precio_por_hora": 4.50,
  "total_pagado": 11.25,
  "estado": "confirmada",
  "nro_plaza": 15,
  "codigo_reserva": "PRK-A1B2C3D4",
  "esta_activa": false,
  "ha_expirado": false,
  "tiempo_restante_minutos": 0,
  "tipo_vehiculo_texto": "Automóvil",
  "usuario": {
    "id": 14,
    "nombre": "Juan Calisaya",
    "email": "juanito@example.com"
  },
  "local": {
    "id": 12,
    "nombre": "Estacionamiento San Isidro Premium",
    "direccion": "Av. Javier Prado Este 1234"
  }
}
```

### 📋 **Mis Reservas**
```http
GET /reserva
Authorization: Bearer <jwt_token>
```

### 🔍 **Reservas por Estado**
```http
GET /reserva/estado/confirmada
GET /reserva/estado/en_curso
GET /reserva/estado/completada
Authorization: Bearer <jwt_token>
```

### ⚡ **Reservas Activas**
```http
GET /reserva/activas
Authorization: Bearer <jwt_token>
```

### 📊 **Historial de Reservas**
```http
GET /reserva/historial?limit=20
Authorization: Bearer <jwt_token>
```

### 🏢 **Reservas de un Local (Solo Propietarios)**
```http
GET /reserva/local/12
Authorization: Bearer <jwt_token>
```

### 🎯 **Reserva Específica**
```http
GET /reserva/15
Authorization: Bearer <jwt_token>
```

### ✏️ **Actualizar Reserva**
```http
PUT /reserva/15
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "duracion_horas": 3.0,
  "notas": "Extensión de tiempo solicitada"
}
```

### 🚫 **Cancelar Reserva**
```http
PUT /reserva/15/cancelar
Authorization: Bearer <jwt_token>
```

### ▶️ **Iniciar Reserva (Confirmar Llegada)**
```http
PUT /reserva/15/iniciar
Authorization: Bearer <jwt_token>
```

### 🏁 **Finalizar Reserva**
```http
PUT /reserva/15/finalizar
Authorization: Bearer <jwt_token>
```

### 🗑️ **Eliminar Reserva** (Solo si está pendiente)
```http
DELETE /reserva/15
Authorization: Bearer <jwt_token>
```

### ✅ **Verificar Disponibilidad**
```http
POST /reserva/verificar-disponibilidad
Content-Type: application/json

{
  "id_local": 12,
  "fh_inicio": "2024-01-20T14:30:00Z",
  "duracion_horas": 2.0
}
```

**Respuesta:**
```json
{
  "disponible": true,
  "plazas_disponibles": [1, 3, 5, 7, 12, 15, 18, 20]
}
```

## 📱 **Flujo de Uso Completo**

### 1. **Búsqueda y Selección**
```javascript
// 1. Buscar estacionamientos cercanos
const locales = await fetch('/local/cercanos?lat=-12.046374&lng=-77.042793');

// 2. Verificar disponibilidad
const disponibilidad = await fetch('/reserva/verificar-disponibilidad', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    id_local: 12,
    fh_inicio: '2024-01-20T14:30:00Z',
    duracion_horas: 2.0
  })
});
```

### 2. **Crear Reserva**
```javascript
const reserva = await fetch('/reserva', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    id_local: 12,
    fh_inicio: '2024-01-20T14:30:00Z',
    duracion_horas: 2.0,
    tipo_vehiculo: 'auto',
    placa_vehiculo: 'ABC-123'
  })
});
```

### 3. **Gestión de la Reserva**
```javascript
// Iniciar reserva al llegar
await fetch(`/reserva/${reservaId}/iniciar`, {
  method: 'PUT',
  headers: { 'Authorization': `Bearer ${token}` }
});

// Finalizar reserva al salir
await fetch(`/reserva/${reservaId}/finalizar`, {
  method: 'PUT', 
  headers: { 'Authorization': `Bearer ${token}` }
});
```

## 🎨 **Estados de Reserva**

| Estado | Descripción | Acciones Permitidas |
|--------|-------------|-------------------|
| `pendiente` | Reserva creada, esperando confirmación | Cancelar, Eliminar |
| `confirmada` | Reserva confirmada, esperando llegada | Cancelar, Iniciar, Actualizar |
| `en_curso` | Usuario ha llegado, estacionamiento en uso | Finalizar |
| `completada` | Reserva finalizada exitosamente | Solo consulta |
| `cancelada` | Reserva cancelada por el usuario | Solo consulta |
| `expirada` | Reserva no utilizada, tiempo vencido | Solo consulta |

## 🚗 **Tipos de Vehículo Soportados**

```typescript
enum TipoVehiculo {
  AUTO = 'auto',           // Automóvil estándar
  CAMIONETA = 'camioneta', // SUV, pickup, etc.
  MOTO = 'moto',           // Motocicleta, scooter
  FURGONETA = 'furgoneta', // Van, furgón
  BICICLETA = 'bicicleta'  // Bicicleta (si aplica)
}
```

## 🔒 **Sistema de Permisos**

### **Usuario Regular (Conductor)**
- ✅ Ver sus propias reservas
- ✅ Crear reservas
- ✅ Actualizar sus reservas (antes de completar)
- ✅ Cancelar sus reservas
- ✅ Gestionar estado de sus reservas

### **Propietario de Local**
- ✅ Ver todas las reservas de sus locales
- ✅ Monitorear ocupación en tiempo real
- ❌ No puede modificar reservas de usuarios

### **Administrador**
- ✅ Acceso completo a todas las reservas
- ✅ Gestión total del sistema

## 💡 **Funcionalidades Automáticas**

### **Cálculos Automáticos**
```typescript
// Al crear/actualizar reserva:
fh_fin = fh_inicio + (duracion_horas * 1 hora)
total_pagado = duracion_horas * precio_por_hora
codigo_reserva = "PRK-" + 8_caracteres_aleatorios
```

### **Verificación de Disponibilidad**
- ✅ Detecta solapamiento de horarios
- ✅ Excluye plazas ya reservadas
- ✅ Sugiere plazas disponibles
- ✅ Considera estado del local

### **Estados Calculados**
```typescript
esta_activa: boolean        // Si está en curso y dentro del horario
ha_expirado: boolean        // Si pasó el tiempo sin completarse
tiempo_restante_minutos     // Minutos restantes de la reserva
```

## 📊 **Casos de Uso Frontend**

### **App Móvil - Conductor**
1. **Buscar y Reservar**
   - Mapa con locales cercanos
   - Filtros por precio, servicios, distancia
   - Reserva en tiempo real

2. **Gestionar Reservas**
   - Lista de reservas activas/historial
   - Códigos QR para acceso
   - Notificaciones de tiempo

3. **Control de Estacionamiento**
   - Check-in al llegar
   - Extensión de tiempo
   - Check-out al salir

### **Dashboard - Propietario**
1. **Monitoreo**
   - Ocupación en tiempo real
   - Ingresos del día
   - Estadísticas de uso

2. **Gestión**
   - Ver reservas programadas
   - Manejar incidencias
   - Reportes y analytics

## 🚀 **Próximas Mejoras**
- [ ] Integración con sistemas de pago
- [ ] Notificaciones push automáticas
- [ ] Check-in automático por GPS
- [ ] Sistema de penalizaciones
- [ ] Reservas recurrentes
- [ ] Integración con sensores IoT
