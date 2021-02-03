using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Mime;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web;
using Microsoft.Identity.Web.Resource;

namespace ExampleApp.Users.Controllers
{
    [ApiController]
    [Route("/api/current-user")]
    public class CurrentUserController : ControllerBase
    {
        private static readonly string[] requiredScopes = new string[] { "access_as_user" };
        private static readonly string[] apiScopes = new string[] { "user.read" };
        private HttpClient Client { get; } = new HttpClient();

        public ITokenAcquisition Tokens { get; }

        public CurrentUserController(ITokenAcquisition tokenAcquisition)
        {
            Tokens = tokenAcquisition;
        }

        [HttpGet]
        [Route("me")]
        public async Task<IActionResult> Me(CancellationToken cancellationToken)
        {
            HttpContext.VerifyUserHasAnyAcceptedScope(requiredScopes);
            string accessToken = await Tokens.GetAccessTokenForUserAsync(apiScopes);

            using var reqMsg = new HttpRequestMessage(HttpMethod.Get, "https://graph.microsoft.com/v1.0/me");
            reqMsg.Headers.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
            using var rspMsg = await Client.SendAsync(reqMsg, HttpCompletionOption.ResponseContentRead, cancellationToken);
            rspMsg.EnsureSuccessStatusCode();
            return new ContentResult
            {
                Content = await rspMsg.Content.ReadAsStringAsync(),
                ContentType = MediaTypeNames.Application.Json,
                StatusCode = (int)HttpStatusCode.OK,
            };
        }
    }
}
