<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

# 🚗 ParkingNow Backend

Backend NestJS para una aplicación de gestión de estacionamientos con autenticación JWT, geolocalización y gestión en tiempo real.

## 🌟 Características Principales

### 🔐 Sistema de Autenticación
- **JWT Authentication**: Autenticación segura con tokens
- **Registro y Login**: Endpoints para gestión de usuarios
- **Protección de Rutas**: Guards para endpoints sensibles
- **Tipos de Usuario**: Conductores y Dueños de Estacionamiento

### 🏢 Gestión Avanzada de Estacionamientos
- **Información Completa**: Rating, precio, ubicación, disponibilidad
- **Geolocalización**: Búsqueda por proximidad usando coordenadas
- **Disponibilidad en Tiempo Real**: Control de espacios ocupados/disponibles
- **Servicios**: Cámaras, seguridad 24h, techado
- **Horarios**: Gestión de apertura y cierre

### 🚀 Funcionalidades API
- **CRUD Completo**: Crear, leer, actualizar, eliminar locales
- **Búsqueda Geográfica**: Locales cercanos con radio personalizable  
- **Filtros Avanzados**: Por disponibilidad, características, estado
- **Validaciones**: DTOs con class-validator para entrada segura
- **Permisos**: Sistema de autorización basado en propietario

## 📊 Entidades Principales

### Usuario
- Información personal (nombre, email, DNI, teléfono)
- Tipos: Conductor / Dueño de Estacionamiento
- Autenticación con password hasheado
- Relación con locales propios

### Local (Playa de Estacionamiento)
- **Básico**: Nombre, dirección, teléfono, capacidad
- **Económico**: Precio por hora
- **Ubicación**: Coordenadas (latitud, longitud)
- **Disponibilidad**: Espacios ocupados/disponibles en tiempo real
- **Rating**: Sistema de calificación (0-5 estrellas)
- **Servicios**: Cámaras, seguridad 24h, techado
- **Operación**: Horarios, estado, descripción

### Reserva
- Gestión de reservas de estacionamiento
- Relación usuario-local
- Control de tiempos y estados

## 🛠️ Tecnologías

- **Framework**: NestJS
- **Base de Datos**: PostgreSQL con TypeORM
- **Autenticación**: JWT + Passport
- **Validación**: class-validator, class-transformer
- **Seguridad**: bcryptjs para passwords
- **Desarrollo**: TypeScript, ESLint

## 📁 Estructura del Proyecto

```
src/
├── app.module.ts              # Módulo principal
├── main.ts                    # Punto de entrada
├── login/                     # Autenticación JWT
│   ├── guards/                # Guards de autenticación
│   ├── strategies/            # Estrategias Passport
│   └── decorators/            # Decorador CurrentUser
├── usuario/                   # Gestión de usuarios
├── local/                     # Gestión de estacionamientos
│   ├── dto/                   # DTOs de validación
│   ├── local.entity.ts        # Entidad principal
│   ├── local.controller.ts    # Endpoints REST
│   └── local.service.ts       # Lógica de negocio
└── reserva/                   # Sistema de reservas
```

## 🚀 Endpoints Principales

### Autenticación
```http
POST /auth/register            # Registro de usuario
POST /auth/login              # Login con JWT
```

### Locales (Estacionamientos)
```http
GET    /local                 # Listar todos los locales
GET    /local/cercanos        # Buscar locales cercanos
GET    /local/:id             # Obtener local específico
POST   /local                 # Crear local (JWT)
PUT    /local/:id             # Actualizar local (JWT)
PUT    /local/:id/disponibilidad  # Actualizar disponibilidad (JWT)
DELETE /local/:id             # Eliminar local (JWT)
```

### Usuarios y Reservas
```http
GET    /usuario               # Gestión de usuarios
POST   /reserva               # Sistema de reservas
```

## 🔧 Configuración Rápida

### 1. Variables de Entorno
```bash
# .env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=tu_password
DATABASE_NAME=parkingnow_db
JWT_SECRET=tu_jwt_secret_muy_seguro
```

### 2. Instalación
```bash
npm install
```

### 3. Base de Datos
```bash
# Crear base de datos PostgreSQL
createdb parkingnow_db
```

### 4. Ejecución
```bash
# Desarrollo
npm run start:dev

# Producción  
npm run start:prod
```

## 📚 Documentación Detallada

- **[LOCALES_API_GUIDE.md](./LOCALES_API_GUIDE.md)**: Guía completa de la API de locales
- **[TESTING_GUIDE.md](./TESTING_GUIDE.md)**: Ejemplos y pruebas de todos los endpoints
- **[AUTH_README.md](./AUTH_README.md)**: Documentación del sistema de autenticación

