using Abp.AspNetCore.Mvc.Views;

namespace BizTweak.Web.Views
{
    public abstract class BizTweakRazorPage<TModel> : AbpRazorPage<TModel>
    {
        protected BizTweakRazorPage()
        {
            LocalizationSourceName = BizTweakConsts.LocalizationSourceName;
        }
    }
}
