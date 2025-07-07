# TaskManager - Sistema de Gestión de Tareas y Proyectos

## Descripción del Proyecto

TaskManager es un sistema completo de gestión de tareas y proyectos de programación que permite a los usuarios organizar, asignar y dar seguimiento a tareas dentro de proyectos colaborativos. El sistema está compuesto por tres aplicaciones complementarias desarrolladas con tecnologías modernas de desarrollo web.

## Arquitectura del Sistema

### 1. TaskManager.API - API RESTful
- **Tecnología**: ASP.NET Core Web API (.NET 8)
- **Base de Datos**: SQL Server con Entity Framework Core
- **Autenticación**: JWT (JSON Web Tokens)
- **Funcionalidades**:
  - Autenticación y autorización de usuarios
  - CRUD completo para proyectos y tareas
  - Gestión de equipos de trabajo
  - Generación de códigos QR seguros
  - API endpoints protegidos

### 2. TaskManager.MVC - Aplicación Web MVC
- **Tecnología**: ASP.NET Core MVC con Razor Pages
- **Autenticación**: Cookie Authentication
- **Funcionalidades**:
  - Registro y login de usuarios
  - Gestión completa de proyectos y tareas
  - Interfaz web responsiva
  - Generación y validación de códigos QR
  - Recuperación de contraseñas

### 3. TaskManager.SPA - Single Page Application
- **Tecnología**: React 18 con Bootstrap
- **Estado Global**: React Query para manejo de datos
- **Funcionalidades**:
  - Interfaz de usuario moderna y responsiva
  - Gestión en tiempo real de proyectos y tareas
  - Autenticación con JWT
  - Experiencia de usuario fluida

## Características Principales

### ✅ Funcionalidades Implementadas

#### Autenticación y Seguridad
- [x] Registro de nuevos usuarios
- [x] Inicio de sesión con email y contraseña
- [x] Contraseñas hasheadas con BCrypt (hash + salt)
- [x] Recuperación de contraseña por email
- [x] Autenticación JWT para la API
- [x] Autenticación por cookies para MVC

#### Gestión de Proyectos
- [x] Crear, editar, eliminar y listar proyectos
- [x] Asignación de miembros del equipo
- [x] Estados de proyecto (Planificación, En Progreso, Completado, etc.)
- [x] Fechas de vencimiento
- [x] Listado paginado de proyectos

#### Gestión de Tareas
- [x] Crear, editar, eliminar y listar tareas
- [x] Asignación a miembros del equipo
- [x] Estados de tarea (Por Hacer, En Progreso, Pruebas, Completado)
- [x] Prioridades (Baja, Media, Alta, Crítica)
- [x] Fechas de vencimiento
- [x] Vinculación con proyectos

#### Funcionalidad QR Exclusiva
- [x] Generación de códigos QR seguros desde el backend
- [x] Códigos QR con expiración temporal (10 minutos)
- [x] Validación segura con HMAC-SHA256
- [x] Acceso a funcionalidades exclusivas mediante QR
- [x] Enlaces únicos y seguros por usuario

## Tecnologías Utilizadas

### Backend
- **ASP.NET Core 8.0** - Framework web principal
- **Entity Framework Core** - ORM para base de datos
- **SQL Server** - Base de datos relacional
- **JWT Bearer Authentication** - Autenticación para API
- **BCrypt.Net** - Hash de contraseñas
- **QRCoder** - Generación de códigos QR
- **Swagger/OpenAPI** - Documentación de API

### Frontend
- **React 18** - Biblioteca para SPA
- **React Router** - Enrutamiento en SPA
- **React Query** - Gestión de estado y datos
- **Bootstrap 5** - Framework CSS
- **Axios** - Cliente HTTP
- **React Toastify** - Notificaciones
- **Font Awesome** - Iconos

## Instalación y Configuración

### Prerrequisitos
- .NET 8.0 SDK
- SQL Server LocalDB o SQL Server
- Node.js 18+ (para la SPA)
- Visual Studio 2022 o VS Code

### Configuración de la Base de Datos

1. Actualizar la cadena de conexión en `appsettings.json`:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=TaskManagerDb;Trusted_Connection=true;MultipleActiveResultSets=true"
  }
}
```

2. La base de datos se creará automáticamente al ejecutar la aplicación.

### Ejecutar la API

```bash
cd TaskManager.API
dotnet restore
dotnet run
```

La API estará disponible en: `https://localhost:7123`

### Ejecutar la Aplicación MVC

```bash
cd TaskManager.MVC
dotnet restore
dotnet run
```

