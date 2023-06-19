using Abp.AspNetCore.Mvc.Authorization;
using BizTweak.Authorization;
using BizTweak.Storage;
using Abp.BackgroundJobs;

namespace BizTweak.Web.Controllers
{
    [AbpMvcAuthorize(AppPermissions.Pages_Administration_Users)]
    public class UsersController : UsersControllerBase
    {
        public UsersController(IBinaryObjectManager binaryObjectManager, IBackgroundJobManager backgroundJobManager)
            : base(binaryObjectManager, backgroundJobManager)
        {
        }
    }
}