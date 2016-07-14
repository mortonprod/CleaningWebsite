using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using annaWebsiteProject.Data;
using annaWebsiteProject.Models;
using annaWebsiteProject.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.Cookies;

namespace annaWebsiteProject
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);

            if (env.IsDevelopment())
            {
                // For more details on using the user secret store see http://go.microsoft.com/fwlink/?LinkID=532709
                builder.AddUserSecrets();

                // This will push telemetry data through Application Insights pipeline faster, allowing you to view results immediately.
                builder.AddApplicationInsightsSettings(developerMode: true);
            }

            builder.AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        //You need to also include these services through dependency injection after you have specified the service here.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddApplicationInsightsTelemetry(Configuration);

            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>() //TODO:Need to add connection to our local database and then to other types of DB.
                .AddDefaultTokenProviders();
            ///TODO:Need to add this for google sign in to work with asp.net but fine for javascript api.
            services.AddAuthentication(options => options.SignInScheme = CookieAuthenticationDefaults.AuthenticationScheme);
            services.AddMvc();

            // Add application services.
            services.AddTransient<IEmailSender, AuthMessageSender>();
            services.AddTransient<ISmsSender, AuthMessageSender>();
            //Adding this to deal with facebook/google sign in.
            //TODO:Need to go to properties and use SSL
            services.Configure<MvcOptions>(options =>
            {
                options.Filters.Add(new RequireHttpsAttribute());
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            app.UseApplicationInsightsRequestTelemetry();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
                app.UseBrowserLink();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseApplicationInsightsExceptionTelemetry();

            app.UseStaticFiles();

            app.UseIdentity();

            // Add external authentication middleware below. To configure them please see http://go.microsoft.com/fwlink/?LinkID=532715
            ///Add facebook login in pipeline and to view using:
            ///SignInManager.GetExternalAuthenticationSchemes()
            app.UseFacebookAuthentication(new FacebookOptions()
            {
                AppId = "708591339292640", //Configuration["Authentication:Facebook:AppId"],
                AppSecret = "0b16b0d54f5b929d9befdd94ea629623" //Configuration["Authentication:Facebook:AppSecret"]
            });
            //Need to also specify this:https://localhost:44309/signin-google
            //as return url ONLY at google dev console. 
            // Adds a cookie-based authentication middleware to application
            //Cookies added for google sign in.
            //Also need to enable google+ api to get the user details.
            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                //Login page to redirect to if login failure.
                LoginPath = "/account/login",
                AuthenticationScheme = "Cookies",
                AutomaticAuthenticate = true,
                AutomaticChallenge = true
            });
            app.UseGoogleAuthentication(  new GoogleOptions()
            {
                ClientId = "268704348373-df2j3c9cqdg51u6tr51o1vm44gqca84b.apps.googleusercontent.com",
                ClientSecret = "buW2RS8SKkXxD_H1dHJo_5kK",
                Scope = { "email", "openid" }
            });

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
