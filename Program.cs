///TODO:Should be able to run application and then request HTTP responses from controller actions.
///Since the controller is associated with a resource (url) AND an action (POST,GET,DELETE) etc...

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
//TODO:Make sure the package are the same version or you can get errors in useContentRoot
//Use Owin with asp.net core to create pipelines at servers: https://docs.asp.net/en/latest/fundamentals/owin.html
//Need to add authentication(Ascertaining who a user is[User]), authorisation(What they can do after they have been verified[roles]).
/// <summary>
/// TODO:Should use authentication to change view depending on if customer or now.
/// </summary>
namespace annaWebsiteProject
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = new WebHostBuilder()
                .UseKestrel()
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseIISIntegration()
                .UseStartup<Startup>()
                .Build();

            host.Run();
        }
    }
}
