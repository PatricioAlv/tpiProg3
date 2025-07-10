using QRCoder;
using System.Drawing;
using System.Drawing.Imaging;
using System.Security.Cryptography;
using System.Security;
using System.Text;

namespace TaskManager.API.Services
{
    public interface IQRCodeService
    {
        Task<string> GenerateQRCodeAsync(string data);
        Task<string> GenerateSecureQRCodeAsync(int userId, string purpose);
        Task<bool> ValidateSecureQRCodeAsync(string hash);
    }

    public class QRCodeService : IQRCodeService
    {
        private readonly IConfiguration _configuration;

        public QRCodeService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public Task<string> GenerateQRCodeAsync(string data)
        {
            using var qrGenerator = new QRCodeGenerator();
            using var qrCodeData = qrGenerator.CreateQrCode(data, QRCodeGenerator.ECCLevel.Q);
            using var qrCode = new PngByteQRCode(qrCodeData);
            
            var qrCodeBytes = qrCode.GetGraphic(20);
            var base64String = Convert.ToBase64String(qrCodeBytes);
            
            return Task.FromResult($"data:image/png;base64,{base64String}");
        }

        public async Task<string> GenerateSecureQRCodeAsync(int userId, string purpose)
        {
            var timestamp = DateTimeOffset.UtcNow.ToUnixTimeSeconds();
            var expiryTime = timestamp + (10 * 60); // 10 minutos de validez
            
            var data = $"{userId}|{purpose}|{timestamp}|{expiryTime}";
            var hash = GenerateHash(data);
            
            // URL que apunta a la SPA de React para funcionalidad exclusiva
            var url = $"http://localhost:3000/exclusive/{hash}";
            
            return await GenerateQRCodeAsync(url);
        }

        public Task<bool> ValidateSecureQRCodeAsync(string hash)
        {
            try
            {
                var decodedData = DecodeHash(hash);
                var parts = decodedData.Split('|');
                
                if (parts.Length != 4)
                    return Task.FromResult(false);
                
                var userId = int.Parse(parts[0]);
                var purpose = parts[1];
                var timestamp = long.Parse(parts[2]);
                var expiryTime = long.Parse(parts[3]);
                
                var currentTime = DateTimeOffset.UtcNow.ToUnixTimeSeconds();
                
                return Task.FromResult(currentTime <= expiryTime);
            }
            catch
            {
                return Task.FromResult(false);
            }
        }

        private string GenerateHash(string data)
        {
            var secretKey = _configuration["JwtSettings:SecretKey"];
            var keyBytes = Encoding.UTF8.GetBytes(secretKey!);
            var dataBytes = Encoding.UTF8.GetBytes(data);
            
            using var hmac = new HMACSHA256(keyBytes);
            var hashBytes = hmac.ComputeHash(dataBytes);
            
            var combined = Encoding.UTF8.GetBytes(data).Concat(hashBytes).ToArray();
            return Convert.ToBase64String(combined);
        }

        private string DecodeHash(string hash)
        {
            var bytes = Convert.FromBase64String(hash);
            var dataLength = bytes.Length - 32; // 32 bytes for HMAC-SHA256
            
            var dataBytes = bytes.Take(dataLength).ToArray();
            var hashBytes = bytes.Skip(dataLength).ToArray();
            
            var secretKey = _configuration["JwtSettings:SecretKey"];
            var keyBytes = Encoding.UTF8.GetBytes(secretKey!);
            
            using var hmac = new HMACSHA256(keyBytes);
            var computedHash = hmac.ComputeHash(dataBytes);
            
            if (!hashBytes.SequenceEqual(computedHash))
                throw new SecurityException("Hash validation failed");
            
            return Encoding.UTF8.GetString(dataBytes);
        }
    }
}
