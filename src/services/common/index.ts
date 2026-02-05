import { UseMutationOptions, UseMutationResult } from '@tanstack/react-query';

import { IApiError, IApiSuccess } from 'utils/Types';

import apiInstance from 'services/interceptor';
import { useApiMutation } from 'services/masterHook';

import * as Types from './types';

export const apiEndPoints = {
  imageUpload: 'uploadMultipleFile',
  courseList: 'course/findAll',
  googleRedirectUrlApi: `student-auth/google/auth-url`,
  cleverRedirectUrlApi: `student-auth/clever/auth-url`
};

export const commonQueryKey = {
  all: ['common'] as const,
  uploadImage: () => [...commonQueryKey.all, 'uploadImage']
};

export const commonApi = {
  async uploadFileAction(data: Types.IUploadImageReq): Promise<IApiSuccess<Types.IUploadImageRes>> {
    const formData = new FormData();
    const fileArray = Array.isArray(data?.files) ? data?.files : [data?.files];
    fileArray?.map((value) => {
      formData.append('files', value);
    });
    formData.append('moduleName', data?.moduleName);
    return apiInstance
      .post(`${apiEndPoints.imageUpload}`, formData)
      .then((response) => response)
      .catch((error) => {
        throw error?.response?.data;
      });
  }
};

export const commonHooks = {
  useImageUpload: (
    options?: UseMutationOptions<
      IApiSuccess<Types.IUploadImageRes>,
      IApiError,
      Types.IUploadImageReq
    >
  ): UseMutationResult<IApiSuccess<Types.IUploadImageRes>, IApiError, Types.IUploadImageReq> => {
    return useApiMutation({
      mutationKey: commonQueryKey.uploadImage(),
      mutationFn: (data) => commonApi.uploadFileAction(data),
      mutationOptions: options
    });
  }
};
