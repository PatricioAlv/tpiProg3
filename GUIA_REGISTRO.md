# Guía de Uso - TaskManager

## Problema Resuelto: Registro de Usuario

### El problema
El registro de usuario fallaba con el mensaje "El email ya está registrado" incluso después de limpiar la base de datos.

### La solución
El problema era que el campo `confirmPassword` era requerido en el DTO pero no se estaba enviando en las peticiones de prueba manual.

## Cómo Registrar un Usuario

### 1. Usando la interfaz web (SPA React)
1. Navega a http://localhost:3000
2. Haz clic en "Registrarse"
3. Completa el formulario:
   - **Nombre Completo**: Tu nombre
   - **Email**: tu@email.com
   - **Contraseña**: Mínimo 6 caracteres
   - **Confirmar Contraseña**: Debe coincidir con la contraseña
4. Haz clic en "Registrarse"

### 2. Usando la interfaz MVC
1. Navega a http://localhost:5001
2. Ve a la sección de registro
3. Completa todos los campos requeridos incluyendo confirmar contraseña

### 3. Usando Swagger (API directa)
1. Navega a http://localhost:5000/swagger
2. Expande el endpoint POST /api/auth/register
3. Usa este formato JSON:
```json
{
  "name": "Tu Nombre",
  "email": "tu@email.com",
  "password": "TuContraseña123!",
  "confirmPassword": "TuContraseña123!"
}
```

### 4. Usando cURL/PowerShell
```powershell
$body = @{
    name = "Test User"
    email = "test@example.com"
    password = "Test123!"
    confirmPassword = "Test123!"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" -Method POST -Headers @{"Content-Type"="application/json"} -Body $body
```

## Validaciones Importantes

1. **Nombre**: Requerido, máximo 100 caracteres
2. **Email**: Requerido, formato de email válido, único en el sistema
3. **Contraseña**: Requerida, mínimo 6 caracteres, máximo 100 caracteres
4. **Confirmar Contraseña**: Requerida, debe coincidir exactamente con la contraseña

## Scripts de Utilidad

### Limpiar la base de datos
```cmd
.\clean-database.bat
```
Este script:
- Detiene todos los procesos de TaskManager
- Elimina el archivo de base de datos SQLite
- Reinicia la API
- Permite registrar usuarios desde cero

### Iniciar todos los servicios
```cmd
.\start-all.bat
```
Este script inicia:
- TaskManager.API (puerto 5000)
- TaskManager.MVC (puerto 5001)
- TaskManager.SPA (puerto 3000)

## URLs de Acceso

- **API**: http://localhost:5000
- **Swagger**: http://localhost:5000/swagger
- **MVC**: http://localhost:5001
- **SPA**: http://localhost:3000

## Verificar Estado del Sistema

### Verificar que la API está corriendo
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/auth/users" -Method GET
```

### Verificar usuarios en la base de datos
```cmd
cd TaskManager.API
sqlite3 TaskManager.db "SELECT id, name, email, CreatedAt FROM Users;"
```

## Notas Importantes

1. **Siempre incluir confirmPassword**: El campo es obligatorio en todas las peticiones de registro
2. **Base de datos limpia**: Usa `clean-database.bat` si necesitas empezar desde cero
3. **Contraseñas**: Se almacenan hasheadas con BCrypt por seguridad
4. **Tokens JWT**: Se generan automáticamente al registrarse o iniciar sesión

## Solución de Problemas

### Error "El email ya está registrado"
1. Verifica que no exista el usuario: `sqlite3 TaskManager.db "SELECT * FROM Users WHERE email='tu@email.com';"`
2. Si existe, úsalo para login o limpia la base de datos
3. Si no existe, verifica que estés incluyendo `confirmPassword`

### Error 500 al cargar proyectos
1. **Problema**: SQLite no soporta operaciones SQL APPLY complejas
2. **Causa**: Consultas LINQ con `.Any()` en relaciones many-to-many
3. **Solución**: Simplificar las consultas eliminando `.Any()` en `Where` clauses
4. **Ubicación**: `TaskManager.API/Services/ProjectService.cs`
5. **Cambio**: Usar solo `p.CreatedByUserId == userId` en lugar de `p.CreatedByUserId == userId || p.TeamMembers.Any(tm => tm.Id == userId)`

### Advertencias de rendimiento de Entity Framework
**Problema**: `Compiling a query which loads related collections for more than one collection navigation`
**Solución**:
1. **Eliminar múltiples Include**: Reducir `Include()` y `ThenInclude()` en consultas complejas
2. **Simplificar DTOs**: Devolver listas vacías para `TeamMembers` y `Tasks` temporalmente
3. **Cargar por separado**: Si es necesario, crear endpoints específicos para cargar tareas y miembros
4. **Resultado**: Consultas más rápidas y sin advertencias

### Error de validación
- Asegúrate de que la contraseña tenga al menos 6 caracteres
- Verifica que `password` y `confirmPassword` sean idénticos
- Confirma que el email tenga formato válido

### API no responde
1. Verifica que esté corriendo: http://localhost:5000/swagger
2. Reinicia con: `cd TaskManager.API && dotnet run`
3. Revisa la consola por errores de compilación

### Error "_ValidationScriptsPartial not found"
1. Verifica que existe: `/Views/Shared/_ValidationScriptsPartial.cshtml`
2. Revisa que la extensión sea `.cshtml` (no `.cstml`)
3. El contenido debe ser:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.5/jquery.validate.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validation-unobtrusive/3.2.12/jquery.validate.unobtrusive.min.js"></script>
```

### Errores de compilación MVC
1. Reinicia la aplicación: `cd TaskManager.MVC && dotnet run`
2. Verifica que todas las vistas tengan la sintaxis correcta
3. Asegúrate de que las referencias a librerías sean válidas

### Error de redirección a login sin cerrar sesión
**Problema**: Al navegar a crear tarea, redirige a login pero mantiene la sesión
**Causas**:
1. **Interceptores duplicados**: `projectService.js` tenía su propio interceptor de axios
2. **Configuraciones diferentes**: Uno usaba `localStorage`, otro `Cookies`
3. **Redirección incorrecta**: `window.location.href` en lugar de router

**Solución**:
1. **Unificar servicios**: Todos los servicios ahora usan `apiClient` de `api.js`
2. **Eliminar interceptores duplicados**: Solo uno en `api.js`
3. **Usar recarga**: `window.location.reload()` en lugar de redirección directa
4. **Rutas corregidas**: Eliminar `/api` duplicado en rutas