## 🧪 Ejemplos de Uso

### Crear un Estacionamiento
```javascript
const nuevoLocal = {
  "nombre": "Estacionamiento Centro",
  "direccion": "Av. Principal 123",
  "plazas": 50,
  "precio_por_hora": 3.50,
  "latitud": -12.046374,
  "longitud": -77.042793,
  "tiene_camaras": true,
  "seguridad_24h": true,
  "techado": false,
  "id_usuario": 1
};

fetch('/local', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(nuevoLocal)
});
```

### Buscar Estacionamientos Cercanos
```javascript
const localesCercanos = await fetch(
  `/local/cercanos?lat=-12.046374&lng=-77.042793&radio=5000`
).then(res => res.json());
```

### Actualizar Disponibilidad en Tiempo Real
```javascript
await fetch(`/local/1/disponibilidad`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({ espacios_ocupados: 25 })
});
```

## 🔒 Seguridad

- **JWT Tokens**: Autenticación stateless
- **bcryptjs**: Hash seguro de contraseñas  
- **Guards**: Protección de rutas sensibles
- **Validación**: DTOs con class-validator
- **Permisos**: Control de acceso basado en propietario
- **CORS**: Configurado para producción

## 🌍 Características Geográficas

- **Búsqueda por Proximidad**: Algoritmo de Haversine
- **Coordenadas Precisas**: Latitud/Longitud con alta precisión
- **Radio Personalizable**: Búsqueda en metros configurable
- **Ordenamiento**: Resultados ordenados por distancia

## 📱 Integración Frontend

Compatible con cualquier frontend que consuma APIs REST:

- **React Native**: Para aplicaciones móviles
- **React/Angular/Vue**: Para aplicaciones web
- **Flutter**: Para desarrollo multiplataforma
- **Ionic**: Para aplicaciones híbridas

## 🔄 Estados y Flujos

### Estados de Local
- `disponible`: Operativo y con espacios
- `ocupado`: Sin espacios disponibles  
- `mantenimiento`: Temporalmente cerrado
- `cerrado`: Fuera de horario de operación

### Flujo de Reserva
1. Usuario busca locales cercanos
2. Selecciona local disponible
3. Verifica precio y características
4. Realiza reserva (próximamente)

## 🚧 Roadmap

### Próximas Funcionalidades
- [ ] Sistema de reservas completo
- [ ] Pagos integrados  
- [ ] Notificaciones push
- [ ] Sistema de rating y reseñas
- [ ] Dashboard de analytics
- [ ] API de sensores IoT
- [ ] WebSockets para tiempo real

### Optimizaciones Técnicas
- [ ] Cache con Redis
- [ ] Índices geográficos
- [ ] Rate limiting
- [ ] Logs estructurados
- [ ] Métricas y monitoring

## 🤝 Contribución

1. Fork del proyecto
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver `LICENSE` para más detalles.

## 👥 Equipo

Desarrollado para el curso de Aplicaciones para Dispositivos Móviles - Ciclo 7

---

## NestJS Framework Information

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

# 🚗 ParkingNow Backend

Backend NestJS para una aplicación de gestión de estacionamientos con autenticación JWT, geolocalización y gestión en tiempo real.

## 🌟 Características Principales

### 🔐 Sistema de Autenticación
- **JWT Authentication**: Autenticación segura con tokens
- **Registro y Login**: Endpoints para gestión de usuarios
- **Protección de Rutas**: Guards para endpoints sensibles
- **Tipos de Usuario**: Conductores y Dueños de Estacionamiento

### 🏢 Gestión Avanzada de Estacionamientos
- **Información Completa**: Rating, precio, ubicación, disponibilidad
- **Geolocalización**: Búsqueda por proximidad usando coordenadas
- **Disponibilidad en Tiempo Real**: Control de espacios ocupados/disponibles
- **Servicios**: Cámaras, seguridad 24h, techado
- **Horarios**: Gestión de apertura y cierre

### 🚀 Funcionalidades API
- **CRUD Completo**: Crear, leer, actualizar, eliminar locales
- **Búsqueda Geográfica**: Locales cercanos con radio personalizable  
- **Filtros Avanzados**: Por disponibilidad, características, estado
- **Validaciones**: DTOs con class-validator para entrada segura
- **Permisos**: Sistema de autorización basado en propietario

## 📊 Entidades Principales

### Usuario
- Información personal (nombre, email, DNI, teléfono)
- Tipos: Conductor / Dueño de Estacionamiento
- Autenticación con password hasheado
- Relación con locales propios

