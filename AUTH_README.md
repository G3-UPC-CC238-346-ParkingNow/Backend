# Autenticación JWT - PARKINGNOW

## Endpoints de Autenticación

### 1. Registro de Usuario
- **Método**: `POST`
- **URL**: `/auth/register`
- **Descripción**: Registra un nuevo usuario y devuelve un token JWT.

#### Ejemplo de solicitud:
```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "123456",
  "placa": "ABC-123",
  "dni": "12345678",
  "ruc": "20123456789"
}
```

#### Ejemplo de respuesta:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "tipoUsuario": "dueno_estacionamiento"
  }
}
```

### 2. Login
- **Método**: `POST`
- **URL**: `/auth/login`
- **Descripción**: Autentica al usuario y devuelve un token JWT.

#### Ejemplo de solicitud:
```json
{
  "email": "juan@example.com",
  "password": "123456"
}
```

#### Ejemplo de respuesta:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "tipoUsuario": "dueno_estacionamiento"
  }
}
```

## Rutas Protegidas

Las siguientes rutas requieren autenticación JWT:

### Locales
- `POST /local` - Crear local
- `PUT /local/:id` - Actualizar local
- `DELETE /local/:id` - Eliminar local

### Cómo usar rutas protegidas

Para acceder a rutas protegidas, incluye el token JWT en el header `Authorization`:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Ejemplo con curl:
```bash
curl -X POST http://localhost:3000/local \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "nombre": "Playa Central",
    "direccion": "Av. Principal 123",
    "telefono": "987654321",
    "usuario": { "id": 1 }
  }'
```

## Migración de datos existentes

Si tienes usuarios con contraseñas en texto plano, sus contraseñas se hashearán automáticamente la próxima vez que se actualicen o cuando inicien sesión.

## Configuración

El JWT secret está configurado en el archivo `.env`:
```
JWT_SECRET=your-super-secret-jwt-key-parkingnow-2024
```

Los tokens tienen una duración de 24 horas por defecto.
