using MaisSangueMobileAPI.Controllers;
using MaisSangueMobileAPI.Interfaces;
using MaisSangueMobileAPI.Repositories;
using MaisSangueMobileAPI.Services;
using MySql.Data.MySqlClient;
using System.Data;
using System.Data;
using MySql.Data.MySqlClient;
using MaisSangueMobileAPI.Models;



var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllersWithViews();

var connectionString = builder.Configuration.GetConnectionString("MYSQLCONNECT");

builder.Services.AddScoped<IDbConnection>((sp) =>
  new MySqlConnection(connectionString));

builder.Services.AddControllers();
builder.Services.AddScoped<MonitorServices>();
builder.Services.AddScoped<IMonitorRepository, MonitorRepository>();
builder.Services.AddScoped<PacienteServices>();
builder.Services.AddScoped<IPacienteRepository, PacienteRepository>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
