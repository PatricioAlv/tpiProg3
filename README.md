# TaskManager - Sistema Completo de Gestión de Tareas y Proyectos

## 🚀 Descripción del Proyecto

TaskManager es un **sistema empresarial completo** de gestión de tareas y proyectos de programación que permite a los usuarios y equipos organizar, asignar y dar seguimiento a tareas dentro de proyectos colaborativos. El sistema está compuesto por **tres aplicaciones complementarias** desarrolladas con las tecnologías más modernas de desarrollo web.

## 🏗️ Arquitectura del Sistema

### 1. TaskManager.API - API RESTful Segura
- **Tecnología**: ASP.NET Core Web API (.NET 9.0)
- **Base de Datos**: SQLite con Entity Framework Core 9.0
- **Autenticación**: JWT Bearer con validación robusta
- **Documentación**: Swagger/OpenAPI integrado
- **Funcionalidades Principales**:
  - ✅ **Autenticación y autorización** completa con JWT
  - ✅ **CRUD completo** para proyectos y tareas con validaciones
  - ✅ **Gestión de equipos** y asignación de miembros
  - ✅ **Sistema QR avanzado** con preguntas .NET que rotan cada hora
  - ✅ **Paginación inteligente** con metadatos completos
  - ✅ **Recuperación de contraseña híbrida** (frontend/backend tokens)
  - ✅ **API endpoints** protegidos con autorización por usuario
  - ✅ **Validación HMAC-SHA256** para códigos QR seguros

### 2. TaskManager.MVC - Aplicación Web Empresarial
- **Tecnología**: ASP.NET Core MVC con Razor Pages
- **Autenticación**: Cookie Authentication segura
- **UI**: Bootstrap 5 con diseño responsivo moderno
- **Funcionalidades Principales**:
  - ✅ **Registro y login** con validaciones robustas
  - ✅ **Gestión completa** de proyectos y tareas con interfaz intuitiva
  - ✅ **Generación y validación** de códigos QR seguros
  - ✅ **Acceso exclusivo** a preguntas técnicas sobre .NET
  - ✅ **Recuperación de contraseñas** con flujo completo
  - ✅ **Interfaz responsive** optimizada para dispositivos móviles
  - ✅ **JavaScript avanzado** para interacciones dinámicas

### 3. TaskManager.SPA - Single Page Application Moderna
- **Tecnología**: React 18.2.0 con TypeScript-ready
- **Estado Global**: React Query 3.39.3 para cache inteligente
- **UI**: React Bootstrap 2.8.0 con componentes modernos
- **Funcionalidades Principales**:
  - ✅ **Interfaz moderna** con experiencia de usuario fluida
  - ✅ **Gestión en tiempo real** con actualizaciones automáticas
  - ✅ **Autenticación JWT** con manejo seguro de tokens
  - ✅ **Paginación avanzada** (6 proyectos por página)
  - ✅ **Generación de QR** con interfaz intuitiva
  - ✅ **Recuperación de contraseña** funcional con UI/UX completa
  - ✅ **Notificaciones elegantes** con React Toastify
  - ✅ **Navegación protegida** con rutas autenticadas

## ✨ Características Principales Implementadas

### 🔐 Autenticación y Seguridad Empresarial
- [x] **Registro de usuarios** con validaciones robustas (email único, contraseña segura)
- [x] **Inicio de sesión seguro** con email y contraseña
- [x] **Hash de contraseñas** con BCrypt + salt único por usuario
- [x] **Recuperación de contraseña híbrida** con soporte frontend/backend tokens
- [x] **Tokens JWT** con expiración configurable (1 hora por defecto)
- [x] **Autenticación dual**: JWT para API, Cookies para MVC
- [x] **Autorización por usuario** en todos los endpoints
- [x] **Manejo seguro de sesiones** con logout automático

### 📊 Gestión Avanzada de Proyectos
- [x] **CRUD completo** (Crear, Leer, Actualizar, Eliminar) para proyectos
- [x] **Asignación inteligente** de miembros del equipo por proyecto
- [x] **Estados personalizables**: Planificación, En Progreso, Completado, En Pausa, Cancelado
- [x] **Gestión de fechas** de vencimiento con validaciones
- [x] **Listado paginado** con navegación intuitiva (6 proyectos por página en SPA)
- [x] **Filtros y búsqueda** en tiempo real
- [x] **Interfaz responsive** optimizada para móviles y tablets
- [x] **Validaciones de permisos** por usuario autenticado

### 📋 Sistema Completo de Tareas
- [x] **CRUD completo** para tareas con validaciones avanzadas
- [x] **Asignación flexible** a miembros específicos del equipo
- [x] **Estados inteligentes**: Por Hacer, En Progreso, Pruebas, Completado
- [x] **Prioridades definidas**: Baja, Media, Alta, Crítica
- [x] **Gestión de fechas** límite con alertas visuales
- [x] **Vinculación directa** con proyectos específicos
- [x] **Paginación backend** optimizada para gran volumen de datos
- [x] **Seguimiento de progreso** con indicadores visuales

### 🔍 Sistema QR Exclusivo con Preguntas .NET

#### 🛡️ Generación y Seguridad QR
- [x] **Generación segura** de códigos QR con HMAC-SHA256
- [x] **Expiración automática** de códigos (10 minutos por seguridad)
- [x] **Validación de integridad** con hash criptográfico
- [x] **Enlaces únicos** por usuario y timestamp
- [x] **Protección contra manipulación** de datos del QR

