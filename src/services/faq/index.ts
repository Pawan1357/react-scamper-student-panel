import { IApiSuccess, ICommonPagination } from 'utils/Types';
import { defaultQueryOptions } from 'utils/constants';

import apiInstance from 'services/interceptor';
import { useApiQuery } from 'services/masterHook';

import * as Types from './types';

const ApiEndPoints = {
  getFaqList: `faq/list`,
  view: (faqId: string) => `faq/view/${faqId}`
};

export const faqQueryKeys = {
  all: ['faq'] as const,
  getFaqList: (args: ICommonPagination) => [...faqQueryKeys.all, `getFaqList`, args],
  getFaqView: (faqId: string) => [...faqQueryKeys.all, `getFaqView`, faqId]
};

export const faqApi = {
  async getFaqList(data: ICommonPagination): Promise<Types.IFaqRes> {
    return apiInstance
      .post(ApiEndPoints.getFaqList, data)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  },

  async getFaqView(faqId: string): Promise<IApiSuccess<Types.IGetFaqRes>> {
    return apiInstance
      .get(ApiEndPoints.view(faqId))
      .then((response) => response)
      .catch((error) => {
        throw error?.response?.data;
      });
  }
};

export const faqHooks = {
  FaqList: (args: ICommonPagination) => {
    return useApiQuery({
      queryKey: faqQueryKeys.getFaqList(args),
      queryFn: () => faqApi.getFaqList(args),
      queryOptions: { ...defaultQueryOptions }
    });
  },

  useGetFaqById: (faqId: string) => {
    return useApiQuery({
      queryKey: faqQueryKeys.getFaqView(faqId),
      queryFn: () => faqApi.getFaqView(faqId),
      queryOptions: { ...defaultQueryOptions, enabled: Boolean(faqId) }
    });
  }
};
