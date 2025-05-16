# Endpoints de Playas de Estacionamiento - PARKINGNOW

Este documento describe los endpoints disponibles para manejar las funcionalidades de la aplicación **PARKINGNOW**, organizados por módulos: **Locales** y **Usuarios**. También se incluyen ejemplos de datos de prueba para cada uno.

## **Base URL**
```
http://localhost:3000
```

---

## **Módulo: Locales**

### **1. Obtener todos los locales**
- **Método**: `GET`
- **URL**: `/local`
- **Descripción**: Obtiene todos los locales registrados en la base de datos.

#### **Ejemplo de respuesta**
```json
[
  {
    "id": 1,
    "nombre": "Playa Central",
    "direccion": "Av. Principal 123",
    "telefono": "987654321",
    "usuario": {
      "id": 1,
      "name": "Juan Pérez"
    }
  },
  {
    "id": 2,
    "nombre": "Playa Norte",
    "direccion": "Av. Secundaria 456",
    "telefono": "987654322",
    "usuario": {
      "id": 2,
      "name": "María López"
    }
  }
]
```

---

### **2. Obtener un local por ID**
- **Método**: `GET`
- **URL**: `/local/:id`
- **Descripción**: Obtiene un local específico por su ID.

#### **Ejemplo de solicitud**
```http
GET /local/1
```

#### **Ejemplo de respuesta**
```json
{
  "id": 1,
  "nombre": "Playa Central",
  "direccion": "Av. Principal 123",
  "telefono": "987654321",
  "usuario": {
    "id": 1,
    "name": "Juan Pérez"
  }
}
```

---

### **3. Crear un nuevo local**
- **Método**: `POST`
- **URL**: `/local`
- **Descripción**: Crea un nuevo local asociado a un usuario.

#### **Ejemplo de solicitud**
```json
{
  "nombre": "Playa Central",
  "direccion": "Av. Principal 123",
  "telefono": "987654321",
  "usuario": { "id": 1 }
}
```

#### **Ejemplo de respuesta**
```json
{
  "id": 1,
  "nombre": "Playa Central",
  "direccion": "Av. Principal 123",
  "telefono": "987654321",
  "usuario": {
    "id": 1,
    "name": "Juan Pérez"
  }
}
```

---

### **4. Actualizar un local por ID**
- **Método**: `PUT`
- **URL**: `/local/:id`
- **Descripción**: Actualiza los datos de un local específico.

#### **Ejemplo de solicitud**
```http
PUT /local/1
```

#### **Cuerpo**
```json
{
  "nombre": "Playa Actualizada",
  "direccion": "Av. Nueva 789",
  "telefono": "987654323"
}
```

#### **Ejemplo de respuesta**
```json
{
  "id": 1,
  "nombre": "Playa Actualizada",
  "direccion": "Av. Nueva 789",
  "telefono": "987654323",
  "usuario": {
    "id": 1,
    "name": "Juan Pérez"
  }
}
```

---

### **5. Eliminar un local por ID**
- **Método**: `DELETE`
- **URL**: `/local/:id`
- **Descripción**: Elimina un local específico por su ID.

#### **Ejemplo de solicitud**
```http
DELETE /local/1
```

#### **Ejemplo de respuesta**
- Código de estado: `200 OK`
- Cuerpo vacío.

---

### **6. Obtener el usuario dueño de un local**
- **Método**: `GET`
- **URL**: `/local/:id/usuario`
- **Descripción**: Obtiene el usuario asociado a un local específico.

#### **Ejemplo de solicitud**
```http
GET /local/1/usuario
```

#### **Ejemplo de respuesta**
```json
{
  "id": 1,
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "tipoUsuario": "dueno_estacionamiento"
}
```
---

### **Resumen de Endpoints del Módulo Locales**

| Método   | URL                  | Descripción                                |
|----------|-----------------------|--------------------------------------------|
| `GET`    | `/local`             | Obtener todos los locales.                 |
| `GET`    | `/local/:id`         | Obtener un local por ID.                   |
| `POST`   | `/local`             | Crear un nuevo local.                      |
| `PUT`    | `/local/:id`         | Actualizar un local por ID.                |
| `DELETE` | `/local/:id`         | Eliminar un local por ID.                  |
| `GET`    | `/local/:id/usuario` | Obtener el usuario dueño de un local.      |

---

## **Módulo: Usuarios**