### Local (Playa de Estacionamiento)
- **Básico**: Nombre, dirección, teléfono, capacidad
- **Económico**: Precio por hora
- **Ubicación**: Coordenadas (latitud, longitud)
- **Disponibilidad**: Espacios ocupados/disponibles en tiempo real
- **Rating**: Sistema de calificación (0-5 estrellas)
- **Servicios**: Cámaras, seguridad 24h, techado
- **Operación**: Horarios, estado, descripción

### Reserva
- Gestión de reservas de estacionamiento
- Relación usuario-local
- Control de tiempos y estados

## 🛠️ Tecnologías

- **Framework**: NestJS
- **Base de Datos**: PostgreSQL con TypeORM
- **Autenticación**: JWT + Passport
- **Validación**: class-validator, class-transformer
- **Seguridad**: bcryptjs para passwords
- **Desarrollo**: TypeScript, ESLint

## 📁 Estructura del Proyecto

```
src/
├── app.module.ts              # Módulo principal
├── main.ts                    # Punto de entrada
├── login/                     # Autenticación JWT
│   ├── guards/                # Guards de autenticación
│   ├── strategies/            # Estrategias Passport
│   └── decorators/            # Decorador CurrentUser
├── usuario/                   # Gestión de usuarios
├── local/                     # Gestión de estacionamientos
│   ├── dto/                   # DTOs de validación
│   ├── local.entity.ts        # Entidad principal
│   ├── local.controller.ts    # Endpoints REST
│   └── local.service.ts       # Lógica de negocio
└── reserva/                   # Sistema de reservas
```

## 🚀 Endpoints Principales

### Autenticación
```http
POST /auth/register            # Registro de usuario
POST /auth/login              # Login con JWT
```

### Locales (Estacionamientos)
```http
GET    /local                 # Listar todos los locales
GET    /local/cercanos        # Buscar locales cercanos
GET    /local/:id             # Obtener local específico
POST   /local                 # Crear local (JWT)
PUT    /local/:id             # Actualizar local (JWT)
PUT    /local/:id/disponibilidad  # Actualizar disponibilidad (JWT)
DELETE /local/:id             # Eliminar local (JWT)
```

### Usuarios y Reservas
```http
GET    /usuario               # Gestión de usuarios
POST   /reserva               # Sistema de reservas
```

## 🔧 Configuración Rápida

### 1. Variables de Entorno
```bash
# .env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=tu_password
DATABASE_NAME=parkingnow_db
JWT_SECRET=tu_jwt_secret_muy_seguro
```

### 2. Instalación
```bash
npm install
```

### 3. Base de Datos
```bash
# Crear base de datos PostgreSQL
createdb parkingnow_db
```

### 4. Ejecución
```bash
# Desarrollo
npm run start:dev

# Producción  
npm run start:prod
```

## 📚 Documentación Detallada

- **[LOCALES_API_GUIDE.md](./LOCALES_API_GUIDE.md)**: Guía completa de la API de locales
- **[TESTING_GUIDE.md](./TESTING_GUIDE.md)**: Ejemplos y pruebas de todos los endpoints
- **[AUTH_README.md](./AUTH_README.md)**: Documentación del sistema de autenticación

## 🧪 Ejemplos de Uso

### Crear un Estacionamiento
```javascript
const nuevoLocal = {
  "nombre": "Estacionamiento Centro",
  "direccion": "Av. Principal 123",
  "plazas": 50,
  "precio_por_hora": 3.50,
  "latitud": -12.046374,
  "longitud": -77.042793,
  "tiene_camaras": true,
  "seguridad_24h": true,
  "techado": false,
  "id_usuario": 1
};

fetch('/local', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(nuevoLocal)
});
```

### Buscar Estacionamientos Cercanos
```javascript
const localesCercanos = await fetch(
  `/local/cercanos?lat=-12.046374&lng=-77.042793&radio=5000`
).then(res => res.json());
```

### Actualizar Disponibilidad en Tiempo Real
```javascript
await fetch(`/local/1/disponibilidad`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({ espacios_ocupados: 25 })
});
```

## 🔒 Seguridad

- **JWT Tokens**: Autenticación stateless
- **bcryptjs**: Hash seguro de contraseñas  
- **Guards**: Protección de rutas sensibles
- **Validación**: DTOs con class-validator
- **Permisos**: Control de acceso basado en propietario
- **CORS**: Configurado para producción

## 🌍 Características Geográficas

- **Búsqueda por Proximidad**: Algoritmo de Haversine
- **Coordenadas Precisas**: Latitud/Longitud con alta precisión
- **Radio Personalizable**: Búsqueda en metros configurable
- **Ordenamiento**: Resultados ordenados por distancia

