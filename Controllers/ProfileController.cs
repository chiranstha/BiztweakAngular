using Abp.AspNetCore.Mvc.Authorization;
using BizTweak.Authorization.Users.Profile;
using BizTweak.Graphics;
using BizTweak.Storage;

namespace BizTweak.Web.Controllers
{
    [AbpMvcAuthorize]
    public class ProfileController : ProfileControllerBase
    {
        public ProfileController(
            ITempFileCacheManager tempFileCacheManager,
            IProfileAppService profileAppService,
            IImageFormatValidator imageFormatValidator) :
            base(tempFileCacheManager, profileAppService, imageFormatValidator)
        {
        }
    }
}