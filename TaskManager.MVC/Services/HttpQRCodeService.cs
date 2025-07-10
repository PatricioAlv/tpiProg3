using TaskManager.Shared.Services;

namespace TaskManager.MVC.Services
{
    public class HttpQRCodeService : BaseHttpService, IQRCodeService
    {
        public HttpQRCodeService(HttpClient httpClient, IHttpContextAccessor httpContextAccessor, IConfiguration configuration)
            : base(httpClient, httpContextAccessor, configuration)
        {
        }

        public async Task<string> GenerateQRCodeAsync(string data)
        {
            try
            {
                var requestData = new { data };
                var result = await PostAsync<object>("/api/qr/generate", requestData);
                
                // Extraer el código QR del resultado
                if (result != null)
                {
                    // Intentar obtener la propiedad qrCode del resultado
                    var resultJson = System.Text.Json.JsonSerializer.Serialize(result);
                    var jsonDoc = System.Text.Json.JsonDocument.Parse(resultJson);
                    if (jsonDoc.RootElement.TryGetProperty("qrCode", out System.Text.Json.JsonElement qrCodeElement))
                    {
                        return qrCodeElement.GetString() ?? string.Empty;
                    }
                }
            }
            catch
            {
                // En caso de error, retornar string vacío
            }
            
            return string.Empty;
        }

        public async Task<bool> ValidateQRCodeAsync(string qrCodeData, string expectedData)
        {
            try
            {
                var requestData = new { qrCodeData, expectedData };
                var result = await PostAsync<object>("/api/qr/validate", requestData);
                return result != null;
            }
            catch
            {
                return false;
            }
        }

        public async Task<string> GenerateSecureQRCodeAsync(int userId, string purpose)
        {
            try
            {
                var requestData = new { Purpose = purpose };
                var result = await PostAsync<object>("/api/qr/generate", requestData);
                
                if (result != null)
                {
                    var resultJson = System.Text.Json.JsonSerializer.Serialize(result);
                    var jsonDoc = System.Text.Json.JsonDocument.Parse(resultJson);
                    if (jsonDoc.RootElement.TryGetProperty("qrCode", out System.Text.Json.JsonElement qrCodeElement))
                    {
                        return qrCodeElement.GetString() ?? string.Empty;
                    }
                }
            }
            catch
            {
                // En caso de error en la deserialización, devolver string vacío
            }
            
            return string.Empty;
        }

        public async Task<bool> ValidateSecureQRCodeAsync(string hash)
        {
            try
            {
                var result = await GetAsync<object>($"/api/qr/validate?hash={Uri.EscapeDataString(hash)}");
                return result != null;
            }
            catch
            {
                return false;
            }
        }
    }
}
