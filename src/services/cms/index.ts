import { UseMutationOptions } from '@tanstack/react-query';

import { IApiError, IApiSuccess } from 'utils/Types';
import { CmsTypeEnum } from 'utils/constants/enum';

import apiInstance from 'services/interceptor';
import { useApiMutation } from 'services/masterHook';

import * as Types from './types';

//Api End Points
const ApiEndPoints = {
  getCms: `/cms/getCmsByTitle`
};

export const cmsQueryKey = {
  all: ['cms'] as const,
  details: (type: string) => [...cmsQueryKey.all, 'cmsDetails', type]
};

// Api
export const cmsApi = {
  async getCmsDetails(data: Types.ICmsDetailsReq): Promise<IApiSuccess<Types.ICmsDetailsRes>> {
    return apiInstance
      .post(ApiEndPoints.getCms, data)
      .then((response) => response)
      .catch((error) => {
        throw error?.response?.data;
      });
  }
};

// Hooks
export const cmsHooks = {
  useGetCmsDetails: (
    mutationOptions?: UseMutationOptions<
      IApiSuccess<Types.ICmsDetailsRes>,
      IApiError,
      Types.ICmsDetailsReq
    >
  ) => {
    return useApiMutation({
      mutationKey: cmsQueryKey.details(CmsTypeEnum.TERMS_AND_CONDITION),
      mutationFn: cmsApi.getCmsDetails,
      mutationOptions
    });
  }
};
