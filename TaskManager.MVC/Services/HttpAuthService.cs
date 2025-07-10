using TaskManager.Shared.DTOs;
using TaskManager.Shared.Services;
using System.Text.Json;
using System.Text;

namespace TaskManager.MVC.Services
{
    public class HttpAuthService : BaseHttpService, IAuthService
    {
        public HttpAuthService(HttpClient httpClient, IHttpContextAccessor httpContextAccessor, IConfiguration configuration)
            : base(httpClient, httpContextAccessor, configuration)
        {
        }

        public async Task<AuthResponseDto> LoginAsync(LoginDto loginDto)
        {
            // Para login no usamos BaseHttpService porque no hay token aún
            var json = JsonSerializer.Serialize(loginDto);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            
            var response = await _httpClient.PostAsync("/api/auth/login", content);
            
            if (!response.IsSuccessStatusCode)
            {
                return null!; // Credenciales inválidas
            }
            
            var responseContent = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<AuthResponseDto>(responseContent, new JsonSerializerOptions { PropertyNameCaseInsensitive = true }) ?? new AuthResponseDto();
        }

        public async Task<AuthResponseDto> RegisterAsync(RegisterDto registerDto)
        {
            // Para register no usamos BaseHttpService porque no hay token aún
            var json = JsonSerializer.Serialize(registerDto);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            
            var response = await _httpClient.PostAsync("/api/auth/register", content);
            
            if (!response.IsSuccessStatusCode)
            {
                return null!; // Error en el registro
            }
            
            var responseContent = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<AuthResponseDto>(responseContent, new JsonSerializerOptions { PropertyNameCaseInsensitive = true }) ?? new AuthResponseDto();
        }

        public async Task<bool> ValidateTokenAsync(string token)
        {
            try
            {
                await GetAsync<object>("/api/auth/validate");
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<UserDto?> GetCurrentUserAsync()
        {
            return await GetAsync<UserDto>("/api/auth/me");
        }

        public async Task ForgotPasswordAsync(ForgotPasswordDto forgotPasswordDto)
        {
            await PostAsync<object>("/api/auth/forgot-password", forgotPasswordDto);
        }

        public async Task<bool> ResetPasswordAsync(ResetPasswordDto resetPasswordDto)
        {
            try
            {
                await PostAsync<object>("/api/auth/reset-password", resetPasswordDto);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<IEnumerable<UserDto>> GetAllUsersAsync()
        {
            var result = await GetAsync<IEnumerable<UserDto>>("/api/auth/users");
            return result ?? new List<UserDto>();
        }
    }
}
