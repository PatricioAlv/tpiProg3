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

        public QRController(IQRCodeService qrCodeService)
        {
            _qrCodeService = qrCodeService;
        }

        private int GetCurrentUserId()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            return int.Parse(userIdClaim!.Value);
        }

        [HttpPost("generate")]
        public async Task<IActionResult> GenerateQRCode([FromBody] GenerateQRRequest request)
        {
            var userId = GetCurrentUserId();
            var qrCode = await _qrCodeService.GenerateSecureQRCodeAsync(userId, request.Purpose);
            
            return Ok(new { qrCode });
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

            return Ok(new { 
                message = "¡Código QR válido! Funcionalidad exclusiva desbloqueada",
                timestamp = DateTime.UtcNow,
                feature = "Acceso exclusivo mediante QR"
            });
        }
    }

    public class GenerateQRRequest
    {
        public string Purpose { get; set; } = "exclusive_access";
    }
}