#### 🧠 Sistema de Preguntas Rotativas .NET
- [x] **24 preguntas técnicas únicas** sobre tecnologías .NET
- [x] **Rotación automática cada hora** (pregunta diferente según hora 0-23)
- [x] **Temas especializados**: .NET Core, C#, ASP.NET Core, Entity Framework, LINQ
- [x] **Formato estandarizado**: Opción múltiple (A, B, C, D)
- [x] **Validación automática** de respuestas con feedback inmediato
- [x] **Acceso exclusivo** solo mediante QR válido y no expirado

#### 🌐 Integración Multi-Plataforma QR
- [x] **API endpoints especializados**: `/api/qr/generate`, `/api/qr/validate`, `/api/qr/exclusive-question`
- [x] **MVC con vistas dedicadas**: Generación, validación y preguntas exclusivas
- [x] **SPA con componentes modernos**: Interfaz React para generación y acceso
- [x] **Redirección inteligente** a contenido exclusivo tras validación
- [x] **Manejo de errores** robusto con mensajes informativos

### 🔄 Recuperación de Contraseña Avanzada

#### 🔗 Flujo Híbrido de Recuperación
- [x] **Generación dual de tokens**: Frontend (desarrollo) y Backend (producción)
- [x] **Validación de expiración** robusta (1 hora configurable)
- [x] **Soporte para ambientes**: Desarrollo con enlaces en consola, Producción con email
- [x] **Seguridad avanzada**: Tokens únicos por solicitud
- [x] **Limpieza automática** de tokens usados o expirados

#### ⚛️ Componentes Frontend Completos
- [x] **ForgotPassword.js**: Interfaz completa para generar y mostrar enlaces
- [x] **ResetPassword.js**: Formulario avanzado para cambio de contraseña
- [x] **Integración en App.js**: Rutas protegidas y navegación fluida
- [x] **Enlaces en Login.js**: Acceso directo al flujo de recuperación
- [x] **Validaciones robustas**: Confirmación de contraseña y mensajes claros

### 📄 Paginación Inteligente y Optimizada

#### 🔧 Backend Optimizado
- [x] **Endpoint especializado** `/api/projects/paginated` con parámetros flexibles
- [x] **DTO estandarizado** `PagedResultDto<T>` con metadatos completos
- [x] **Implementación en servicios**: ProjectService y TaskService
- [x] **Optimización de consultas** con Skip/Take para mejor rendimiento
- [x] **Soporte para filtros** y búsquedas paginadas

#### ⚛️ Frontend Avanzado
- [x] **Componente Pagination.js** reutilizable con React Bootstrap
- [x] **Integración en Projects.js** para 6 proyectos por página
- [x] **Navegación intuitiva** con botones prev/next y números de página
- [x] **Elipsis inteligentes** para manejar gran cantidad de páginas
- [x] **Información contextual**: "Mostrando X-Y de Z elementos"
- [x] **Estado persistente** entre navegaciones y actualizaciones

## 🛠️ Tecnologías y Herramientas

### 🔙 Backend (.NET Ecosystem)
- **ASP.NET Core 9.0** - Framework web de última generación
- **Entity Framework Core 9.0** - ORM avanzado con LINQ
- **SQLite 3.46+** - Base de datos ligera y eficiente
- **JWT Bearer Authentication** - Autenticación stateless segura
- **BCrypt.Net-Next 4.0.3** - Hash criptográfico de contraseñas
- **QRCoder 1.4.3** - Generación de códigos QR de alta calidad
- **Swashbuckle.AspNetCore 6.4.0** - Documentación OpenAPI/Swagger automática
- **Microsoft.AspNetCore.Authentication.JwtBearer 9.0.0** - Middleware JWT
- **Microsoft.EntityFrameworkCore.Sqlite 9.0.0** - Proveedor SQLite para EF Core

### 🔚 Frontend (React Ecosystem)
- **React 18.2.0** - Biblioteca principal para interfaces de usuario
- **React Router DOM 6.3.0** - Enrutamiento SPA declarativo
- **React Query 3.39.3** - Gestión de estado del servidor y cache
- **Bootstrap 5.3.0** - Framework CSS responsive y moderno
- **React Bootstrap 2.8.0** - Componentes Bootstrap nativos para React
- **Axios 1.4.0** - Cliente HTTP con interceptores
- **React Toastify 9.1.3** - Sistema de notificaciones elegante
- **React Hook Form 7.45.0** - Gestión de formularios con validación
- **Font Awesome 6.4.0** - Iconografía moderna y escalable
- **js-cookie 3.0.5** - Gestión de cookies del navegador

### 🧪 Testing y Quality Assurance
- **@testing-library/react 13.3.0** - Testing de componentes React
- **@testing-library/jest-dom 5.16.4** - Matchers adicionales para Jest
- **@testing-library/user-event 13.5.0** - Simulación de eventos de usuario

### 🔧 Herramientas de Desarrollo
- **.NET 9.0 SDK** - Kit de desarrollo .NET completo
- **Node.js 18+ LTS** - Runtime JavaScript para frontend
- **Visual Studio 2022** - IDE principal recomendado
- **VS Code** - Editor ligero con extensiones .NET y React
- **Git 2.40+** - Control de versiones distribuido
- **PowerShell 7+** - Shell para scripts de automatización

## 📦 Instalación y Configuración

