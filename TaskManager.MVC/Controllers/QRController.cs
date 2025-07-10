using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TaskManager.Shared.Services;

namespace TaskManager.MVC.Controllers
{
    [Authorize]
    public class QRController : Controller
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

        public async Task<IActionResult> Generate()
        {
            var userId = GetCurrentUserId();
            var qrCode = await _qrCodeService.GenerateSecureQRCodeAsync(userId, "net_question_exclusive");
            
            ViewBag.QRCode = qrCode;
            ViewBag.Description = "Código QR para acceder a preguntas exclusivas sobre .NET";
            ViewBag.Instructions = "Escanea este código QR para acceder a una pregunta exclusiva sobre .NET que cambia cada hora.";
            return View();
        }

        [AllowAnonymous]
        public async Task<IActionResult> Validate(string hash)
        {
            if (string.IsNullOrEmpty(hash))
            {
                ViewBag.Message = "Código QR inválido";
                ViewBag.IsValid = false;
                return View();
            }

            var isValid = await _qrCodeService.ValidateSecureQRCodeAsync(hash);
            
            if (isValid)
            {
                ViewBag.Message = "¡Código QR válido! Funcionalidad exclusiva desbloqueada";
                ViewBag.IsValid = true;
                ViewBag.Timestamp = DateTime.UtcNow;
                ViewBag.Feature = "Acceso exclusivo mediante QR - Panel de estadísticas avanzadas";
            }
            else
            {
                ViewBag.Message = "Código QR inválido o expirado";
                ViewBag.IsValid = false;
            }

            return View();
        }
    }
}
