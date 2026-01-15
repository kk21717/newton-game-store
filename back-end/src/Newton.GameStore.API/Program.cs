using Newton.GameStore.API.Middleware;
using Newton.GameStore.Application;
using Newton.GameStore.Infrastructure;
using Newton.GameStore.Infrastructure.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure CORS for Angular frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Register application and infrastructure services
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

if (string.IsNullOrEmpty(connectionString))
{
    // Use In-Memory database when no connection string is configured
    builder.Services.AddInfrastructureServicesWithInMemory();
}
else
{
    // Use SQL Server with the configured connection string
    builder.Services.AddInfrastructureServices(connectionString);
}

builder.Services.AddApplicationServices();

var app = builder.Build();

// Configure the HTTP request pipeline
app.UseExceptionHandling();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "Video Game Catalogue API v1");
        options.RoutePrefix = string.Empty; // Swagger UI at root URL
    });
    app.UseCors("AllowAngularApp");
}


app.UseAuthorization();
app.MapControllers();

// Ensure database is created and seed with initial data
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    await context.Database.EnsureCreatedAsync();
    await DataSeeder.SeedAsync(context);
}

app.Run();

// Make Program class accessible for integration tests
public partial class Program { }
