using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TaskManager.API.Services;

namespace TaskManager.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class QRController : ControllerBase
    {
        private readonly IQRCodeService _qrCodeService;
        private readonly INetQuestionService _netQuestionService;

        public QRController(IQRCodeService qrCodeService, INetQuestionService netQuestionService)
        {
            _qrCodeService = qrCodeService;
            _netQuestionService = netQuestionService;
        }

        private int GetCurrentUserId()
        {
            try
            {
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
                Console.WriteLine($"QR Controller: User claims count: {User.Claims.Count()}");
                Console.WriteLine($"QR Controller: User ID claim: {userIdClaim?.Value}");
                
                if (userIdClaim == null)
                {
                    Console.WriteLine("QR Controller: No NameIdentifier claim found");
                    throw new UnauthorizedAccessException("No se encontró el ID del usuario en el token");
                }
                
                return int.Parse(userIdClaim.Value);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"QR Controller: Error getting user ID: {ex.Message}");
                throw;
            }
        }

        [HttpPost("generate")]
        public async Task<IActionResult> GenerateQRCode([FromBody] GenerateQRRequest request)
        {
            try
            {
                var userId = GetCurrentUserId();
                Console.WriteLine($"QR Controller: User ID from token: {userId}");
                Console.WriteLine($"QR Controller: Request purpose: {request.Purpose}");
                
                var qrCode = await _qrCodeService.GenerateSecureQRCodeAsync(userId, request.Purpose);
                Console.WriteLine($"QR Controller: QR Code generated successfully");
                
                return Ok(new { qrCode });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"QR Controller: Error generating QR Code: {ex.Message}");
                Console.WriteLine($"QR Controller: Stack trace: {ex.StackTrace}");
                return BadRequest(new { message = "Error interno del servidor al generar QR" });
            }
        }

        [HttpGet("validate")]
        [AllowAnonymous]
        public async Task<IActionResult> ValidateQRCode([FromQuery] string hash)
        {
            var isValid = await _qrCodeService.ValidateSecureQRCodeAsync(hash);
            
            if (!isValid)
            {
                return BadRequest(new { message = "Código QR inválido o expirado" });
            }

            // Redirigir a la funcionalidad exclusiva - pregunta sobre .NET
            var baseUrl = $"{Request.Scheme}://{Request.Host}";
            var exclusiveUrl = $"{baseUrl}/api/qr/exclusive-question?hash={hash}";
            
            return Ok(new { 
                message = "¡Código QR válido! Accede a la pregunta exclusiva sobre .NET",
                timestamp = DateTime.UtcNow,
                exclusiveUrl = exclusiveUrl,
                feature = "Pregunta exclusiva sobre .NET - Se renueva cada hora"
            });
        }

        [HttpGet("exclusive-question")]
        [AllowAnonymous]
        public async Task<IActionResult> GetExclusiveQuestion([FromQuery] string hash)
        {
            try
            {
                var userId = ExtractUserIdFromHash(hash);
                var question = await _netQuestionService.GetHourlyQuestionAsync(userId, hash);
                
                return Ok(new
                {
                    message = "¡Funcionalidad exclusiva desbloqueada!",
                    accessedAt = DateTime.UtcNow,
                    question = question,
                    instructions = "Responde la pregunta sobre .NET. La pregunta cambia cada hora."
                });
            }
            catch (UnauthorizedAccessException)
            {
                return Unauthorized(new { message = "Código QR inválido o expirado" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Error al obtener la pregunta", error = ex.Message });
            }
        }

        [HttpPost("submit-answer")]
        [AllowAnonymous]
        public async Task<IActionResult> SubmitAnswer([FromBody] SubmitAnswerRequest request)
        {
            try
            {
                var userId = ExtractUserIdFromHash(request.QrHash);
                var isCorrect = await _netQuestionService.SubmitAnswerAsync(userId, request.QrHash, request.Answer);
                
                return Ok(new
                {
                    isCorrect = isCorrect,
                    message = isCorrect ? "¡Respuesta correcta! Excelente conocimiento sobre .NET" : "Respuesta incorrecta. ¡Sigue estudiando .NET!",
                    timestamp = DateTime.UtcNow
                });
            }
            catch (UnauthorizedAccessException)
            {
                return Unauthorized(new { message = "Código QR inválido o expirado" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Error al procesar la respuesta", error = ex.Message });
            }
        }

        private int ExtractUserIdFromHash(string hash)
        {
            // Extraer el userId del hash para validaciones
            // Esto es una implementación simplificada - en un caso real sería más seguro
            try
            {
                var bytes = Convert.FromBase64String(hash);
                var dataLength = bytes.Length - 32; // 32 bytes for HMAC-SHA256
                var dataBytes = bytes.Take(dataLength).ToArray();
                var data = System.Text.Encoding.UTF8.GetString(dataBytes);
                var parts = data.Split('|');
                return int.Parse(parts[0]);
            }
            catch
            {
                throw new UnauthorizedAccessException("Invalid hash format");
            }
        }
    }

    public class GenerateQRRequest
    {
        public string Purpose { get; set; } = "exclusive_access";
    }
}
