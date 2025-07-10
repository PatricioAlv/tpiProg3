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

        public async Task<NetQuestionResponse> GetExclusiveQuestionAsync(string hash)
        {
            try
            {
                var result = await GetAsync<NetQuestionResponse>($"/api/qr/exclusive-question?hash={Uri.EscapeDataString(hash)}");
                return result ?? new NetQuestionResponse();
            }
            catch
            {
                throw new UnauthorizedAccessException("No se pudo obtener la pregunta exclusiva");
            }
        }

        public async Task<AnswerResponse> SubmitAnswerAsync(string hash, string answer)
        {
            try
            {
                var requestData = new { QrHash = hash, Answer = answer };
                var result = await PostAsync<AnswerResponse>("/api/qr/submit-answer", requestData);
                return result ?? new AnswerResponse();
            }
            catch
            {
                throw new UnauthorizedAccessException("No se pudo enviar la respuesta");
            }
        }
    }

    public class NetQuestionResponse
    {
        public string Message { get; set; } = string.Empty;
        public DateTime AccessedAt { get; set; }
        public NetQuestionData Question { get; set; } = new();
        public string Instructions { get; set; } = string.Empty;
    }

    public class NetQuestionData
    {
        public int Id { get; set; }
        public string Question { get; set; } = string.Empty;
        public string[] Options { get; set; } = Array.Empty<string>();
        public int Hour { get; set; }
        public DateTime ExpiresAt { get; set; }
    }

    public class AnswerResponse
    {
        public bool IsCorrect { get; set; }
        public string Message { get; set; } = string.Empty;
        public DateTime Timestamp { get; set; }
    }
}
