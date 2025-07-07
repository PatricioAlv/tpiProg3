using TaskManager.Shared.DTOs;
using TaskManager.Shared.Models;

namespace TaskManager.API.Services
{
    public interface IAuthService
    {
        Task<AuthResponseDto?> LoginAsync(LoginDto loginDto);
        Task<AuthResponseDto?> RegisterAsync(RegisterDto registerDto);
        Task<bool> ForgotPasswordAsync(ForgotPasswordDto forgotPasswordDto);
        Task<bool> ResetPasswordAsync(ResetPasswordDto resetPasswordDto);
        Task<UserDto?> GetUserByIdAsync(int userId);
        Task<List<UserDto>> GetAllUsersAsync();
    }
}
