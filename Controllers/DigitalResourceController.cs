using System;
using System.IO;
using System.Linq;
using Abp.IO.Extensions;
using Abp.UI;
using Abp.Web.Models;
using Microsoft.AspNetCore.Authorization;
using BizTweak.Storage;

namespace BizTweak.Web.Controllers
{
    [Authorize]
    public class DigitalResourceController : BizTweakControllerBase
    {
        private readonly ITempFileCacheManager _tempFileCacheManager;

        private const long MaxFileLength = 5242880; //5MB
        private const string MaxFileLengthUserFriendlyValue = "5MB"; //5MB
        private readonly string[] FileAllowedFileTypes = { "jpeg", "jpg", "png" };

        public DigitalResourceController(ITempFileCacheManager tempFileCacheManager)
        {
            _tempFileCacheManager = tempFileCacheManager;
        }

        public FileUploadCacheOutput UploadFileFile()
        {
            try
            {
                //Check input
                if (Request.Form.Files.Count == 0)
                {
                    throw new UserFriendlyException(L("NoFileFoundError"));
                }

                var file = Request.Form.Files.First();
                if (file.Length > MaxFileLength)
                {
                    throw new UserFriendlyException(L("Warn_File_SizeLimit", MaxFileLengthUserFriendlyValue));
                }

                var fileType = Path.GetExtension(file.FileName).Substring(1);
                if (FileAllowedFileTypes != null && FileAllowedFileTypes.Length > 0 && !FileAllowedFileTypes.Contains(fileType))
                {
                    throw new UserFriendlyException(L("FileNotInAllowedFileTypes", FileAllowedFileTypes));
                }

                byte[] fileBytes;
                using (var stream = file.OpenReadStream())
                {
                    fileBytes = stream.GetAllBytes();
                }

                var fileToken = Guid.NewGuid().ToString("N");
                _tempFileCacheManager.SetFile(fileToken, new TempFileInfo(file.FileName, fileType, fileBytes));

                return new FileUploadCacheOutput(fileToken);
            }
            catch (UserFriendlyException ex)
            {
                return new FileUploadCacheOutput(new ErrorInfo(ex.Message));
            }
        }

        public string[] GetFileFileAllowedTypes()
        {
            return FileAllowedFileTypes;
        }

    }
}