## 📱 Integración Frontend

Compatible con cualquier frontend que consuma APIs REST:

- **React Native**: Para aplicaciones móviles
- **React/Angular/Vue**: Para aplicaciones web
- **Flutter**: Para desarrollo multiplataforma
- **Ionic**: Para aplicaciones híbridas

## 🔄 Estados y Flujos

### Estados de Local
- `disponible`: Operativo y con espacios
- `ocupado`: Sin espacios disponibles  
- `mantenimiento`: Temporalmente cerrado
- `cerrado`: Fuera de horario de operación

### Flujo de Reserva
1. Usuario busca locales cercanos
2. Selecciona local disponible
3. Verifica precio y características
4. Realiza reserva (próximamente)

## 🚧 Roadmap

### Próximas Funcionalidades
- [ ] Sistema de reservas completo
- [ ] Pagos integrados  
- [ ] Notificaciones push
- [ ] Sistema de rating y reseñas
- [ ] Dashboard de analytics
- [ ] API de sensores IoT
- [ ] WebSockets para tiempo real

### Optimizaciones Técnicas
- [ ] Cache con Redis
- [ ] Índices geográficos
- [ ] Rate limiting
- [ ] Logs estructurados
- [ ] Métricas y monitoring

## 🤝 Contribución

1. Fork del proyecto
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver `LICENSE` para más detalles.

## 👥 Equipo

Desarrollado para el curso de Aplicaciones para Dispositivos Móviles - Ciclo 7

---

## NestJS Framework Information

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

# 🚗 ParkingNow Backend

Backend NestJS para una aplicación de gestión de estacionamientos con autenticación JWT, geolocalización y gestión en tiempo real.

## 🌟 Características Principales

### 🔐 Sistema de Autenticación
- **JWT Authentication**: Autenticación segura con tokens
- **Registro y Login**: Endpoints para gestión de usuarios
- **Protección de Rutas**: Guards para endpoints sensibles
- **Tipos de Usuario**: Conductores y Dueños de Estacionamiento

### 🏢 Gestión Avanzada de Estacionamientos
- **Información Completa**: Rating, precio, ubicación, disponibilidad
- **Geolocalización**: Búsqueda por proximidad usando coordenadas
- **Disponibilidad en Tiempo Real**: Control de espacios ocupados/disponibles
- **Servicios**: Cámaras, seguridad 24h, techado
- **Horarios**: Gestión de apertura y cierre

### 🚀 Funcionalidades API
- **CRUD Completo**: Crear, leer, actualizar, eliminar locales
- **Búsqueda Geográfica**: Locales cercanos con radio personalizable  
- **Filtros Avanzados**: Por disponibilidad, características, estado
- **Validaciones**: DTOs con class-validator para entrada segura
- **Permisos**: Sistema de autorización basado en propietario

## 📊 Entidades Principales

### Usuario
- Información personal (nombre, email, DNI, teléfono)
- Tipos: Conductor / Dueño de Estacionamiento
- Autenticación con password hasheado
- Relación con locales propios

### Local (Playa de Estacionamiento)
- **Básico**: Nombre, dirección, teléfono, capacidad
- **Económico**: Precio por hora
- **Ubicación**: Coordenadas (latitud, longitud)
- **Disponibilidad**: Espacios ocupados/disponibles en tiempo real
- **Rating**: Sistema de calificación (0-5 estrellas)
- **Servicios**: Cámaras, seguridad 24h, techado
- **Operación**: Horarios, estado, descripción

### Reserva
- Gestión de reservas de estacionamiento
- Relación usuario-local
- Control de tiempos y estados

## 🛠️ Tecnologías

- **Framework**: NestJS
- **Base de Datos**: PostgreSQL con TypeORM
- **Autenticación**: JWT + Passport
- **Validación**: class-validator, class-transformer
- **Seguridad**: bcryptjs para passwords
- **Desarrollo**: TypeScript, ESLint

## 📁 Estructura del Proyecto

```
src/
├── app.module.ts              # Módulo principal
├── main.ts                    # Punto de entrada
├── login/                     # Autenticación JWT
│   ├── guards/                # Guards de autenticación
│   ├── strategies/            # Estrategias Passport
│   └── decorators/            # Decorador CurrentUser
├── usuario/                   # Gestión de usuarios
├── local/                     # Gestión de estacionamientos
│   ├── dto/                   # DTOs de validación
│   ├── local.entity.ts        # Entidad principal
│   ├── local.controller.ts    # Endpoints REST
│   └── local.service.ts       # Lógica de negocio
└── reserva/                   # Sistema de reservas
```

