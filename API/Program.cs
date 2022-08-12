using Application.Activities;
using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<DataContext>(opt=>{
opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddCors(opt=>{
    opt.AddPolicy("CorsPolicy",policy=>{
        policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3001");
    });
});

builder.Services.AddMediatR(typeof(List.Command).Assembly);
builder.Services.AddAutoMapper(typeof(MappingProfiles).Assembly);


var app = builder.Build();

using (var scope=app.Services.CreateScope())
{
    var services=scope.ServiceProvider;

    try
    {
        var context=services.GetRequiredService<DataContext>();
        context.Database.Migrate();

        await Seed.SeedData(context);
    }
    catch (System.Exception ex)
    {
        
        var logger=services.GetRequiredService<ILogger<Program>>();

        logger.LogError(ex,"Error occured during migration");
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("CorsPolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();
