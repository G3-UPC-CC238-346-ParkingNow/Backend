# Pruebas de la API Ampliada de Locales

## Configuración Inicial

### 1. Iniciar el servidor
```bash
npm run start:dev
```

### 2. Obtener un JWT Token
Primero necesitas registrarte o hacer login:

```bash
# Registro
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Propietario",
    "email": "juan@example.com",
    "password": "password123",
    "placa": null,
    "dni": "12345678",
    "telefono": "555-0123",
    "tipo": "dueno_estacionamiento"
  }'

# Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@example.com",
    "password": "password123"
  }'
```

Guarda el `access_token` de la respuesta.

## Pruebas de Endpoints

### 3. Crear un Local Completo
```bash
curl -X POST http://localhost:3000/local \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_JWT_TOKEN" \
  -d '{
    "nombre": "Estacionamiento Centro Lima",
    "direccion": "Av. Javier Prado 1234, San Isidro",
    "telefono": "01-555-0123",
    "plazas": 80,
    "precio_por_hora": 4.50,
    "latitud": -12.046374,
    "longitud": -77.042793,
    "espacios_ocupados": 25,
    "tiene_camaras": true,
    "seguridad_24h": true,
    "techado": false,
    "descripcion": "Estacionamiento amplio en el corazón de San Isidro con cámaras de seguridad y vigilancia 24 horas. Fácil acceso desde Javier Prado.",
    "estado": "disponible",
    "hora_apertura": "06:00:00",
    "hora_cierre": "23:00:00",
    "id_usuario": 1
  }'
```

### 4. Crear Otro Local para Pruebas de Búsqueda
```bash
curl -X POST http://localhost:3000/local \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_JWT_TOKEN" \
  -d '{
    "nombre": "Plaza Shopping Jockey",
    "direccion": "Av. Jockey Club 255, Surco",
    "telefono": "01-555-0456",
    "plazas": 120,
    "precio_por_hora": 3.00,
    "latitud": -12.085692,
    "longitud": -76.970722,
    "espacios_ocupados": 45,
    "tiene_camaras": true,
    "seguridad_24h": false,
    "techado": true,
    "descripcion": "Estacionamiento techado del centro comercial con excelente seguridad.",
    "estado": "disponible",
    "hora_apertura": "08:00:00",
    "hora_cierre": "22:00:00",
    "id_usuario": 1
  }'
```

### 5. Ver Todos los Locales
```bash
curl -X GET http://localhost:3000/local
```

### 6. Ver Solo Locales Disponibles
```bash
curl -X GET "http://localhost:3000/local?disponibles=true"
```

### 7. Buscar Locales Cercanos
```bash
# Buscar cerca de San Isidro (coordenadas del primer local)
curl -X GET "http://localhost:3000/local/cercanos?lat=-12.046374&lng=-77.042793&radio=5000"
```

### 8. Ver Local Específico
```bash
curl -X GET http://localhost:3000/local/1
```

### 9. Actualizar Local
```bash
curl -X PUT http://localhost:3000/local/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_JWT_TOKEN" \
  -d '{
    "precio_por_hora": 5.00,
    "rating": 4.2,
    "descripcion": "Descripción actualizada con nuevo precio",
    "seguridad_24h": true
  }'
```

### 10. Actualizar Solo Disponibilidad
```bash
curl -X PUT http://localhost:3000/local/1/disponibilidad \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_JWT_TOKEN" \
  -d '{
    "espacios_ocupados": 35
  }'
```

### 11. Ver Propietario del Local
```bash
curl -X GET http://localhost:3000/local/1/usuario
```

### 12. Eliminar Local
```bash
curl -X DELETE http://localhost:3000/local/2 \
  -H "Authorization: Bearer TU_JWT_TOKEN"
```

## Respuestas Esperadas

### Respuesta de Local Completo
```json
{
  "id": 1,
  "nombre": "Estacionamiento Centro Lima",
  "direccion": "Av. Javier Prado 1234, San Isidro",
  "telefono": "01-555-0123",
  "plazas": 80,
  "rating": 0,
  "precio_por_hora": "4.50",
  "latitud": "-12.04637400",
  "longitud": "-77.04279300",
  "espacios_ocupados": 25,
  "espacios_disponibles": 55,
  "tiene_camaras": true,
  "seguridad_24h": true,
  "techado": false,
  "descripcion": "Estacionamiento amplio en el corazón de San Isidro...",
  "estado": "disponible",
  "hora_apertura": "06:00:00",
  "hora_cierre": "23:00:00",
  "fecha_creacion": "2024-01-15T20:30:00.000Z",
  "fecha_actualizacion": "2024-01-15T20:30:00.000Z",
  "porcentaje_disponibilidad": 69,
  "esta_abierto": true,
  "caracteristicas": ["Cámaras de Seguridad", "Seguridad 24h"],
  "usuario": {
    "id": 1,
    "nombre": "Juan Propietario",
    "email": "juan@example.com"
  }
}
```

## Pruebas de Validación

### 13. Error de Validación - Coordenadas Inválidas
```bash
curl -X POST http://localhost:3000/local \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_JWT_TOKEN" \
  -d '{
    "nombre": "Test Error",
    "direccion": "Test",
    "plazas": 10,
    "precio_por_hora": 2.00,
    "latitud": 200,
    "longitud": 400,
    "id_usuario": 1
  }'
```

### 14. Error de Permisos - Actualizar Local de Otro Usuario
```bash
# Primero crea otro usuario y obtén su token
# Luego intenta actualizar el local del usuario anterior
curl -X PUT http://localhost:3000/local/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer OTRO_USER_TOKEN" \
  -d '{
    "precio_por_hora": 10.00
  }'
```

### 15. Error de Capacidad - Espacios Ocupados Mayor a Plazas
```bash
curl -X PUT http://localhost:3000/local/1/disponibilidad \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_JWT_TOKEN" \
  -d '{
    "espacios_ocupados": 100
  }'
```

## Casos de Uso del Frontend

### Aplicación Móvil de Conductores

1. **Buscar Estacionamientos Cercanos:**
   - Usar geolocalización del dispositivo
   - Llamar `/local/cercanos` con coordenadas actuales
   - Mostrar en mapa con disponibilidad en tiempo real

2. **Filtrar por Características:**
   - Mostrar solo estacionamientos techados
   - Filtrar por precio máximo
   - Mostrar solo con seguridad 24h

3. **Ver Detalles del Estacionamiento:**
   - Mostrar rating, precio, características
   - Calcular tiempo estimado de llegada
   - Mostrar disponibilidad en tiempo real

### Panel de Administración de Propietarios

1. **Gestionar Locales:**
   - Ver lista de locales propios
   - Crear nuevos estacionamientos
   - Actualizar precios y características

2. **Monitoreo en Tiempo Real:**
   - Actualizar espacios ocupados
   - Ver estadísticas de ocupación
   - Gestionar horarios de apertura

## Consideraciones de Seguridad

- ✅ JWT Token requerido para operaciones de escritura
- ✅ Validación de permisos (solo propietario o admin)
- ✅ Validación de datos de entrada
- ✅ Sanitización de coordenadas geográficas
- ✅ Validación de capacidad vs ocupación

## Optimizaciones Futuras

1. **Caché de Búsquedas Geográficas:** Redis para consultas frecuentes
2. **WebSockets:** Actualizaciones de disponibilidad en tiempo real
3. **Índices de Base de Datos:** Para búsquedas geográficas optimizadas
4. **Rate Limiting:** Prevenir abuso de la API
5. **Logs de Auditoría:** Tracking de cambios importantes