### **1. Obtener todos los usuarios**
- **Método**: `GET`
- **URL**: `/usuario`
- **Descripción**: Obtiene todos los usuarios registrados en la base de datos.

#### **Ejemplo de respuesta**
```json
[
  {
    "id": 1,
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "password": "123456",
    "placa": "ABC-123",
    "dni": "12345678",
    "ruc": "20123456789",
    "tipoUsuario": "dueno_estacionamiento",
    "locales": []
  },
  {
    "id": 2,
    "name": "María López",
    "email": "maria@example.com",
    "password": "abcdef",
    "placa": null,
    "dni": "87654321",
    "ruc": null,
    "tipoUsuario": "conductor",
    "locales": []
  }
]
```

---

### **2. Obtener un usuario por ID**
- **Método**: `GET`
- **URL**: `/usuario/:id`
- **Descripción**: Obtiene un usuario específico por su ID.

#### **Ejemplo de solicitud**
```http
GET /usuario/1
```

#### **Ejemplo de respuesta**
```json
{
  "id": 1,
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "123456",
  "placa": "ABC-123",
  "dni": "12345678",
  "ruc": "20123456789",
  "tipoUsuario": "dueno_estacionamiento",
  "locales": []
}
```

---

### **3. Obtener los locales de un usuario**
- **Método**: `GET`
- **URL**: `/usuario/:id/locales`
- **Descripción**: Obtiene todos los locales asociados a un usuario específico.

#### **Ejemplo de solicitud**
```http
GET /usuario/1/locales
```

#### **Ejemplo de respuesta**
```json
[
  {
    "id": 1,
    "nombre": "Playa Central",
    "direccion": "Av. Principal 123",
    "telefono": "987654321"
  },
  {
    "id": 2,
    "nombre": "Playa Norte",
    "direccion": "Av. Secundaria 456",
    "telefono": "987654322"
  }
]
```

---

### **4. Crear un nuevo usuario**
- **Método**: `POST`
- **URL**: `/usuario`
- **Descripción**: Crea un nuevo usuario.

#### **Ejemplo de solicitud**

- Si se agrega el RUC automaticamente el usuario se guardara como dueño de estacionamiento

```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "123456",
  "placa": "ABC-123",
  "dni": "12345678",
}
```

#### **Ejemplo de respuesta**
```json
{
  "id": 1,
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "123456",
  "placa": "ABC-123",
  "dni": "12345678",
  "ruc": "20123456789",
  "tipoUsuario": "dueno_estacionamiento",
  "locales": []
}
```

---

### **5. Actualizar un usuario por ID**
- **Método**: `PUT`
- **URL**: `/usuario/:id`
- **Descripción**: Actualiza los datos de un usuario específico.

#### **Ejemplo de solicitud**
```http
PUT /usuario/1
```

#### **Cuerpo**
```json
{
  "name": "Juan Actualizado",
  "email": "juan_updated@example.com",
  "placa": "XYZ-789"
}
```

#### **Ejemplo de respuesta**
```json
{
  "id": 1,
  "name": "Juan Actualizado",
  "email": "juan_updated@example.com",
  "password": "123456",
  "placa": "XYZ-789",
  "dni": "12345678",
  "ruc": "20123456789",
  "tipoUsuario": "dueno_estacionamiento",
  "locales": []
}
```

---

### **6. Eliminar un usuario por ID**
- **Método**: `DELETE`
- **URL**: `/usuario/:id`
- **Descripción**: Elimina un usuario específico por su ID.

#### **Ejemplo de solicitud**
```http
DELETE /usuario/1
```

#### **Ejemplo de respuesta**
- Código de estado: `200 OK`
- Cuerpo vacío.

---

### **Resumen de Endpoints del Módulo Usuarios**

| Método   | URL                        | Descripción                                |
|----------|-----------------------------|--------------------------------------------|
| `GET`    | `/usuario`                 | Obtener todos los usuarios.                |
| `GET`    | `/usuario/:id`             | Obtener un usuario por ID.                 |
| `GET`    | `/usuario/:id/locales`     | Obtener los locales de un usuario.         |
| `POST`   | `/usuario`                 | Crear un nuevo usuario.                    |
| `PUT`    | `/usuario/:id`             | Actualizar un usuario por ID.              |
| `DELETE` | `/usuario/:id`             | Eliminar un usuario por ID.                |


---

## **Módulo: Reservas**


