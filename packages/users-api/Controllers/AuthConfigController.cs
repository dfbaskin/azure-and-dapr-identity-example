using System.Threading.Tasks;
using ExampleApp.Users.Models;
using ExampleApp.Users.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ExampleApp.Users.Controllers
{
    [ApiController]
    [Route("/api/config")]
    public class AuthConfigController : ControllerBase
    {
        public AuthConfigController(AppConfigService appConfig)
        {
            AppConfig = appConfig;
        }
        
        public AppConfigService AppConfig { get; }

        [HttpGet]
        [AllowAnonymous]
        [Route("auth")]
        public async Task<AuthConfig> Get()
        {
            return await AppConfig.GetAuthenticationConfiguration();
        }
    }
}
