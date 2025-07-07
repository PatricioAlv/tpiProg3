namespace TaskManager.Shared.Services
{
    public interface IQRCodeService
    {
        Task<string> GenerateQRCodeAsync(string data);
        Task<bool> ValidateQRCodeAsync(string qrCodeData, string expectedData);
        Task<string> GenerateSecureQRCodeAsync(int userId, string purpose);
        Task<bool> ValidateSecureQRCodeAsync(string hash);
    }
}
