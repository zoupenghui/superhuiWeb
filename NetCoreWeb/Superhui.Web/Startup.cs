using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Superhui.Web.Models;
using Microsoft.AspNetCore.Http;

namespace Superhui.Web
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


            services.AddDbContext<Models.AppIdentityDbContext>(options => options.UseSqlServer(Configuration["Data:Identity:ConnectionString"]));
            services.AddIdentity<IdentityUser, IdentityRole>().AddEntityFrameworkStores<AppIdentityDbContext>().AddDefaultTokenProviders();

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddDbContext<Areas.Docs.Models.BlogDbContext>(options => options.UseSqlServer(Configuration["Data:Blog:ConnectionString"]));
            services.AddTransient<Areas.Docs.Models.IBlogRepository, Areas.Docs.Models.EFBlogRepository>();

            services.AddMvc();

            services.AddMemoryCache();
            services.AddSession();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseBrowserLink();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();
            app.UseSession();
            app.UseAuthentication();
            app.UseMvc(routes =>
            {
                // routes.MapRoute(name: "areas", template: "{area:exists=racs}/{controller=Home}/{action=Index}");
                routes.MapRoute(name: "areas", template: "{area:exists=Echart}/{controller=Home}/{action=Index}");
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
                routes.MapRoute(
                    name: "out",
                    template: "outbound{controller}/{action}");
            });
            //IdentitySeedData.EnsurePopulated(app);//身份验证
        }
    }
}