### 📋 Prerrequisitos del Sistema
- **.NET 9.0 SDK** - [Descargar desde Microsoft](https://dotnet.microsoft.com/download/dotnet/9.0)
- **Node.js 18+ LTS** - [Descargar desde Node.js](https://nodejs.org/) (para la SPA)
- **SQLite** - Incluido automáticamente con .NET 9.0
- **Git 2.40+** - Para clonar el repositorio
- **PowerShell 7+** - Para ejecutar scripts (Windows)

### 🚀 Configuración Inicial Completa

#### 1. Clonar y Configurar el Repositorio
```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd TaskManager

# Verificar que .NET está instalado
dotnet --version  # Debe mostrar 9.0.x

# Verificar que Node.js está instalado
node --version    # Debe mostrar 18.x o superior
npm --version     # Debe mostrar 9.x o superior
```

#### 2. Configuración del Backend (API + MVC)
```bash
# Restaurar paquetes NuGet para toda la solución
dotnet restore TaskManager.sln

# Verificar que la compilación funciona
dotnet build TaskManager.sln

# La base de datos SQLite se creará automáticamente al ejecutar
```

#### 3. Configuración del Frontend (SPA)
```bash
# Navegar al directorio del SPA
cd TaskManager.SPA

# Instalar dependencias de Node.js
npm install

# Verificar que no hay vulnerabilidades críticas
npm audit

# Opcional: Ejecutar test básicos
npm test -- --watchAll=false
```

### ▶️ Ejecutar el Sistema Completo

#### 🎯 Opción 1: Scripts de Conveniencia (Recomendado)
```bash
# Desde el directorio raíz del proyecto
.\start-all.bat          # Inicia API (puerto 5000) + SPA (puerto 3000)
.\clean-database.bat     # Limpia la base de datos (opcional)
```

#### 🎯 Opción 2: Ejecución Manual Detallada

##### 1. Ejecutar la API (Terminal 1)
```bash
cd TaskManager.API
dotnet run
# API disponible en: http://localhost:5000
# Swagger UI en: http://localhost:5000/swagger
```

##### 2. Ejecutar la Aplicación MVC (Terminal 2)
```bash
cd TaskManager.MVC
dotnet run
# MVC disponible en: http://localhost:5001
```

##### 3. Ejecutar la SPA React (Terminal 3)
```bash
cd TaskManager.SPA
npm start
# SPA disponible en: http://localhost:3000
# Se abrirá automáticamente en el navegador
```

#### 🎯 Opción 3: Usando VS Code Tasks
```bash
# Abrir VS Code en el directorio raíz
code .

# Ejecutar task de compilación
Ctrl+Shift+P → "Tasks: Run Task" → "build-all"

# Para desarrollo, ejecutar cada proyecto por separado desde VS Code
```

### 🔧 Configuración Avanzada

#### Variables de Entorno (Opcional)
Crear archivo `.env` en el directorio raíz:
```env
# API Configuration
ASPNETCORE_ENVIRONMENT=Development
JWT_SECRET_KEY=tu-clave-secreta-super-segura-de-al-menos-32-caracteres
JWT_EXPIRATION_HOURS=1
QR_EXPIRATION_MINUTES=10

# Database
CONNECTION_STRING=Data Source=TaskManager.db

# Frontend
REACT_APP_API_URL=http://localhost:5000/api
```

#### Configuración de Puertos (appsettings.json)
```json
{
  "Kestrel": {
    "Endpoints": {
      "Http": {
        "Url": "http://localhost:5000"
      }
    }
  }
}
```

## 📖 Guía Completa de Uso del Sistema

### 🔐 1. Registro y Autenticación

#### Crear Nueva Cuenta
1. **Acceder al sistema**: Navega a `http://localhost:3000` (SPA) o `http://localhost:5001` (MVC)
2. **Registro**: Haz clic en "Registrarse" y completa:
   - **Nombre completo** (mínimo 2 caracteres)
   - **Email válido** (debe ser único en el sistema)
   - **Contraseña segura** (mínimo 6 caracteres)
3. **Confirmación**: Tras el registro exitoso, serás redirigido al dashboard automáticamente
4. **Token JWT**: Se genera automáticamente y se almacena de forma segura

#### Iniciar Sesión
1. **Login**: Ingresa email y contraseña registrados
2. **Sesión**: El sistema mantiene la sesión activa con tokens seguros
3. **Auto-logout**: Las sesiones expiran automáticamente por seguridad

### 📊 2. Gestión de Proyectos

#### Ver y Navegar Proyectos
1. **Dashboard**: Accede desde el menú principal a "Mis Proyectos"
2. **Paginación inteligente**: Navega entre páginas (6 proyectos por página en SPA)
3. **Filtros**: Busca por nombre, estado o miembro del equipo
4. **Vista detallada**: Haz clic en cualquier proyecto para ver detalles completos

#### Crear Nuevo Proyecto
1. **Botón "Nuevo Proyecto"**: Desde la lista de proyectos
2. **Formulario completo**:
   - **Nombre del proyecto** (obligatorio)
   - **Descripción detallada**
   - **Estado inicial** (Planificación por defecto)
   - **Fecha de vencimiento** (opcional)
   - **Miembros del equipo** (selección múltiple)
3. **Validaciones**: El sistema valida todos los campos automáticamente
4. **Confirmación**: El proyecto se crea y aparece inmediatamente en la lista

#### Editar y Actualizar Proyectos
1. **Acceso**: Botón "Editar" desde la vista de proyecto o lista
2. **Modificaciones disponibles**:
   - Cambiar nombre y descripción
   - Actualizar estado del proyecto
   - Modificar fechas de vencimiento
   - Agregar/quitar miembros del equipo
3. **Guardado automático**: Los cambios se sincronizan inmediatamente

### 📋 3. Gestión de Tareas

#### Crear Tareas en Proyectos
1. **Desde un proyecto**: Accede al detalle del proyecto
2. **Nueva tarea**: Botón "Agregar Tarea"
3. **Información de la tarea**:
   - **Título descriptivo** (obligatorio)
   - **Descripción detallada**
   - **Prioridad**: Baja, Media, Alta, Crítica
   - **Estado**: Por Hacer, En Progreso, Pruebas, Completado
   - **Asignación**: Seleccionar miembro del equipo
   - **Fecha límite** (opcional)

#### Seguimiento de Progreso
1. **Estados visuales**: Cada tarea muestra su estado actual con colores
2. **Actualizaciones**: Cambia estados arrastrando o usando menús desplegables
3. **Notificaciones**: El sistema notifica cambios importantes
4. **Histórico**: Visualiza el progreso del proyecto en tiempo real

### 🔍 4. Sistema QR Exclusivo con Preguntas .NET

#### Generar Código QR Seguro
1. **Acceso**: Menú "Generar Código QR" o dashboard
2. **Generación**: Haz clic en "Generar QR Exclusivo"
3. **Código único**: Se genera un QR personalizado con tu ID de usuario
4. **Tiempo limitado**: El código expira automáticamente en **10 minutos**
5. **Formato**: Código QR estándar compatible con cualquier escáner

#### Acceder a Preguntas Exclusivas
1. **Escaneo**: Usa cualquier app de QR en tu dispositivo móvil
2. **Validación**: El sistema verifica la autenticidad del código
3. **Pregunta rotativa**: Accede a una pregunta única sobre .NET
4. **Contenido por hora**: Las preguntas cambian automáticamente cada hora (0-23)
5. **Temas especializados**:
   - **.NET Core** y arquitectura
   - **C#** avanzado y características modernas
   - **ASP.NET Core** y desarrollo web
   - **Entity Framework** y acceso a datos
   - **LINQ** y consultas
   - **Patrones de diseño** en .NET

#### Responder Preguntas Técnicas
1. **Formato**: Preguntas de opción múltiple (A, B, C, D)
2. **Validación**: El sistema verifica automáticamente las respuestas
3. **Feedback inmediato**: Respuesta correcta/incorrecta con explicación
4. **Una oportunidad**: Cada código QR permite una sola respuesta
5. **Estadísticas**: (Próximamente) Seguimiento de respuestas correctas

### 🔄 5. Recuperación de Contraseña

#### Solicitar Recuperación
1. **Desde login**: Haz clic en "¿Olvidaste tu contraseña?"
2. **Email**: Ingresa tu dirección de email registrada
3. **Envío**: Haz clic en "Enviar Enlace de Recuperación"
4. **Confirmación**: El sistema muestra mensaje de confirmación

#### Usar Enlace de Recuperación (Desarrollo)
1. **Consola del navegador**: Abre herramientas de desarrollador (F12)
2. **Enlace generado**: Busca el enlace en la consola
3. **También en UI**: El enlace aparece en la interfaz para facilidad
4. **Clic directo**: Haz clic en el enlace mostrado

#### Cambiar Contraseña
1. **Formulario seguro**: Completa la nueva contraseña
2. **Confirmación**: Reingresa la contraseña para verificar
3. **Validaciones**: Mínimo 6 caracteres, confirmación debe coincidir
4. **Actualización**: La contraseña se cambia inmediatamente
5. **Redirección**: Vuelves automáticamente al login para ingresar

### 📄 6. Navegación y Paginación

#### Usar Paginación en Proyectos
1. **Vista de página**: Muestra 6 proyectos por página en SPA
2. **Controles de navegación**:
   - Botones "Anterior" y "Siguiente"
   - Números de página directos
   - Elipsis (...) para muchas páginas
3. **Información contextual**: "Mostrando 1-6 de 25 proyectos"
4. **Estado persistente**: La página actual se mantiene al navegar

#### Filtros y Búsquedas
1. **Búsqueda en tiempo real**: Escribe en el campo de búsqueda
2. **Filtros por estado**: Selecciona estados específicos
3. **Filtros por prioridad**: En tareas, filtra por prioridad
4. **Combinación**: Usa múltiples filtros simultáneamente
5. **Limpieza**: Botón "Limpiar filtros" para resetear

## 🏗️ Estructura Detallada del Proyecto

```
TaskManager/                        # 🏠 Directorio raíz del proyecto
├── 📄 TaskManager.sln              # Solución principal de Visual Studio
├── 🚀 start-all.bat               # Script para iniciar todo el sistema
├── 🧹 clean-database.bat          # Script para limpiar la base de datos
├── 📖 README.md                   # Documentación principal (este archivo)
├── 📋 DEVELOPMENT_NEW.md          # Guía detallada de desarrollo
├── 👤 GUIA_REGISTRO.md            # Guía específica de registro de usuarios
├── 🔍 QR_SYSTEM.md                # Documentación del sistema QR
│
├── 📦 TaskManager.Shared/          # 🔗 Biblioteca compartida entre proyectos
│   ├── 🏷️ TaskManager.Shared.csproj  # Configuración del proyecto compartido
│   ├── 📁 Models/                 # Entidades de dominio del negocio
│   │   ├── 👤 User.cs             # Modelo de usuario con campos de reset
│   │   ├── 📊 Project.cs          # Modelo de proyecto con relaciones
│   │   └── ✅ TaskItem.cs         # Modelo de tarea con estados y prioridades
│   ├── 📁 DTOs/                   # Objetos de transferencia de datos
│   │   ├── 🔐 AuthDTOs.cs         # DTOs de autenticación y recuperación
│   │   ├── 📊 ProjectDTOs.cs      # DTOs para operaciones de proyectos
│   │   ├── ✅ TaskItemDTOs.cs     # DTOs para operaciones de tareas
│   │   └── 📄 PagedResultDto.cs   # DTO genérico para paginación
│   └── 📁 Services/               # Interfaces de servicios compartidos
│       ├── 🔐 IAuthService.cs     # Interfaz de autenticación
│       ├── 📊 IProjectService.cs  # Interfaz de gestión de proyectos
│       ├── ✅ ITaskService.cs     # Interfaz de gestión de tareas
│       └── 🔍 IQRCodeService.cs   # Interfaz del servicio QR
│
├── 🔧 TaskManager.API/             # 🌐 API RESTful principal
│   ├── 🏷️ TaskManager.API.csproj     # Configuración del proyecto API
│   ├── ⚙️ Program.cs              # Configuración y arranque de la API
│   ├── ⚙️ appsettings.json        # Configuración de la aplicación
│   ├── 🗄️ TaskManager.db          # Base de datos SQLite
│   ├── 📁 Controllers/            # Controladores de API REST
│   │   ├── 🔐 AuthController.cs   # Endpoints de autenticación y recuperación
│   │   ├── 📊 ProjectsController.cs # CRUD + endpoint paginado de proyectos
│   │   ├── ✅ TasksController.cs  # CRUD completo de tareas
│   │   └── 🔍 QRController.cs     # Generación y validación de QR
│   ├── 📁 Services/               # Servicios de lógica de negocio
│   │   ├── 🔐 AuthService.cs      # Servicio de auth con reset híbrido
│   │   ├── 🔐 IAuthService.cs     # Interfaz del servicio de autenticación
│   │   ├── 📊 ProjectService.cs   # Servicio con paginación avanzada
│   │   ├── 📊 IProjectService.cs  # Interfaz del servicio de proyectos
│   │   ├── ✅ TaskService.cs      # Servicio completo de tareas
│   │   ├── ✅ ITaskService.cs     # Interfaz del servicio de tareas
│   │   ├── 🔍 QRCodeService.cs    # Generación segura de QR con HMAC
│   │   └── 🧠 NetQuestionService.cs # Preguntas .NET que rotan por hora
│   └── 📁 Data/                   # Contexto de base de datos
│       └── 🗄️ TaskManagerDbContext.cs # Configuración de Entity Framework
│
├── 🌐 TaskManager.MVC/             # 🖥️ Aplicación web MVC
│   ├── 🏷️ TaskManager.MVC.csproj     # Configuración del proyecto MVC
│   ├── ⚙️ Program.cs              # Configuración y arranque MVC
│   ├── ⚙️ appsettings.json        # Configuración de la aplicación
│   ├── 📦 libman.json             # Gestión de librerías del lado cliente
│   ├── 📁 Controllers/            # Controladores MVC con vistas
│   │   ├── 🔐 AuthController.cs   # Autenticación con vistas de reset
│   │   ├── 🏠 HomeController.cs   # Controlador de la página principal
│   │   ├── 📊 ProjectsController.cs # Gestión completa de proyectos
│   │   ├── ✅ TasksController.cs  # Gestión completa de tareas
│   │   ├── 🔍 QRController.cs     # Generación y validación QR
│   │   └── 🎯 ExclusiveController.cs # Controlador de preguntas exclusivas
│   ├── 📁 Views/                  # Vistas Razor con Bootstrap
│   │   ├── 🔐 Auth/               # Vistas de autenticación
│   │   ├── 🏠 Home/               # Vistas de la página principal
│   │   ├── 📊 Projects/           # Vistas de gestión de proyectos
│   │   ├── ✅ Tasks/              # Vistas de gestión de tareas
│   │   ├── 🔍 QR/                 # Vistas de generación y validación QR
│   │   ├── 🎯 Exclusive/          # Vistas de contenido exclusivo
│   │   └── 🔗 Shared/             # Vistas compartidas y layout
│   ├── 📁 Services/               # Servicios HTTP cliente
│   │   ├── 🔐 HttpAuthService.cs  # Cliente HTTP para autenticación
│   │   ├── 📊 HttpProjectService.cs # Cliente HTTP para proyectos
│   │   ├── ✅ HttpTaskService.cs  # Cliente HTTP para tareas
│   │   ├── 🔍 HttpQRCodeService.cs # Cliente HTTP para QR
│   │   └── 🔧 BaseHttpService.cs  # Clase base para servicios HTTP
│   ├── 📁 Models/                 # Modelos de vista
│   │   └── ❌ ErrorViewModel.cs   # Modelo para páginas de error
│   └── 📁 wwwroot/                # Archivos estáticos
│       ├── 🎨 css/                # Hojas de estilo CSS
│       └── 💻 js/                 # Scripts JavaScript personalizados
│           └── taskmanager.js     # Funcionalidades JavaScript del MVC
│
└── ⚛️ TaskManager.SPA/             # 🔮 Single Page Application React
    ├── 📦 package.json            # Dependencias y scripts de Node.js
    ├── 📁 public/                 # Archivos estáticos públicos
    │   ├── 🌐 index.html          # HTML base de la SPA
    │   └── 📄 manifest.json       # Manifiesto de la aplicación web
    ├── 📁 src/                    # Código fuente de React
    │   ├── ⚛️ App.js              # Componente principal con routing
    │   ├── 🚀 index.js            # Punto de entrada de React
    │   ├── 🎨 index.css           # Estilos globales de la aplicación
    │   ├── 📁 components/         # Componentes reutilizables
    │   │   ├── 🧭 NavBar.js       # Barra de navegación principal
    │   │   ├── 🛡️ ProtectedRoute.js # Componente para rutas protegidas
    │   │   └── 📄 Pagination.js   # Componente de paginación reutilizable
    │   ├── 📁 pages/              # Páginas/vistas de la aplicación
    │   │   ├── 🏠 Home.js         # Página principal/dashboard
    │   │   ├── 🔑 Login.js        # Página de inicio de sesión
    │   │   ├── 📝 Register.js     # Página de registro de usuarios
    │   │   ├── 🔒 ForgotPassword.js # Página de recuperación de contraseña
    │   │   ├── 🔄 ResetPassword.js # Página de cambio de contraseña
    │   │   ├── 📊 Projects.js     # Lista de proyectos con paginación
    │   │   ├── 📋 ProjectDetail.js # Detalle individual de proyecto
    │   │   ├── ➕ CreateProject.js # Formulario de creación de proyecto
    │   │   ├── ✏️ EditProject.js  # Formulario de edición de proyecto
    │   │   ├── ✅ Tasks.js        # Lista de tareas del usuario
    │   │   ├── 📝 TaskDetail.js   # Detalle individual de tarea
    │   │   ├── ➕ CreateTask.js   # Formulario de creación de tarea
    │   │   ├── ✏️ EditTask.js     # Formulario de edición de tarea
    │   │   ├── 🔍 QRGenerate.js   # Generación de códigos QR
    │   │   ├── 🔗 QRAccessPage.js # Página de acceso mediante QR
    │   │   └── 🎯 ExclusiveQuestion.js # Página de preguntas exclusivas
    │   ├── 📁 services/           # Servicios para comunicación con API
    │   │   ├── 🌐 api.js          # Cliente HTTP base con interceptores
    │   │   ├── 🔧 apiService.js   # Servicios principales de la API
    │   │   └── 🔍 qrService.js    # Servicios específicos para QR
    │   └── 📁 contexts/           # Contextos de React para estado global
    │       └── 🔐 AuthContext.js  # Contexto de autenticación y usuario
    └── 📁 node_modules/           # Dependencias de Node.js (auto-generado)
```

### 📊 Endpoints de la API Documentados

#### 🔐 Autenticación (`/api/auth`)
- `POST /register` - Registro de nuevos usuarios
- `POST /login` - Inicio de sesión con JWT
- `POST /forgot-password` - Solicitar recuperación de contraseña
- `POST /reset-password` - Cambiar contraseña con token
- `GET /users` - Obtener lista de usuarios (autenticado)

#### 📊 Proyectos (`/api/projects`)
- `GET /` - Obtener todos los proyectos del usuario
- `GET /paginated` - Obtener proyectos con paginación
- `GET /{id}` - Obtener proyecto específico por ID
- `POST /` - Crear nuevo proyecto
- `PUT /{id}` - Actualizar proyecto existente
- `DELETE /{id}` - Eliminar proyecto

#### ✅ Tareas (`/api/tasks`)
- `GET /` - Obtener todas las tareas del usuario
- `GET /paginated` - Obtener tareas con paginación
- `GET /{id}` - Obtener tarea específica por ID
- `GET /by-project/{projectId}` - Obtener tareas de un proyecto
- `POST /` - Crear nueva tarea
- `PUT /{id}` - Actualizar tarea existente
- `DELETE /{id}` - Eliminar tarea

#### 🔍 Códigos QR (`/api/qr`)
- `POST /generate` - Generar código QR seguro
- `GET /validate` - Validar código QR
- `GET /exclusive-question` - Obtener pregunta exclusiva .NET
- `POST /submit-answer` - Enviar respuesta a pregunta

## 🔒 Seguridad y Mejores Prácticas Implementadas

### 🔐 Autenticación y Autorización Robusta
- **🔑 Hash de contraseñas**: BCrypt con salt único por usuario
- **🎫 JWT con configuración avanzada**: Expiración, Issuer, Audience validados
- **🍪 Cookies seguras**: HttpOnly, Secure, SameSite para MVC
- **🛡️ Protección contra ataques**: Rate limiting, CORS configurado
- **⏰ Tokens con expiración**: Configurables, 1 hora por defecto
- **🔄 Validación híbrida**: Soporte para tokens frontend y backend

### 🔍 Códigos QR con Seguridad Empresarial
- **🔐 Generación HMAC-SHA256**: Integridad criptográfica garantizada
- **⏳ Expiración temporal**: 10 minutos automática por seguridad
- **🔍 Validación de integridad**: Verificación del hash en cada acceso
- **🆔 Enlaces únicos**: Por usuario, timestamp y propósito específico
- **🛡️ Protección contra manipulación**: Datos cifrados en el hash QR
- **🚫 Un solo uso**: Códigos QR no reutilizables tras expiración

### 🔄 Recuperación de Contraseñas Segura
- **⏰ Tokens de recuperación**: Expiración de 1 hora configurable
- **✅ Validación de email**: Verificación antes de generar token
- **🆔 Tokens únicos**: Por solicitud, no reutilizables
- **🧹 Limpieza automática**: Tokens usados eliminados del sistema
- **🔒 Validación robusta**: Múltiples capas de verificación

### 🌐 Protección de API y Comunicaciones
- **🛡️ CORS configurado**: Orígenes específicos permitidos
- **🔒 HTTPS**: Redirección automática en producción
- **🎫 Autorización por endpoint**: Todos los recursos protegidos
- **❌ Manejo de errores**: Sin exposición de información sensible
- **📝 Logging seguro**: Sin contraseñas en logs

## 🚀 Características Técnicas Avanzadas

### 📄 Paginación Inteligente y Optimizada
- **⚡ Backend optimizado**: Skip/Take para consultas eficientes en SQLite
- **📊 Metadata completa**: Total de páginas, elementos, página actual
- **🔧 Componente reutilizable**: React Bootstrap con diseño responsivo
- **🧭 Navegación intuitiva**: Elipsis automáticas para muchas páginas
- **ℹ️ Información contextual**: "Mostrando X-Y de Z elementos"
- **💾 Estado persistente**: Página actual mantenida entre navegaciones

### 🧠 Sistema QR con Preguntas .NET Rotativas
- **📚 24 preguntas técnicas únicas**: Cobertura completa de .NET
- **🕐 Rotación automática**: Pregunta diferente cada hora (0-23)
- **✅ Validación en tiempo real**: Respuestas verificadas automáticamente
- **🎯 Acceso exclusivo**: Solo mediante QR válido y no expirado
- **⏰ Control temporal**: Preguntas sincronizadas con hora del sistema

### 🔄 Recuperación de Contraseña Híbrida
- **🔀 Soporte dual**: Tokens frontend (desarrollo) y backend (producción)
- **👨‍💻 Desarrollo amigable**: Enlaces mostrados en consola del navegador
- **🌐 Producción lista**: Integración preparada para sistemas de email
- **🔒 Validación robusta**: Múltiples verificaciones de expiración
- **🎨 UI moderna**: Interfaz completa con validaciones en tiempo real

### ⚡ Optimizaciones de Rendimiento
- **🔄 React Query**: Cache inteligente y sincronización automática
- **📄 Paginación**: Reduce transferencia de datos significativamente
- **⚡ Lazy loading**: Componentes cargados bajo demanda
- **🗄️ Optimización EF Core**: Consultas optimizadas con proyecciones
- **📦 Compresión**: Respuestas automáticamente comprimidas
- **💾 Persistencia**: Estado de aplicación mantenido entre sesiones

## 🎯 Casos de Uso Empresariales

### 💼 1. Gestión de Proyectos de Desarrollo
- **📊 Crear proyectos** para diferentes aplicaciones y productos
- **👥 Asignar desarrolladores** a proyectos específicos por experiencia
- **📈 Seguimiento de progreso** con estados actualizables en tiempo real
- **📄 Navegación eficiente** con paginación para múltiples proyectos
- **📅 Gestión de deadlines** con fechas de vencimiento y alertas
- **👨‍💼 Roles y permisos** por proyecto y nivel de acceso

### ✅ 2. Organización de Tareas de Programación
- **🔨 Dividir proyectos grandes** en tareas específicas y manejables
- **👤 Asignar tareas individuales** a desarrolladores por especialidad
- **⚖️ Establecer prioridades** y fechas límite realistas
- **🔄 Actualizar estados** conforme al progreso del desarrollo
- **📊 Visualizar dependencias** entre tareas y proyectos
- **⏰ Tracking de tiempo** y productividad del equipo

### 👥 3. Colaboración en Equipos de Desarrollo
- **👀 Visualizar trabajo** de otros miembros del equipo
- **💬 Comunicación** a través del estado y comentarios de tareas
- **🤝 Coordinación de esfuerzos** del equipo completo
- **🔒 Gestión de permisos** granular por proyecto y función
- **📈 Métricas de equipo** y análisis de productividad
- **🔄 Sincronización** en tiempo real de cambios

### 🧠 4. Evaluación de Conocimientos Técnicos .NET
- **🎯 Acceso exclusivo** a preguntas técnicas especializadas
- **🔄 Evaluación rotativa** con contenido nuevo cada hora
- **📚 Temas avanzados**: .NET Core, C#, ASP.NET Core, EF Core, LINQ
- **✅ Validación automática** de respuestas con feedback inmediato
- **📊 Seguimiento de progreso** en conocimientos técnicos
- **🏆 Sistema de logros** y certificaciones internas

### 🔒 5. Seguridad y Recuperación Empresarial
- **🔄 Recuperación fácil** de contraseñas con múltiples métodos
- **🔒 Acceso seguro** con tokens temporales criptográficos
- **👨‍💻 Desarrollo amigable** con herramientas de debugging
- **📧 Integración lista** para sistemas de email corporativos
- **🛡️ Auditoría completa** de accesos y cambios
- **⚡ Respuesta rápida** a incidentes de seguridad

## 🔮 Próximas Funcionalidades y Roadmap

### � Mejoras Inmediatas Planificadas
- **📱 Notificaciones push** en tiempo real con SignalR
- **💬 Sistema de comentarios** y menciones en tareas
- **📊 Dashboard de métricas** y analíticas avanzadas
- **🔗 Integración con GitHub/GitLab** para commits y PRs
- **🌙 Tema oscuro/claro** configurable por usuario
- **📄 Exportación avanzada** a Excel, PDF y formatos personalizados

### 🚀 Funcionalidades Empresariales
- **📧 Sistema de notificaciones** por email y Slack
- **📅 Calendario integrado** con fechas límite y reuniones
- **🕒 Time tracking** automático con reportes
- **📈 Reportes ejecutivos** con KPIs y métricas clave
- **🔌 API para terceros** con webhooks
- **🏢 Multi-tenancy** para múltiples empresas

### 🌐 Escalabilidad y Infraestructura
- **🗄️ SQL Server/PostgreSQL** para entornos de producción
- **🐳 Containerización** completa con Docker y Kubernetes
- **☁️ Deployment en la nube** (Azure, AWS, Google Cloud)
- **🌐 CDN integrado** para archivos estáticos y multimedia
- **⚖️ Load balancing** para alta disponibilidad
- **📊 Monitoring** con Application Insights y métricas
- **🔒 Single Sign-On (SSO)** con Azure AD/OAuth2

### 🤖 Inteligencia Artificial y Automatización
- **🧠 Sugerencias inteligentes** de asignación de tareas
- **📈 Predicción de deadlines** basada en históricos
- **🔍 Análisis de sentimientos** en comentarios del equipo
- **⚡ Automatización de workflows** con reglas personalizables
- **📊 Machine Learning** para optimización de recursos
- **🤖 Chatbot integrado** para consultas y soporte

## 🤝 Contribución y Desarrollo

### 📋 Cómo Contribuir al Proyecto

1. **🍴 Fork del repositorio**: Crea tu propia copia del proyecto
   ```bash
   git clone https://github.com/tu-usuario/TaskManager.git
   cd TaskManager
   ```

2. **🌿 Crear rama feature**: Usa nomenclatura descriptiva
   ```bash
   git checkout -b feature/nueva-funcionalidad
   # o
   git checkout -b bugfix/correccion-importante
   ```

3. **💻 Desarrollar y probar**: Asegúrate de que todo funciona
   ```bash
   # Compilar y probar backend
   dotnet build TaskManager.sln
   dotnet test
   
   # Probar frontend
   cd TaskManager.SPA
   npm test -- --watchAll=false
   ```

4. **📝 Commit con mensaje descriptivo**:
   ```bash
   git add .
   git commit -m "feat: Agrega sistema de notificaciones en tiempo real"
   # o
   git commit -m "fix: Corrige validación de fechas en formularios"
   ```

5. **🚀 Push y Pull Request**:
   ```bash
   git push origin feature/nueva-funcionalidad
   # Luego crear Pull Request en GitHub
   ```

### 🎯 Estándares de Código

#### Backend (.NET)
- **Nomenclatura**: PascalCase para clases y métodos, camelCase para variables
- **Async/Await**: Usar patrones asíncronos consistentemente
- **Dependency Injection**: Registrar servicios correctamente
- **Error Handling**: Manejo robusto de excepciones
- **Documentación**: XML comments para métodos públicos

#### Frontend (React)
- **Nomenclatura**: PascalCase para componentes, camelCase para funciones
- **Hooks**: Usar hooks de React correctamente
- **PropTypes**: Validación de props cuando sea necesario
- **Estado**: Usar React Query para estado del servidor
- **Estilos**: Bootstrap classes preferidas sobre CSS custom

### 🧪 Testing y Calidad

#### Pruebas Requeridas
- **Unit Tests**: Para servicios y funciones críticas
- **Integration Tests**: Para endpoints de API
- **Component Tests**: Para componentes React principales
- **E2E Tests**: Para flujos críticos de usuario

#### Herramientas de Calidad
- **ESLint**: Para JavaScript/React
- **SonarQube**: Análisis de código (opcional)
- **Dependabot**: Actualizaciones automáticas de dependencias

## 📜 Licencia

Este proyecto está licenciado bajo la **Licencia MIT** - ver el archivo [LICENSE](LICENSE) para más detalles.

### Resumen de la Licencia MIT
- ✅ **Uso comercial**: Permitido
- ✅ **Modificación**: Permitida
- ✅ **Distribución**: Permitida
- ✅ **Uso privado**: Permitido
- ❌ **Responsabilidad**: Sin garantías
- ❌ **Garantía**: Sin garantías

## 📞 Contacto y Soporte

### 🆘 Soporte Técnico
- **Issues en GitHub**: Para reportar bugs o solicitar funcionalidades
- **Discussions**: Para preguntas generales y discusiones
- **Wiki**: Documentación extendida y tutoriales

### 📧 Contacto del Equipo de Desarrollo
- **Email**: [contact@taskmanager.dev](mailto:contact@taskmanager.dev)
- **LinkedIn**: [TaskManager Project](https://linkedin.com/company/taskmanager)
- **Twitter**: [@TaskManagerDev](https://twitter.com/TaskManagerDev)

### 🔗 Enlaces Útiles
- **Documentación**: [docs.taskmanager.dev](https://docs.taskmanager.dev)
- **Demo en vivo**: [demo.taskmanager.dev](https://demo.taskmanager.dev)
- **Roadmap**: [roadmap.taskmanager.dev](https://roadmap.taskmanager.dev)
- **Status**: [status.taskmanager.dev](https://status.taskmanager.dev)

---

## 🏆 Reconocimientos

### 💝 Agradecimientos Especiales
- **Microsoft**: Por .NET Core y herramientas de desarrollo
- **Facebook/Meta**: Por React y ecosistema
- **Bootstrap Team**: Por el framework CSS
- **SQLite Team**: Por la base de datos ligera
- **QRCoder Contributors**: Por la librería de códigos QR

### 🌟 Tecnologías Utilizadas
- **ASP.NET Core 9.0** - Framework backend principal
- **React 18.2.0** - Biblioteca frontend principal
- **Entity Framework Core 9.0** - ORM para acceso a datos
- **Bootstrap 5.3.0** - Framework CSS responsive
- **SQLite** - Base de datos embebida

---

<div align="center">

# 🚀 TaskManager
## Sistema Completo de Gestión de Tareas y Proyectos

**Desarrollado con las mejores prácticas y tecnologías modernas de desarrollo web**

[![.NET](https://img.shields.io/badge/.NET-9.0-purple.svg)](https://dotnet.microsoft.com/)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.0-purple.svg)](https://getbootstrap.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

### ✨ Funcionalidades Destacadas
🔐 **Autenticación JWT Segura** | 📄 **Paginación Inteligente** | 🔍 **Códigos QR Exclusivos** | 🔄 **Recuperación de Contraseña**

### 🌐 Multi-Plataforma
🔧 **API RESTful** | 🖥️ **Aplicación MVC** | ⚛️ **SPA React Moderna**

---

**© 2024 TaskManager Project. Todos los derechos reservados.**

*Construyendo el futuro de la gestión de proyectos de desarrollo.*

</div>


