using Microsoft.AspNetCore.Authentication.Cookies;
using TaskManager.Shared.Services;
using TaskManager.MVC.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

// HTTP Client
builder.Services.AddHttpClient();

// HTTP Context Accessor
builder.Services.AddHttpContextAccessor();

// Authentication
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.LoginPath = "/Auth/Login";
        options.LogoutPath = "/Auth/Logout";
        options.AccessDeniedPath = "/Auth/AccessDenied";
        options.ExpireTimeSpan = TimeSpan.FromDays(7);
    });

// Services
builder.Services.AddScoped<IAuthService, HttpAuthService>();
builder.Services.AddScoped<IProjectService, HttpProjectService>();
builder.Services.AddScoped<ITaskService, HttpTaskService>();
builder.Services.AddScoped<IQRCodeService, HttpQRCodeService>();

var app = builder.Build();

// Configure URLs and ports
app.Urls.Add("http://localhost:5001");
app.Urls.Add("https://localhost:5002");

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "exclusive",
    pattern: "exclusive/{hash}",
    defaults: new { controller = "Exclusive", action = "Question" });

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
