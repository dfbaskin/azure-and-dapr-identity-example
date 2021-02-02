using System.Linq;
using System.Security.Claims;
using ExampleApp.Users.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ExampleApp.Users.Controllers
{
    [ApiController]
    [Route("/api")]
    public class PingController : ControllerBase
    {
        [HttpGet]
        [Route("ping")]
        public PingResponse Ping()
        {
            return new PingResponse
            {
                UserName = User.Claims
                    .Where(c => c.Type == "name")
                    .Select(c => c.Value)
                    .FirstOrDefault()
            };
        }
    }
}
