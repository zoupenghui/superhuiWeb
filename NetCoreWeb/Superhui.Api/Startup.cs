using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Superhui.Api.MiddelWare;

namespace Superhui.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(option =>
            {
                option.AddPolicy("AllowSepecificOrigins", builder =>
                {
                    //builder.WithOrigins("http://www.zoupenghui.com", "http://127.0.0.1:8000", "http://localhost:8000")
                    builder.AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();
                });
            });
            //services.AddSingleton<IFileProvider>(new PhysicalFileProvider("/Users/zph/Desktop/"));
            services.AddSingleton<IFileProvider>(new PhysicalFileProvider((Configuration.GetSection("Assets")?.GetValue<string>("FileLoacation"))));

            // services.AddSingleton<IFileProvider>(new PhysicalFileProvider("C:\\"));
            // services.AddSingleton<IFileProvider>(new PhysicalFileProvider("C:/Users/XPS/Desktop"));
            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseRequestLogger(); // request log middleware
                app.UseDeveloperExceptionPage();
            }
            app.UseStaticFiles();
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: null,
                    template: "home/localfile/{*catchall}",
                    defaults: new { controller="Home", action="LocalFile"});
                routes.MapRoute(
                    name: null,
                    template: "{controller}/{action}/{id?}");
            });
        }
    }
}
