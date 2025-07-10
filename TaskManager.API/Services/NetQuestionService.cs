using System.Security.Cryptography;
using System.Text;

namespace TaskManager.API.Services
{
    public interface INetQuestionService
    {
        Task<NetQuestionDto> GetHourlyQuestionAsync(int userId, string qrHash);
        Task<bool> SubmitAnswerAsync(int userId, string qrHash, string answer);
    }

    public class NetQuestionService : INetQuestionService
    {
        private readonly IConfiguration _configuration;
        private readonly IQRCodeService _qrCodeService;

        public NetQuestionService(IConfiguration configuration, IQRCodeService qrCodeService)
        {
            _configuration = configuration;
            _qrCodeService = qrCodeService;
        }

        public async Task<NetQuestionDto> GetHourlyQuestionAsync(int userId, string qrHash)
        {
            // Validar que el QR sea válido
            var isValidQR = await _qrCodeService.ValidateSecureQRCodeAsync(qrHash);
            if (!isValidQR)
            {
                throw new UnauthorizedAccessException("Código QR inválido o expirado");
            }

            // Obtener la pregunta basada en la hora actual
            var currentHour = DateTime.UtcNow.Hour;
            var question = GetQuestionByHour(currentHour);
            
            return new NetQuestionDto
            {
                Id = currentHour,
                Question = question.Question,
                Options = question.Options,
                Hour = currentHour,
                ExpiresAt = GetNextHourTimestamp()
            };
        }

        public async Task<bool> SubmitAnswerAsync(int userId, string qrHash, string answer)
        {
            // Validar que el QR sea válido
            var isValidQR = await _qrCodeService.ValidateSecureQRCodeAsync(qrHash);
            if (!isValidQR)
            {
                throw new UnauthorizedAccessException("Código QR inválido o expirado");
            }

            var currentHour = DateTime.UtcNow.Hour;
            var question = GetQuestionByHour(currentHour);
            
            return answer.Equals(question.CorrectAnswer, StringComparison.OrdinalIgnoreCase);
        }

        private DateTime GetNextHourTimestamp()
        {
            var now = DateTime.UtcNow;
            return new DateTime(now.Year, now.Month, now.Day, now.Hour + 1, 0, 0, DateTimeKind.Utc);
        }