### **1. Obtener todas las reservas**
- **Método**: `GET`
- **URL**: `/reserva`
- **Descripción**: Obtiene todas las reservas registradas en la base de datos.

#### **Ejemplo de respuesta**
```json
[
  {
    "id": 1,
    "nro_plaza": 5,
    "fh_inicio": "2025-05-16T08:00:00Z",
    "fh_fin": "2025-05-16T10:00:00Z",
    "usuario": {
      "id": 1,
      "name": "Juan Pérez"
    },
    "local": {
      "id": 1,
      "nombre": "Playa Central"
    }
  },
  {
    "id": 2,
    "nro_plaza": 10,
    "fh_inicio": "2025-05-17T09:00:00Z",
    "fh_fin": "2025-05-17T11:00:00Z",
    "usuario": {
      "id": 2,
      "name": "María López"
    },
    "local": {
      "id": 2,
      "nombre": "Playa Norte"
    }
  }
]
```

---

### **2. Obtener una reserva por ID**
- **Método**: `GET`
- **URL**: `/reserva/:id`
- **Descripción**: Obtiene una reserva específica por su ID.

#### **Ejemplo de solicitud**
```http
GET /reserva/1
```

#### **Ejemplo de respuesta**
```json
{
  "id": 1,
  "nro_plaza": 5,
  "fh_inicio": "2025-05-16T08:00:00Z",
  "fh_fin": "2025-05-16T10:00:00Z",
  "usuario": {
    "id": 1,
    "name": "Juan Pérez"
  },
  "local": {
    "id": 1,
    "nombre": "Playa Central"
  }
}
```

---

### **3. Crear una nueva reserva**
- **Método**: `POST`
- **URL**: `/reserva`
- **Descripción**: Crea una nueva reserva asociada a un usuario y un local.

#### **Ejemplo de solicitud**
```json
{
  "usuario": { "id": 1 },
  "local": { "id": 1 },
  "nro_plaza": 5,
  "fh_inicio": "2025-05-16T08:00:00Z",
  "fh_fin": "2025-05-16T10:00:00Z"
}
```

#### **Ejemplo de respuesta**
```json
{
  "id": 1,
  "nro_plaza": 5,
  "fh_inicio": "2025-05-16T08:00:00Z",
  "fh_fin": "2025-05-16T10:00:00Z",
  "usuario": {
    "id": 1,
    "name": "Juan Pérez"
  },
  "local": {
    "id": 1,
    "nombre": "Playa Central"
  }
}
```

---

### **4. Actualizar una reserva por ID**
- **Método**: `PUT`
- **URL**: `/reserva/:id`
- **Descripción**: Actualiza los datos de una reserva específica.

#### **Ejemplo de solicitud**
```http
PUT /reserva/1
```

#### **Cuerpo**
```json
{
  "nro_plaza": 10,
  "fh_fin": "2025-05-16T12:00:00Z"
}
```

#### **Ejemplo de respuesta**
```json
{
  "id": 1,
  "nro_plaza": 10,
  "fh_inicio": "2025-05-16T08:00:00Z",
  "fh_fin": "2025-05-16T12:00:00Z",
  "usuario": {
    "id": 1,
    "name": "Juan Pérez"
  },
  "local": {
    "id": 1,
    "nombre": "Playa Central"
  }
}
```

---

### **5. Eliminar una reserva por ID**
- **Método**: `DELETE`
- **URL**: `/reserva/:id`
- **Descripción**: Elimina una reserva específica por su ID.

#### **Ejemplo de solicitud**
```http
DELETE /reserva/1
```

#### **Ejemplo de respuesta**
- Código de estado: `200 OK`
- Cuerpo vacío.

---

### **Resumen de Endpoints del Módulo Reservas**

| Método   | URL              | Descripción                                |
|----------|-------------------|--------------------------------------------|
| `GET`    | `/reserva`        | Obtener todas las reservas.                |
| `GET`    | `/reserva/:id`    | Obtener una reserva por ID.                |
| `POST`   | `/reserva`        | Crear una nueva reserva.                   |
| `PUT`    | `/reserva/:id`    | Actualizar una reserva por ID.             |
| `DELETE` | `/reserva/:id`    | Eliminar una reserva por ID.               |

---


## **Notas**
- Asegurarse de que los `id = 1` existan antes de probar los endpoints que requieren tablas asociadas.
- Probar con postman **Postman** agregar la data de prueba en el **body** como un **raw** de tipo **JSON**