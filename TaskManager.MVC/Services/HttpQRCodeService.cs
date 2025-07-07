using TaskManager.Shared.Services;
using System.Text.Json;
using System.Text;

namespace TaskManager.MVC.Services
{
    public class HttpQRCodeService : IQRCodeService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;

        public HttpQRCodeService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _configuration = configuration;
            _httpClient.BaseAddress = new Uri(_configuration["ApiSettings:BaseUrl"] ?? "https://localhost:5001");
        }

        public async Task<string> GenerateQRCodeAsync(string data)
        {
            var json = JsonSerializer.Serialize(new { data });
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            
            var response = await _httpClient.PostAsync("/api/qr/generate", content);
            response.EnsureSuccessStatusCode();
            
            var responseContent = await response.Content.ReadAsStringAsync();
            var result = JsonSerializer.Deserialize<JsonElement>(responseContent);
            return result.GetProperty("qrCode").GetString() ?? string.Empty;
        }

        public async Task<bool> ValidateQRCodeAsync(string qrCodeData, string expectedData)
        {
            var json = JsonSerializer.Serialize(new { qrCodeData, expectedData });
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            
            var response = await _httpClient.PostAsync("/api/qr/validate", content);
            if (!response.IsSuccessStatusCode)
                return false;
            
            var responseContent = await response.Content.ReadAsStringAsync();
            var result = JsonSerializer.Deserialize<JsonElement>(responseContent);
            return result.GetProperty("isValid").GetBoolean();
        }

        public async Task<string> GenerateSecureQRCodeAsync(int userId, string purpose)
        {
            var json = JsonSerializer.Serialize(new { userId, purpose });
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            
            var response = await _httpClient.PostAsync("/api/qr/generate-secure", content);
            response.EnsureSuccessStatusCode();
            
            var responseContent = await response.Content.ReadAsStringAsync();
            var result = JsonSerializer.Deserialize<JsonElement>(responseContent);
            return result.GetProperty("qrCode").GetString() ?? string.Empty;
        }

        public async Task<bool> ValidateSecureQRCodeAsync(string hash)
        {
            var json = JsonSerializer.Serialize(new { hash });
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            
            var response = await _httpClient.PostAsync("/api/qr/validate-secure", content);
            if (!response.IsSuccessStatusCode)
                return false;
            
            var responseContent = await response.Content.ReadAsStringAsync();
            var result = JsonSerializer.Deserialize<JsonElement>(responseContent);
            return result.GetProperty("isValid").GetBoolean();
        }
    }
}