        private NetQuestionData GetQuestionByHour(int hour)
        {
            var questions = new List<NetQuestionData>
            {
                new NetQuestionData // Hora 0
                {
                    Question = "¿Cuál es la diferencia principal entre .NET Framework y .NET Core?",
                    Options = new[] { "A) .NET Framework es multiplataforma", "B) .NET Core es multiplataforma", "C) No hay diferencia", "D) .NET Framework es más rápido" },
                    CorrectAnswer = "B"
                },
                new NetQuestionData // Hora 1
                {
                    Question = "¿Qué significa CLR en .NET?",
                    Options = new[] { "A) Common Language Runtime", "B) Central Language Repository", "C) Code Language Reader", "D) Common Library Runtime" },
                    CorrectAnswer = "A"
                },
                new NetQuestionData // Hora 2
                {
                    Question = "¿Cuál es la diferencia entre 'string' y 'String' en C#?",
                    Options = new[] { "A) string es más rápido", "B) String es más rápido", "C) No hay diferencia, string es un alias de String", "D) string es para texto corto" },
                    CorrectAnswer = "C"
                },
                new NetQuestionData // Hora 3
                {
                    Question = "¿Qué es el Garbage Collector en .NET?",
                    Options = new[] { "A) Un recolector de basura automático", "B) Un compilador de código", "C) Un optimizador de memoria", "D) Un depurador de errores" },
                    CorrectAnswer = "A"
                },
                new NetQuestionData // Hora 4
                {
                    Question = "¿Cuál es la diferencia entre 'ref' y 'out' en C#?",
                    Options = new[] { "A) No hay diferencia", "B) ref requiere inicialización previa, out no", "C) out es más rápido", "D) ref es para tipos valor, out para referencia" },
                    CorrectAnswer = "B"
                },
                new NetQuestionData // Hora 5
                {
                    Question = "¿Qué es LINQ en .NET?",
                    Options = new[] { "A) Language Integrated Query", "B) Linear Query", "C) Logic Query", "D) Local Query" },
                    CorrectAnswer = "A"
                },
                new NetQuestionData // Hora 6
                {
                    Question = "¿Cuál es la diferencia entre IEnumerable e IQueryable?",
                    Options = new[] { "A) No hay diferencia", "B) IQueryable es para bases de datos", "C) IEnumerable es más rápido", "D) IQueryable es para colecciones en memoria" },
                    CorrectAnswer = "B"
                },
                new NetQuestionData // Hora 7
                {
                    Question = "¿Qué es Entity Framework en .NET?",
                    Options = new[] { "A) Un framework de UI", "B) Un ORM (Object-Relational Mapping)", "C) Un servidor web", "D) Un compilador" },
                    CorrectAnswer = "B"
                },
                new NetQuestionData // Hora 8
                {
                    Question = "¿Cuál es la diferencia entre 'var' y 'dynamic' en C#?",
                    Options = new[] { "A) var es tipado fuerte, dynamic es tipado débil", "B) dynamic es más rápido", "C) No hay diferencia", "D) var es para números, dynamic para texto" },
                    CorrectAnswer = "A"
                },
                new NetQuestionData // Hora 9
                {
                    Question = "¿Qué es Dependency Injection en .NET?",
                    Options = new[] { "A) Un patrón de diseño para gestionar dependencias", "B) Un tipo de base de datos", "C) Un método de compilación", "D) Un framework de testing" },
                    CorrectAnswer = "A"
                },
                new NetQuestionData // Hora 10
                {
                    Question = "¿Cuál es la diferencia entre Task y Thread en C#?",
                    Options = new[] { "A) Thread es más moderno", "B) Task es de alto nivel y usa ThreadPool", "C) No hay diferencia", "D) Task es más lento" },
                    CorrectAnswer = "B"
                },
                new NetQuestionData // Hora 11
                {
                    Question = "¿Qué es async/await en C#?",
                    Options = new[] { "A) Palabras clave para programación asíncrona", "B) Métodos de compilación", "C) Tipos de datos", "D) Operadores matemáticos" },
                    CorrectAnswer = "A"
                },
                new NetQuestionData // Hora 12
                {
                    Question = "¿Cuál es la diferencia entre ActionResult y IActionResult?",
                    Options = new[] { "A) ActionResult es abstracto, IActionResult es interfaz", "B) IActionResult es más moderno", "C) No hay diferencia", "D) ActionResult es para MVC, IActionResult para API" },
                    CorrectAnswer = "B"
                },
                new NetQuestionData // Hora 13
                {
                    Question = "¿Qué es middleware en ASP.NET Core?",
                    Options = new[] { "A) Componentes que forman el pipeline de requests", "B) Un tipo de base de datos", "C) Un patrón de diseño", "D) Un framework de testing" },
                    CorrectAnswer = "A"
                },
                new NetQuestionData // Hora 14
                {
                    Question = "¿Cuál es la diferencia entre AddScoped, AddTransient y AddSingleton?",
                    Options = new[] { "A) Scoped por request, Transient por uso, Singleton por aplicación", "B) No hay diferencia", "C) Solo el rendimiento", "D) Scoped es más rápido" },
                    CorrectAnswer = "A"
                },
                new NetQuestionData // Hora 15
                {
                    Question = "¿Qué es JWT en .NET?",
                    Options = new[] { "A) JSON Web Token", "B) Java Web Token", "C) JavaScript Web Token", "D) JSON Web Template" },
                    CorrectAnswer = "A"
                },
                new NetQuestionData // Hora 16
                {
                    Question = "¿Cuál es la diferencia entre FirstOrDefault y SingleOrDefault?",
                    Options = new[] { "A) FirstOrDefault devuelve el primero, SingleOrDefault valida que sea único", "B) No hay diferencia", "C) SingleOrDefault es más rápido", "D) FirstOrDefault es para strings" },
                    CorrectAnswer = "A"
                },
                new NetQuestionData // Hora 17
                {
                    Question = "¿Qué es AutoMapper en .NET?",
                    Options = new[] { "A) Una librería para mapear objetos", "B) Un ORM", "C) Un framework de UI", "D) Un compilador" },
                    CorrectAnswer = "A"
                },
                new NetQuestionData // Hora 18
                {
                    Question = "¿Cuál es la diferencia entre StringBuilder y String?",
                    Options = new[] { "A) StringBuilder es mutable, String es inmutable", "B) String es más rápido", "C) No hay diferencia", "D) StringBuilder es para números" },
                    CorrectAnswer = "A"
                },
                new NetQuestionData // Hora 19
                {
                    Question = "¿Qué es Code First en Entity Framework?",
                    Options = new[] { "A) Crear la base de datos desde el código", "B) Crear el código desde la base de datos", "C) Un patrón de diseño", "D) Un método de compilación" },
                    CorrectAnswer = "A"
                },
                new NetQuestionData // Hora 20
                {
                    Question = "¿Cuál es la diferencia entre HttpGet y HttpPost?",
                    Options = new[] { "A) GET obtiene datos, POST envía datos", "B) POST es más seguro", "C) GET es más rápido", "D) No hay diferencia" },
                    CorrectAnswer = "A"
                },
                new NetQuestionData // Hora 21
                {
                    Question = "¿Qué es NuGet en .NET?",
                    Options = new[] { "A) Un gestor de paquetes", "B) Un compilador", "C) Un framework", "D) Un tipo de base de datos" },
                    CorrectAnswer = "A"
                },
                new NetQuestionData // Hora 22
                {
                    Question = "¿Cuál es la diferencia entre interface y abstract class?",
                    Options = new[] { "A) Interface no puede tener implementación, abstract class sí", "B) No hay diferencia", "C) Abstract class es más rápida", "D) Interface es para herencia múltiple" },
                    CorrectAnswer = "A"
                },
                new NetQuestionData // Hora 23
                {
                    Question = "¿Qué es el patrón Repository en .NET?",
                    Options = new[] { "A) Un patrón para abstraer el acceso a datos", "B) Un tipo de base de datos", "C) Un framework de UI", "D) Un método de compilación" },
                    CorrectAnswer = "A"
                }
            };

            return questions[hour % 24];
        }
    }

    public class NetQuestionDto
    {
        public int Id { get; set; }
        public string Question { get; set; } = string.Empty;
        public string[] Options { get; set; } = Array.Empty<string>();
        public int Hour { get; set; }
        public DateTime ExpiresAt { get; set; }
    }

    public class NetQuestionData
    {
        public string Question { get; set; } = string.Empty;
        public string[] Options { get; set; } = Array.Empty<string>();
        public string CorrectAnswer { get; set; } = string.Empty;
    }

    public class SubmitAnswerRequest
    {
        public string QrHash { get; set; } = string.Empty;
        public string Answer { get; set; } = string.Empty;
    }
}
