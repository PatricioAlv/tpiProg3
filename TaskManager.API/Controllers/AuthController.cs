using Microsoft.AspNetCore.Mvc;
using TaskManager.API.Services;
using TaskManager.Shared.DTOs;

namespace TaskManager.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            var result = await _authService.RegisterAsync(registerDto);
            
            if (result == null)
            {
                return BadRequest(new { message = "El email ya está registrado" });
            }

            return Ok(result);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            var result = await _authService.LoginAsync(loginDto);
            
            if (result == null)
            {
                return Unauthorized(new { message = "Credenciales inválidas" });
            }

            return Ok(result);
        }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDto forgotPasswordDto)
        {
            var result = await _authService.ForgotPasswordAsync(forgotPasswordDto);
            
            if (!result)
            {
                return BadRequest(new { message = "No se encontró un usuario con ese email" });
            }

            return Ok(new { message = "Se ha enviado un enlace de recuperación a tu email" });
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto resetPasswordDto)
        {
            var result = await _authService.ResetPasswordAsync(resetPasswordDto);
            
            if (!result)
            {
                return BadRequest(new { message = "Token inválido o expirado" });
            }

            return Ok(new { message = "Contraseña actualizada exitosamente" });
        }

        [HttpGet("users")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _authService.GetAllUsersAsync();
            return Ok(users);
        }
    }
}