## 🚀 Endpoints Principales

### Autenticación
```http
POST /auth/register            # Registro de usuario
POST /auth/login              # Login con JWT
```

### Locales (Estacionamientos)
```http
GET    /local                 # Listar todos los locales
GET    /local/cercanos        # Buscar locales cercanos
GET    /local/:id             # Obtener local específico
POST   /local                 # Crear local (JWT)
PUT    /local/:id             # Actualizar local (JWT)
PUT    /local/:id/disponibilidad  # Actualizar disponibilidad (JWT)
DELETE /local/:id             # Eliminar local (JWT)
```

### Usuarios y Reservas
```http
GET    /usuario               # Gestión de usuarios
POST   /reserva               # Sistema de reservas
```

## 🔧 Configuración Rápida

### 1. Variables de Entorno
```bash
# .env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=tu_password
DATABASE_NAME=parkingnow_db
JWT_SECRET=tu_jwt_secret_muy_seguro
```

### 2. Instalación
```bash
npm install
```

### 3. Base de Datos
```bash
# Crear base de datos PostgreSQL
createdb parkingnow_db
```

### 4. Ejecución
```bash
# Desarrollo
npm run start:dev

# Producción  
npm run start:prod
```

## 📚 Documentación Detallada

- **[LOCALES_API_GUIDE.md](./LOCALES_API_GUIDE.md)**: Guía completa de la API de locales
- **[TESTING_GUIDE.md](./TESTING_GUIDE.md)**: Ejemplos y pruebas de todos los endpoints
- **[AUTH_README.md](./AUTH_README.md)**: Documentación del sistema de autenticación

## 🧪 Ejemplos de Uso

### Crear un Estacionamiento
```javascript
const nuevoLocal = {
  "nombre": "Estacionamiento Centro",
  "direccion": "Av. Principal 123",
  "plazas": 50,
  "precio_por_hora": 3.50,
  "latitud": -12.046374,
  "longitud": -77.042793,
  "tiene_camaras": true,
  "seguridad_24h": true,
  "techado": false,
  "id_usuario": 1
};

fetch('/local', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(nuevoLocal)
});
```

### Buscar Estacionamientos Cercanos
```javascript
const localesCercanos = await fetch(
  `/local/cercanos?lat=-12.046374&lng=-77.042793&radio=5000`
).then(res => res.json());
```

### Actualizar Disponibilidad en Tiempo Real
```javascript
await fetch(`/local/1/disponibilidad`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({ espacios_ocupados: 25 })
});
```

## 🔒 Seguridad

- **JWT Tokens**: Autenticación stateless
- **bcryptjs**: Hash seguro de contraseñas  
- **Guards**: Protección de rutas sensibles
- **Validación**: DTOs con class-validator
- **Permisos**: Control de acceso basado en propietario
- **CORS**: Configurado para producción

## 🌍 Características Geográficas

- **Búsqueda por Proximidad**: Algoritmo de Haversine
- **Coordenadas Precisas**: Latitud/Longitud con alta precisión
- **Radio Personalizable**: Búsqueda en metros configurable
- **Ordenamiento**: Resultados ordenados por distancia

## 📱 Integración Frontend

Compatible con cualquier frontend que consuma APIs REST:

- **React Native**: Para aplicaciones móviles
- **React/Angular/Vue**: Para aplicaciones web
- **Flutter**: Para desarrollo multiplataforma
- **Ionic**: Para aplicaciones híbridas

## 🔄 Estados y Flujos

### Estados de Local
- `disponible`: Operativo y con espacios
- `ocupado`: Sin espacios disponibles  
- `mantenimiento`: Temporalmente cerrado
- `cerrado`: Fuera de horario de operación

### Flujo de Reserva
1. Usuario busca locales cercanos
2. Selecciona local disponible
3. Verifica precio y características
4. Realiza reserva (próximamente)

## 🚧 Roadmap

### Próximas Funcionalidades
- [ ] Sistema de reservas completo
- [ ] Pagos integrados  
- [ ] Notificaciones push
- [ ] Sistema de rating y reseñas
- [ ] Dashboard de analytics
- [ ] API de sensores IoT
- [ ] WebSockets para tiempo real

### Optimizaciones Técnicas
- [ ] Cache con Redis
- [ ] Índices geográficos
- [ ] Rate limiting
- [ ] Logs estructurados
- [ ] Métricas y monitoring

## 🤝 Contribución

1. Fork del proyecto
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver `LICENSE` para más detalles.

## 👥 Equipo

Desarrollado para el curso de Aplicaciones para Dispositivos Móviles - Ciclo 7

---

## NestJS Framework Information

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

