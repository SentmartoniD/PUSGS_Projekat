using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPUSGS.Models;
using WebApplicationPUSGS.Services;
using WebApplicationPUSGS.Interfaces;
using WebApplicationPUSGS.Infrastucture;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using WebApplicationPUSGS.Mapping;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace WebApplicationPUSGS
{
    public class Startup
    {
        //private readonly string _cors = "cors";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "WebApplicationPUSGS", Version = "v1" });
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header,
                    Description = "Please enter token",
                    Name = "Authorization",
                    Type = SecuritySchemeType.Http,
                    BearerFormat = "JWT",
                    Scheme = "bearer"
                });
                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type=ReferenceType.SecurityScheme,
                                Id="Bearer"
                            }
                        },
                        new string[]{}
                    }
                });
            });

            /*
            services.AddCors(options =>
            {
                options.AddPolicy(name: _cors, builder => {
                    builder.WithOrigins("https://localhost:3000")//Ovde navodimo koje sve aplikacije smeju kontaktirati nasu,u ovom slucaju nas React front
                           .AllowAnyHeader()
                           .AllowAnyMethod()
                           .AllowCredentials();
                });
            });*/

            services.AddAuthentication(opt =>
            {
                opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters //Podesavamo parametre za validaciju pristiglih tokena
               {
                   ValidateIssuer = true, //Validira izdavaoca tokena
                   ValidateAudience = false, //Kazemo da ne validira primaoce tokena
                   ValidateLifetime = true,//Validira trajanje tokena
                   ValidateIssuerSigningKey = true, //validira potpis token, ovo je jako vazno!
                   ValidIssuer = "http://localhost:44368", //odredjujemo koji server je validni izdavalac
                   IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["SecretKey"]))//navodimo privatni kljuc kojim su potpisani nasi tokeni
               };
            });

            services.AddCors(options =>
            {
                options.AddPolicy("AllowAnyOrigin",
                    builder => builder.AllowAnyOrigin()
                     .AllowAnyHeader()
                     .AllowAnyMethod());
            });

            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IArticleService, ArticleServis>();
            services.AddScoped<IOrderService, OrderService>();

            services.AddDbContext<PUSGSWebAppDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("PUSGSWebAppDatabase2")));

            var mapperConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new MappingProfile());
            });

            IMapper mapper = mapperConfig.CreateMapper();
            services.AddSingleton(mapper);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "WebApplicationPUSGS v1"));
            }

            app.UseHttpsRedirection();
            // app.UseCors(_cors);
            app.UseCors("AllowAnyOrigin");

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