La aplicación MVC estará disponible en: `https://localhost:5001`

### Ejecutar la SPA

```bash
cd TaskManager.SPA
npm install
npm start
```

La SPA estará disponible en: `http://localhost:3000`

## Uso del Sistema

### 1. Registro de Usuario
- Accede a la página de registro
- Completa el formulario con nombre, email y contraseña
- El sistema validará que el email no esté registrado
- Una vez registrado, serás redirigido al dashboard

### 2. Gestión de Proyectos
- Crea nuevos proyectos con nombre, descripción y fecha de vencimiento
- Asigna miembros del equipo al proyecto
- Cambia el estado del proyecto según su progreso
- Visualiza todos los proyectos en el dashboard

### 3. Gestión de Tareas
- Crea tareas dentro de proyectos existentes
- Asigna tareas a miembros del equipo
- Establece prioridades y fechas de vencimiento
- Actualiza el estado de las tareas conforme avances

### 4. Códigos QR Exclusivos
- Genera códigos QR desde el panel de control
- Escanea el código QR con tu dispositivo móvil
- Accede a funcionalidades exclusivas disponibles solo por QR
- Los códigos expiran automáticamente en 10 minutos

## Estructura del Proyecto

```
TaskManager/
├── TaskManager.sln                 # Solución de Visual Studio
├── TaskManager.Shared/            # Modelos y DTOs compartidos
│   ├── Models/                    # Entidades de dominio
│   └── DTOs/                      # Objetos de transferencia de datos
├── TaskManager.API/               # API RESTful
│   ├── Controllers/               # Controladores de API
│   ├── Services/                  # Servicios de negocio
│   ├── Data/                      # Contexto de base de datos
│   └── Program.cs                 # Punto de entrada de la API
├── TaskManager.MVC/               # Aplicación MVC
│   ├── Controllers/               # Controladores MVC
│   ├── Views/                     # Vistas Razor
│   ├── Models/                    # Modelos de vista
│   └── Program.cs                 # Punto de entrada MVC
├── TaskManager.SPA/               # Single Page Application
│   ├── src/
│   │   ├── components/           # Componentes reutilizables
│   │   ├── pages/                # Páginas de la aplicación
│   │   ├── services/             # Servicios para API
│   │   └── contexts/             # Contextos de React
│   ├── public/                   # Archivos estáticos
│   └── package.json              # Dependencias de Node.js
└── README.md                     # Documentación del proyecto
```

## Seguridad Implementada

### Autenticación
- Hash de contraseñas con BCrypt y salt único por usuario
- JWT con expiración configurable
- Cookies seguras con HttpOnly para MVC
- Protección contra ataques de fuerza bruta

### Autorización
- Endpoints protegidos que requieren autenticación
- Validación de permisos por proyecto y tarea
- Separación de responsabilidades entre capas

### Códigos QR Seguros
- Generación con HMAC-SHA256
- Expiración temporal automática
- Validación de integridad del código
- Enlaces únicos por usuario y sesión

## Bonus Implementados

### ✅ Características Adicionales
- **Diseño Responsivo**: Interfaces adaptadas para móviles y desktop
- **Validaciones**: Validación tanto en frontend como backend
- **Manejo de Errores**: Gestión completa de errores y casos edge
- **Notificaciones**: Sistema de notificaciones en tiempo real
- **Paginación**: Listados paginados para mejor rendimiento
- **Búsqueda y Filtros**: Capacidades de búsqueda en proyectos y tareas

## Casos de Uso Principales

1. **Gestión de Proyectos de Programación**
   - Crear proyectos para diferentes aplicaciones
   - Asignar desarrolladores a proyectos específicos
   - Seguimiento del progreso del proyecto

2. **Organización de Tareas**
   - Dividir proyectos en tareas específicas
   - Asignar tareas a desarrolladores
   - Establecer prioridades y fechas límite

3. **Colaboración en Equipo**
   - Visualizar el trabajo de otros miembros
   - Comunicación a través del estado de las tareas
   - Coordinación de esfuerzos del equipo

4. **Acceso Exclusivo**
   - Funcionalidades premium disponibles solo por QR
   - Estadísticas avanzadas y reportes
   - Exportación de datos del proyecto

## Contribución

Para contribuir al proyecto:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## Soporte

Si encuentras algún problema o tienes preguntas:

1. Revisa la documentación
2. Busca en los issues existentes
3. Crea un nuevo issue con detalles del problema

---

**Desarrollado con ❤️ para la gestión eficiente de proyectos de programación**
