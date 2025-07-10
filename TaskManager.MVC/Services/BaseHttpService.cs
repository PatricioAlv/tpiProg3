using System.Security.Claims;
using System.Text.Json;

namespace TaskManager.MVC.Services
{
    public abstract class BaseHttpService
    {
        protected readonly HttpClient _httpClient;
        protected readonly IHttpContextAccessor _httpContextAccessor;
        protected readonly IConfiguration _configuration;

        protected BaseHttpService(HttpClient httpClient, IHttpContextAccessor httpContextAccessor, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _httpContextAccessor = httpContextAccessor;
            _configuration = configuration;
            _httpClient.BaseAddress = new Uri(_configuration["ApiSettings:BaseUrl"] ?? "http://localhost:5000");
        }

        protected Task SetAuthorizationHeaderAsync()
        {
            var context = _httpContextAccessor.HttpContext;
            if (context?.User.Identity?.IsAuthenticated == true)
            {
                // Obtener el token JWT desde los claims
                var jwtToken = context.User.FindFirst("jwt_token")?.Value;

                if (!string.IsNullOrEmpty(jwtToken))
                {
                    // Limpiar headers anteriores
                    _httpClient.DefaultRequestHeaders.Remove("Authorization");
                    _httpClient.DefaultRequestHeaders.Remove("X-User-Id");
                    _httpClient.DefaultRequestHeaders.Remove("X-User-Email");
                    
                    // Añadir el token JWT como Bearer token
                    _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {jwtToken}");
                }
            }
            return Task.CompletedTask;
        }

        protected int GetCurrentUserId()
        {
            var context = _httpContextAccessor.HttpContext;
            var userIdClaim = context?.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            
            if (int.TryParse(userIdClaim, out int userId))
            {
                return userId;
            }
            
            return 0;
        }

        protected async Task<T?> GetAsync<T>(string endpoint) where T : class
        {
            await SetAuthorizationHeaderAsync();
            var response = await _httpClient.GetAsync(endpoint);
            
            if (!response.IsSuccessStatusCode)
            {
                if (response.StatusCode == System.Net.HttpStatusCode.Unauthorized)
                {
                    throw new UnauthorizedAccessException("No autorizado para acceder a este recurso.");
                }
                throw new HttpRequestException($"Error en la API: {response.StatusCode}");
            }
            
            var content = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<T>(content, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
        }

        protected async Task<T?> PostAsync<T>(string endpoint, object data) where T : class
        {
            await SetAuthorizationHeaderAsync();
            var json = JsonSerializer.Serialize(data);
            var content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");
            
            var response = await _httpClient.PostAsync(endpoint, content);
            
            if (!response.IsSuccessStatusCode)
            {
                if (response.StatusCode == System.Net.HttpStatusCode.Unauthorized)
                {
                    throw new UnauthorizedAccessException("No autorizado para realizar esta acción.");
                }
                throw new HttpRequestException($"Error en la API: {response.StatusCode}");
            }
            
            var responseContent = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<T>(responseContent, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
        }

        protected async Task<T?> PutAsync<T>(string endpoint, object data) where T : class
        {
            await SetAuthorizationHeaderAsync();
            var json = JsonSerializer.Serialize(data);
            var content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");
            
            var response = await _httpClient.PutAsync(endpoint, content);
            
            if (!response.IsSuccessStatusCode)
            {
                if (response.StatusCode == System.Net.HttpStatusCode.Unauthorized)
                {
                    throw new UnauthorizedAccessException("No autorizado para realizar esta acción.");
                }
                throw new HttpRequestException($"Error en la API: {response.StatusCode}");
            }
            
            var responseContent = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<T>(responseContent, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
        }

        protected async Task<bool> DeleteAsync(string endpoint)
        {
            await SetAuthorizationHeaderAsync();
            var response = await _httpClient.DeleteAsync(endpoint);
            
            if (response.StatusCode == System.Net.HttpStatusCode.Unauthorized)
            {
                throw new UnauthorizedAccessException("No autorizado para realizar esta acción.");
            }
            
            return response.IsSuccessStatusCode;
        }
    }
}
