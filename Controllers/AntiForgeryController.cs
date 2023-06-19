using Microsoft.AspNetCore.Antiforgery;

namespace BizTweak.Web.Controllers
{
    public class AntiForgeryController : BizTweakControllerBase
    {
        private readonly IAntiforgery _antiforgery;

        public AntiForgeryController(IAntiforgery antiforgery)
        {
            _antiforgery = antiforgery;
        }

        public void GetToken()
        {
            _antiforgery.SetCookieTokenAndHeader(HttpContext);
        }
    }
}