# 🚗 ParkingNow Backend

Backend NestJS para una aplicación de gestión de estacionamientos con autenticación JWT, geolocalización y gestión en tiempo real.

## 🌟 Características Principales

### 🔐 Sistema de Autenticación
- **JWT Authentication**: Autenticación segura con tokens
- **Registro y Login**: Endpoints para gestión de usuarios
- **Protección de Rutas**: Guards para endpoints sensibles
- **Tipos de Usuario**: Conductores y Dueños de Estacionamiento

### 🏢 Gestión Avanzada de Estacionamientos
- **Información Completa**: Rating, precio, ubicación, disponibilidad
- **Geolocalización**: Búsqueda por proximidad usando coordenadas
- **Disponibilidad en Tiempo Real**: Control de espacios ocupados/disponibles
- **Servicios**: Cámaras, seguridad 24h, techado
- **Horarios**: Gestión de apertura y cierre

### 🚀 Funcionalidades API
- **CRUD Completo**: Crear, leer, actualizar, eliminar locales
- **Búsqueda Geográfica**: Locales cercanos con radio personalizable  
- **Filtros Avanzados**: Por disponibilidad, características, estado
- **Validaciones**: DTOs con class-validator para entrada segura
- **Permisos**: Sistema de autorización basado en propietario

## 📊 Entidades Principales

### Usuario
- Información personal (nombre, email, DNI, teléfono)
- Tipos: Conductor / Dueño de Estacionamiento
- Autenticación con password hasheado
- Relación con locales propios

### Local (Playa de Estacionamiento)
- **Básico**: Nombre, dirección, teléfono, capacidad
- **Económico**: Precio por hora
- **Ubicación**: Coordenadas (latitud, longitud)
- **Disponibilidad**: Espacios ocupados/disponibles en tiempo real
- **Rating**: Sistema de calificación (0-5 estrellas)
- **Servicios**: Cámaras, seguridad 24h, techado
- **Operación**: Horarios, estado, descripción

### Reserva
- Gestión de reservas de estacionamiento
- Relación usuario-local
- Control de tiempos y estados

## 🛠️ Tecnologías

- **Framework**: NestJS
- **Base de Datos**: PostgreSQL con TypeORM
- **Autenticación**: JWT + Passport
- **Validación**: class-validator, class-transformer
- **Seguridad**: bcryptjs para passwords
- **Desarrollo**: TypeScript, ESLint

## 📁 Estructura del Proyecto

```
src/
├── app.module.ts              # Módulo principal
├── main.ts                    # Punto de entrada
├── login/                     # Autenticación JWT
│   ├── guards/                # Guards de autenticación
│   ├── strategies/            # Estrategias Passport
│   └── decorators/            # Decorador CurrentUser
├── usuario/                   # Gestión de usuarios
├── local/                     # Gestión de estacionamientos
│   ├── dto/                   # DTOs de validación
│   ├── local.entity.ts        # Entidad principal
│   ├── local.controller.ts    # Endpoints REST
│   └── local.service.ts       # Lógica de negocio
└── reserva/                   # Sistema de reservas
```

## 🚀 Endpoints Principales

### Autenticación
```http
POST /auth/register            # Registro de usuario
POST /auth/login              # Login con JWT
```

### Locales (Estacionamientos)
```http
GET    /local                 # Listar todos los locales
GET    /local/cercanos        # Buscar locales cercanos
GET    /local/:id             # Obtener local específico
POST   /local                 # Crear local (JWT)
PUT    /local/:id             # Actualizar local (JWT)
PUT    /local/:id/disponibilidad  # Actualizar disponibilidad (JWT)
DELETE /local/:id             # Eliminar local (JWT)
```

### Usuarios y Reservas
```http
GET    /usuario               # Gestión de usuarios
POST   /reserva               # Sistema de reservas
```

## 🔧 Configuración Rápida

### 1. Variables de Entorno
```bash
# .env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=tu_password
DATABASE_NAME=parkingnow_db
JWT_SECRET=tu_jwt_secret_muy_seguro
```

### 2. Instalación
```bash
npm install
```

### 3. Base de Datos
```bash
# Crear base de datos PostgreSQL
createdb parkingnow_db
```

### 4. Ejecución
```bash
# Desarrollo
npm run start:dev

# Producción  
npm run start:prod
```

## 📚 Documentación Detallada

- **[LOCALES_API_GUIDE.md](./LOCALES_API_GUIDE.md)**: Guía completa de la API de locales
- **[TESTING_GUIDE.md](./TESTING_GUIDE.md)**: Ejemplos y pruebas de todos los endpoints
- **[AUTH_README.md](./AUTH_README.md)**: Documentación del sistema de autenticación

