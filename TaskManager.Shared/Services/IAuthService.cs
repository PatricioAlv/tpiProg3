using TaskManager.Shared.DTOs;

namespace TaskManager.Shared.Services
{
    public interface IAuthService
    {
        Task<AuthResponseDto> LoginAsync(LoginDto loginDto);
        Task<AuthResponseDto> RegisterAsync(RegisterDto registerDto);
        Task<bool> ValidateTokenAsync(string token);
        Task<UserDto?> GetCurrentUserAsync();
        Task ForgotPasswordAsync(ForgotPasswordDto forgotPasswordDto);
        Task<bool> ResetPasswordAsync(ResetPasswordDto resetPasswordDto);
        Task<IEnumerable<UserDto>> GetAllUsersAsync();
    }
}
