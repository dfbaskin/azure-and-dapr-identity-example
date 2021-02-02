using System.Threading.Tasks;
using ExampleApp.Users.Models;
using Microsoft.Extensions.Configuration;

namespace ExampleApp.Users.Services
{
    public class AppConfigService
    {
        public AppConfigService(IConfiguration config)
        {
            Config = config;
        }
        public IConfiguration Config { get; }

        public Task<AuthConfig> GetAuthenticationConfiguration()
        {
            return Task.FromResult(new AuthConfig
            {
                ClientId = Config["authentication:clientId"],
                Authority = Config["authentication:authority"],
                ApiScope = Config["authentication:apiScope"],
            });
        }
    }
}