## 🧪 Ejemplos de Uso

### Crear un Estacionamiento
```javascript
const nuevoLocal = {
  "nombre": "Estacionamiento Centro",
  "direccion": "Av. Principal 123",
  "plazas": 50,
  "precio_por_hora": 3.50,
  "latitud": -12.046374,
  "longitud": -77.042793,
  "tiene_camaras": true,
  "seguridad_24h": true,
  "techado": false,
  "id_usuario": 1
};

fetch('/local', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(nuevoLocal)
});
```

### Buscar Estacionamientos Cercanos
```javascript
const localesCercanos = await fetch(
  `/local/cercanos?lat=-12.046374&lng=-77.042793&radio=5000`
).then(res => res.json());
```

### Actualizar Disponibilidad en Tiempo Real
```javascript
await fetch(`/local/1/disponibilidad`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({ espacios_ocupados: 25 })
});
```

## 🔒 Seguridad

- **JWT Tokens**: Autenticación stateless
- **bcryptjs**: Hash seguro de contraseñas  
- **Guards**: Protección de rutas sensibles
- **Validación**: DTOs con class-validator
- **Permisos**: Control de acceso basado en propietario
- **CORS**: Configurado para producción

## 🌍 Características Geográficas

- **Búsqueda por Proximidad**: Algoritmo de Haversine
- **Coordenadas Precisas**: Latitud/Longitud con alta precisión
- **Radio Personalizable**: Búsqueda en metros configurable
- **Ordenamiento**: Resultados ordenados por distancia

## 📱 Integración Frontend

Compatible con cualquier frontend que consuma APIs REST:

- **React Native**: Para aplicaciones móviles
- **React/Angular/Vue**: Para aplicaciones web
- **Flutter**: Para desarrollo multiplataforma
- **Ionic**: Para aplicaciones híbridas

## 🔄 Estados y Flujos

### Estados de Local
- `disponible`: Operativo y con espacios
- `ocupado`: Sin espacios disponibles  
- `mantenimiento`: Temporalmente cerrado
- `cerrado`: Fuera de horario de operación

### Flujo de Reserva
1. Usuario busca locales cercanos
2. Selecciona local disponible
3. Verifica precio y características
4. Realiza reserva (próximamente)

## 🚧 Roadmap

### Próximas Funcionalidades
- [ ] Sistema de reservas completo
- [ ] Pagos integrados  
- [ ] Notificaciones push
- [ ] Sistema de rating y reseñas
- [ ] Dashboard de analytics
- [ ] API de sensores IoT
- [ ] WebSockets para tiempo real

### Optimizaciones Técnicas
- [ ] Cache con Redis
- [ ] Índices geográficos
- [ ] Rate limiting
- [ ] Logs estructurados
- [ ] Métricas y monitoring

## 🤝 Contribución

1. Fork del proyecto
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver `LICENSE` para más detalles.

## 👥 Equipo

Desarrollado para el curso de Aplicaciones para Dispositivos Móviles - Ciclo 7

---

## NestJS Framework Information

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

# 🚗 ParkingNow Backend

Backend NestJS para una aplicación de gestión de estacionamientos con autenticación JWT, geolocalización y gestión en tiempo real.

## 🌟 Características Principales

### 🔐 Sistema de Autenticación
- **JWT Authentication**: Autenticación segura con tokens
- **Registro y Login**: Endpoints para gestión de usuarios
- **Protección de Rutas**: Guards para endpoints sensibles
- **Tipos de Usuario**: Conductores y Dueños de Estacionamiento

### 🏢 Gestión Avanzada de Estacionamientos
- **Información Completa**: Rating, precio, ubicación, disponibilidad
- **Geolocalización**: Búsqueda por proximidad usando coordenadas
- **Disponibilidad en Tiempo Real**: Control de espacios ocupados/disponibles
- **Servicios**: Cámaras, seguridad 24h, techado
- **Horarios**: Gestión de apertura y cierre

### 🚀 Funcionalidades API
- **CRUD Completo**: Crear, leer, actualizar, eliminar locales
- **Búsqueda Geográfica**: Locales cercanos con radio personalizable  
- **Filtros Avanzados**: Por disponibilidad, características, estado
- **Validaciones**: DTOs con class-validator para entrada segura
- **Permisos**: Sistema de autorización basado en propietario

## 📊 Entidades Principales

### Usuario
- Información personal (nombre, email, DNI, teléfono)
- Tipos: Conductor / Dueño de Estacionamiento
- Autenticación con password hasheado
- Relación con locales propios

