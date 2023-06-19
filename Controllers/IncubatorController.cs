﻿using System;
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
    public class IncubatorController : BizTweakControllerBase
    {
        private readonly ITempFileCacheManager _tempFileCacheManager;

        private const long MaxPhotoLength = 5242880; //5MB
        private const string MaxPhotoLengthUserFriendlyValue = "5MB"; //5MB
        private readonly string[] PhotoAllowedFileTypes = { "jpeg", "jpg", "png" };

        public IncubatorController(ITempFileCacheManager tempFileCacheManager)
        {
            _tempFileCacheManager = tempFileCacheManager;
        }

        public FileUploadCacheOutput UploadPhotoFile()
        {
            try
            {
                //Check input
                if (Request.Form.Files.Count == 0)
                {
                    throw new UserFriendlyException(L("NoFileFoundError"));
                }

                var file = Request.Form.Files.First();
                if (file.Length > MaxPhotoLength)
                {
                    throw new UserFriendlyException(L("Warn_File_SizeLimit", MaxPhotoLengthUserFriendlyValue));
                }

                var fileType = Path.GetExtension(file.FileName).Substring(1);
                if (PhotoAllowedFileTypes != null && PhotoAllowedFileTypes.Length > 0 && !PhotoAllowedFileTypes.Contains(fileType))
                {
                    throw new UserFriendlyException(L("FileNotInAllowedFileTypes", PhotoAllowedFileTypes));
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

        public string[] GetPhotoFileAllowedTypes()
        {
            return PhotoAllowedFileTypes;
        }

    }
}