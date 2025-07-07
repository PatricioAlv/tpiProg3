using TaskManager.Shared.DTOs;
using TaskManager.Shared.Services;
using System.Text.Json;
using System.Text;

namespace TaskManager.MVC.Services
{
    public class HttpAuthService : IAuthService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;

        public HttpAuthService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _configuration = configuration;
            _httpClient.BaseAddress = new Uri(_configuration["ApiSettings:BaseUrl"] ?? "https://localhost:5001");
        }

        public async Task<AuthResponseDto> LoginAsync(LoginDto loginDto)
        {
            var json = JsonSerializer.Serialize(loginDto);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            
            var response = await _httpClient.PostAsync("/api/auth/login", content);
            response.EnsureSuccessStatusCode();
            
            var responseContent = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<AuthResponseDto>(responseContent, new JsonSerializerOptions { PropertyNameCaseInsensitive = true }) ?? new AuthResponseDto();
        }

        public async Task<AuthResponseDto> RegisterAsync(RegisterDto registerDto)
        {
            var json = JsonSerializer.Serialize(registerDto);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            
            var response = await _httpClient.PostAsync("/api/auth/register", content);
            response.EnsureSuccessStatusCode();
            
            var responseContent = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<AuthResponseDto>(responseContent, new JsonSerializerOptions { PropertyNameCaseInsensitive = true }) ?? new AuthResponseDto();
        }

        public async Task<bool> ValidateTokenAsync(string token)
        {
            _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
            
            var response = await _httpClient.GetAsync("/api/auth/validate");
            return response.IsSuccessStatusCode;
        }

        public async Task<UserDto?> GetCurrentUserAsync()
        {
            var response = await _httpClient.GetAsync("/api/auth/me");
            if (!response.IsSuccessStatusCode)
                return null;
            
            var responseContent = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<UserDto>(responseContent, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
        }

        public async Task ForgotPasswordAsync(ForgotPasswordDto forgotPasswordDto)
        {
            var json = JsonSerializer.Serialize(forgotPasswordDto);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            
            var response = await _httpClient.PostAsync("/api/auth/forgot-password", content);
            response.EnsureSuccessStatusCode();
        }

        public async Task<bool> ResetPasswordAsync(ResetPasswordDto resetPasswordDto)
        {
            var json = JsonSerializer.Serialize(resetPasswordDto);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            
            var response = await _httpClient.PostAsync("/api/auth/reset-password", content);
            return response.IsSuccessStatusCode;
        }

        public async Task<IEnumerable<UserDto>> GetAllUsersAsync()
        {
            var response = await _httpClient.GetAsync("/api/auth/users");
            response.EnsureSuccessStatusCode();
            
            var responseContent = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<IEnumerable<UserDto>>(responseContent, new JsonSerializerOptions { PropertyNameCaseInsensitive = true }) ?? new List<UserDto>();
        }
    }
}
