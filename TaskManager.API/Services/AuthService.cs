using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TaskManager.API.Data;
using TaskManager.Shared.DTOs;
using TaskManager.Shared.Models;
using BCrypt.Net;

namespace TaskManager.API.Services
{
    public class AuthService : IAuthService
    {
        private readonly TaskManagerDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthService(TaskManagerDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<AuthResponseDto?> LoginAsync(LoginDto loginDto)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == loginDto.Email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordHash))
            {
                return null;
            }

            var token = GenerateJwtToken(user);

            return new AuthResponseDto
            {
                Token = token,
                RefreshToken = Guid.NewGuid().ToString(),
                Expiry = DateTime.UtcNow.AddMinutes(Convert.ToDouble(_configuration["JwtSettings:ExpiryMinutes"])),
                User = new UserDto
                {
                    Id = user.Id,
                    Name = user.Name,
                    Email = user.Email,
                    CreatedAt = user.CreatedAt
                }
            };
        }

        public async Task<AuthResponseDto?> RegisterAsync(RegisterDto registerDto)
        {
            if (await _context.Users.AnyAsync(u => u.Email == registerDto.Email))
            {
                return null;
            }

            var salt = BCrypt.Net.BCrypt.GenerateSalt();
            var passwordHash = BCrypt.Net.BCrypt.HashPassword(registerDto.Password, salt);

            var user = new User
            {
                Name = registerDto.Name,
                Email = registerDto.Email,
                PasswordHash = passwordHash,
                Salt = salt,
                CreatedAt = DateTime.UtcNow
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var token = GenerateJwtToken(user);

            return new AuthResponseDto
            {
                Token = token,
                RefreshToken = Guid.NewGuid().ToString(),
                Expiry = DateTime.UtcNow.AddMinutes(Convert.ToDouble(_configuration["JwtSettings:ExpiryMinutes"])),
                User = new UserDto
                {
                    Id = user.Id,
                    Name = user.Name,
                    Email = user.Email,
                    CreatedAt = user.CreatedAt
                }
            };
        }

        public async Task<bool> ForgotPasswordAsync(ForgotPasswordDto forgotPasswordDto)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == forgotPasswordDto.Email);

            if (user == null)
            {
                return false;
            }

            user.ResetToken = Guid.NewGuid().ToString();
            user.ResetTokenExpiry = DateTime.UtcNow.AddHours(1);

            await _context.SaveChangesAsync();

            // TODO: Send email with reset link
            // For now, just return true
            return true;
        }

        public async Task<bool> ResetPasswordAsync(ResetPasswordDto resetPasswordDto)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.ResetToken == resetPasswordDto.Token &&
                                          u.ResetTokenExpiry > DateTime.UtcNow);

            if (user == null)
            {
                return false;
            }

            var salt = BCrypt.Net.BCrypt.GenerateSalt();
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(resetPasswordDto.Password, salt);
            user.Salt = salt;
            user.ResetToken = null;
            user.ResetTokenExpiry = null;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<UserDto?> GetUserByIdAsync(int userId)
        {
            var user = await _context.Users.FindAsync(userId);
            
            if (user == null)
                return null;

            return new UserDto
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                CreatedAt = user.CreatedAt
            };
        }

        public async Task<List<UserDto>> GetAllUsersAsync()
        {
            return await _context.Users
                .Select(u => new UserDto
                {
                    Id = u.Id,
                    Name = u.Name,
                    Email = u.Email,
                    CreatedAt = u.CreatedAt
                })
                .ToListAsync();
        }

        private string GenerateJwtToken(User user)
        {
            var jwtSettings = _configuration.GetSection("JwtSettings");
            var secretKey = jwtSettings["SecretKey"];
            var issuer = jwtSettings["Issuer"];
            var audience = jwtSettings["Audience"];
            var expiryMinutes = Convert.ToDouble(jwtSettings["ExpiryMinutes"]);

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey!));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(expiryMinutes),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
