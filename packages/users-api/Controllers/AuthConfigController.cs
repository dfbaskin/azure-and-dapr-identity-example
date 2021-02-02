using System.Threading.Tasks;
using ExampleApp.Users.Services;
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
        [Route("auth")]
        public async Task<IActionResult> Get()
        {
            var authConfig = await AppConfig.GetAuthenticationConfiguration();
            return new JsonResult(authConfig);
        }
    }
}