### Local (Playa de Estacionamiento)
- **Básico**: Nombre, dirección, teléfono, capacidad
- **Económico**: Precio por hora
- **Ubicación**: Coordenadas (latitud, longitud)
- **Disponibilidad**: Espacios ocupados/disponibles en tiempo real
- **Rating**: Sistema de calificación (0-5 estrellas)
- **Servicios**: Cámaras, seguridad 24h, techado
- **Operación**: Horarios, estado, descripción

### Reserva
- Gestión de reservas de estacionamiento
- Relación usuario-local
- Control de tiempos y estados

## 🛠️ Tecnologías

- **Framework**: NestJS
- **Base de Datos**: PostgreSQL con TypeORM
- **Autenticación**: JWT + Passport
- **Validación**: class-validator, class-transformer
- **Seguridad**: bcryptjs para passwords
- **Desarrollo**: TypeScript, ESLint

## 📁 Estructura del Proyecto

```
src/
├── app.module.ts              # Módulo principal
├── main.ts                    # Punto de entrada
├── login/                     # Autenticación JWT
│   ├── guards/                # Guards de autenticación
│   ├── strategies/            # Estrategias Passport
│   └── decorators/            # Decorador CurrentUser
├── usuario/                   # Gestión de usuarios
├── local/                     # Gestión de estacionamientos
│   ├── dto/                   # DTOs de validación
│   ├── local.entity.ts        # Entidad principal
│   ├── local.controller.ts    # Endpoints REST
│   └── local.service.ts       # Lógica de negocio
└── reserva/                   # Sistema de reservas
```

## 🚀 Endpoints Principales

### Autenticación
```http
POST /auth/register            # Registro de usuario
POST /auth/login              # Login con JWT
```

### Locales (Estacionamientos)
```http
GET    /local                 # Listar todos los locales
GET    /local/cercanos        # Buscar locales cercanos
GET    /local/:id             # Obtener local específico
POST   /local                 # Crear local (JWT)
PUT    /local/:id             # Actualizar local (JWT)
PUT    /local/:id/disponibilidad  # Actualizar disponibilidad (JWT)
DELETE /local/:id             # Eliminar local (JWT)
```

### Usuarios y Reservas
```http
GET    /usuario               # Gestión de usuarios
POST   /reserva               # Sistema de reservas
```

## 🔧 Configuración Rápida

### 1. Variables de Entorno
```bash
# .env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=tu_password
DATABASE_NAME=parkingnow_db
JWT_SECRET=tu_jwt_secret_muy_seguro
```

### 2. Instalación
```bash
npm install
```

### 3. Base de Datos
```bash
# Crear base de datos PostgreSQL
createdb parkingnow_db
```

### 4. Ejecución
```bash
# Desarrollo
npm run start:dev

# Producción  
npm run start:prod
```

## 📚 Documentación Detallada

- **[LOCALES_API_GUIDE.md](./LOCALES_API_GUIDE.md)**: Guía completa de la API de locales
- **[TESTING_GUIDE.md](./TESTING_GUIDE.md)**: Ejemplos y pruebas de todos los endpoints
- **[AUTH_README.md](./AUTH_README.md)**: Documentación del sistema de autenticación

## 🧪 Ejemplos de Uso

### Crear un Estacionamiento
```javascript
const nuevoLocal = {
  "nombre": "Estacionamiento Centro",
  "direccion": "Av. Principal 123",
  "plazas": 50,
  "precio_por_hora": 3.50,
  "latitud": -12.046374,
  "longitud": -77.042793,
  "tiene_camaras": true,
  "seguridad_24h": true,
  "techado": false,
  "id_usuario": 1
};

fetch('/local', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(nuevoLocal)
});
```

### Buscar Estacionamientos Cercanos
```javascript
const localesCercanos = await fetch(
  `/local/cercanos?lat=-12.046374&lng=-77.042793&radio=5000`
).then(res => res.json());
```

### Actualizar Disponibilidad en Tiempo Real
```javascript
await fetch(`/local/1/disponibilidad`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({ espacios_ocupados: 25 })
});
```

## 🔒 Seguridad

- **JWT Tokens**: Autenticación stateless
- **bcryptjs**: Hash seguro de contraseñas  
- **Guards**: Protección de rutas sensibles
- **Validación**: DTOs con class-validator
- **Permisos**: Control de acceso basado en propietario
- **CORS**: Configurado para producción

## 🌍 Características Geográficas

- **Búsqueda por Proximidad**: Algoritmo de Haversine
- **Coordenadas Precisas**: Latitud/Longitud con alta precisión
- **Radio Personalizable**: Búsqueda en metros configurable
- **Ordenamiento**: Result