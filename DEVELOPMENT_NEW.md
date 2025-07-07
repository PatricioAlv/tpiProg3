# TaskManager - Guía de Desarrollo y Ejecución

## 🚀 Inicio Rápido

### Opción 1: Script Automático (Recomendado)
```bash
# Ejecutar desde la carpeta raíz del proyecto
.\start-all.bat
```

### Opción 2: Ejecución Manual
Abrir **3 terminales separadas** y ejecutar:

**Terminal 1: API RESTful**
```bash
cd TaskManager.API
dotnet run
```

**Terminal 2: Aplicación MVC**
```bash
cd TaskManager.MVC
dotnet run
```

**Terminal 3: SPA React**
```bash
cd TaskManager.SPA
npm install  # Solo la primera vez
npm start
```

## 🌐 URLs de Acceso

- **API RESTful**: http://localhost:5000
  - Swagger: http://localhost:5000/swagger
- **Aplicación MVC**: http://localhost:5001
- **SPA React**: http://localhost:3000

## 📁 Estructura del Proyecto

```
TaskManager/
├── TaskManager.API/           # API RESTful con .NET 9.0
├── TaskManager.MVC/           # Aplicación web MVC
├── TaskManager.SPA/           # Single Page Application (React)
├── TaskManager.Shared/        # Modelos y DTOs compartidos
├── start-all.bat             # Script de inicio automático
└── README.md                 # Documentación del proyecto
```

## 🔧 Configuración

### Base de Datos
- **Tipo**: SQLite (archivo `TaskManager.db`)
- **Ubicación**: `TaskManager.API/`
- **Migraciones**: Se crean automáticamente al iniciar

### Puertos por Defecto
- **API**: 5000
- **MVC**: 5001
- **SPA**: 3000

### Configuración API
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=TaskManager.db"
  },
  "JwtSettings": {
    "SecretKey": "ThisIsMySecretKeyForJWTTokenGeneration123456789",
    "Issuer": "TaskManagerAPI",
    "Audience": "TaskManagerClient",
    "ExpiryMinutes": 60
  }
}
```

## 🧪 Pruebas del Sistema

### 1. Verificar API
```bash
# Verificar estado de la API
curl http://localhost:5000/api/health

# Swagger UI
# Abrir: http://localhost:5000/swagger
```

### 2. Probar Autenticación
```bash
# Registro de usuario
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Usuario Test",
    "email": "test@example.com",
    "password": "Password123!",
    "confirmPassword": "Password123!"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Password123!"
  }'
```

### 3. Flujo Completo de Pruebas
1. **Registro/Login** en cualquiera de las aplicaciones
2. **Crear proyecto** con nombre y descripción
3. **Agregar tareas** al proyecto
4. **Asignar tareas** a usuarios
5. **Generar código QR** para un proyecto
6. **Validar código QR** generado

## 🛠️ Tecnologías Utilizadas

### Backend (API)
- **.NET 9.0**
- **ASP.NET Core Web API**
- **Entity Framework Core**
- **SQLite**
- **JWT Authentication**
- **Swagger/OpenAPI**

### Frontend (MVC)
- **ASP.NET Core MVC**
- **Razor Pages**
- **Bootstrap 5**
- **Cookie Authentication**

### Frontend (SPA)
- **React 18**
- **TypeScript**
- **React Router**
- **React Query**
- **Axios**
- **Bootstrap 5**

### Compartido
- **Modelos de dominio**
- **DTOs (Data Transfer Objects)**
- **Interfaces de servicios**

## 📋 Funcionalidades Implementadas

### ✅ Autenticación y Autorización
- Registro de usuarios
- Login con JWT (API) y Cookies (MVC)
- Protección de rutas
- Validación de tokens

### ✅ Gestión de Proyectos
- Crear, editar, eliminar proyectos
- Asignar miembros al equipo
- Filtrado y búsqueda
- Paginación

### ✅ Gestión de Tareas
- CRUD completo de tareas
- Estados: Todo, InProgress, Done
- Prioridades: Low, Medium, High
- Asignación a usuarios
- Fechas de vencimiento

### ✅ Códigos QR
- Generación de QR para proyectos
- Validación de códigos QR
- Códigos QR seguros con hash

### ✅ Interfaz de Usuario
- Diseño responsive
- Navegación intuitiva
- Formularios validados
- Notificaciones de estado

## 🔍 Debugging y Desarrollo

### Logs
Los logs se muestran en la consola de cada aplicación:
- **API**: Requests HTTP, queries SQL, errores
- **MVC**: Requests, autenticación, errores
- **SPA**: Console del navegador

### Herramientas de Desarrollo
- **API**: Swagger UI para probar endpoints
- **MVC**: Developer tools del navegador
- **SPA**: React DevTools

## 🚨 Solución de Problemas

### Puerto ya en uso
```bash
# Verificar qué proceso usa el puerto
netstat -ano | findstr :5000

# Cambiar puerto en launchSettings.json
```

### Error de compilación
```bash
# Limpiar y reconstruir
dotnet clean
dotnet build
```

### Problemas de CORS
- Verificar configuración CORS en la API
- Confirmar URLs correctas en los clientes

### Base de datos
```bash
# Eliminar y recrear base de datos
rm TaskManager.db
dotnet run  # Se recrea automáticamente
```

## 📝 Notas Importantes

1. **Orden de inicio**: Iniciar primero la API, luego MVC y finalmente SPA
2. **Dependencias**: La aplicación MVC y SPA dependen de la API
3. **Desarrollo**: Para desarrollo, usar `dotnet watch run` para auto-reload
4. **Producción**: Configurar variables de entorno apropiadas

## 🎯 Próximos Pasos

1. **Configurar HTTPS** para producción
2. **Agregar pruebas unitarias**
3. **Implementar CI/CD**
4. **Configurar Docker** para contenerización
5. **Agregar monitoreo** y métricas
