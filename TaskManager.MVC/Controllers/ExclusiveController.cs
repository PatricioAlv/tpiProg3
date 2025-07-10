using Microsoft.AspNetCore.Mvc;
using TaskManager.MVC.Services;

namespace TaskManager.MVC.Controllers
{
    public class ExclusiveController : Controller
    {
        private readonly HttpQRCodeService _qrService;

        public ExclusiveController(HttpQRCodeService qrService)
        {
            _qrService = qrService;
        }

        [HttpGet]
        public async Task<IActionResult> Question(string hash)
        {
            if (string.IsNullOrEmpty(hash))
            {
                return BadRequest("Hash de QR requerido");
            }

            try
            {
                var response = await _qrService.GetExclusiveQuestionAsync(hash);
                ViewBag.Hash = hash;
                return View(response);
            }
            catch (UnauthorizedAccessException)
            {
                return View("AccessDenied");
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View("Error");
            }
        }

        [HttpPost]
        public async Task<IActionResult> SubmitAnswer(string hash, string answer)
        {
            if (string.IsNullOrEmpty(hash) || string.IsNullOrEmpty(answer))
            {
                return BadRequest("Hash y respuesta requeridos");
            }

            try
            {
                var result = await _qrService.SubmitAnswerAsync(hash, answer);
                return Json(result);
            }
            catch (UnauthorizedAccessException)
            {
                return Json(new { success = false, message = "Código QR inválido o expirado" });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
        }
    }
}
