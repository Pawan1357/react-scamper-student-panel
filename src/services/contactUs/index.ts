import { UseMutationOptions } from '@tanstack/react-query';

import { IApiError, IApiSuccess, ICommonPagination } from 'utils/Types';
import { defaultQueryOptions } from 'utils/constants';

import apiInstance from 'services/interceptor';
import { useApiMutation, useApiQuery } from 'services/masterHook';

import { IContactListRes, IContactUsViewRes } from './types';

const ApiEndPoints = {
  addContact: `contact-us/create`,
  getContactList: `contact-us/list`,
  getContactView: (contactId: string) => `contact-us/${contactId}`,
  delete: `contact-us`
};

export const contactQueryKeys = {
  all: ['contact'] as const,
  addContact: ['addContact'],
  deleteContact: ['deleteContact'],
  getContactList: (args: ICommonPagination) => [...contactQueryKeys.all, `getContactList`, args],
  getContactView: (contactId: string) => [...contactQueryKeys.all, `getContactView`, contactId]
};

export const contactApi = {
  createContact: async (data: {
    title: string;
    description: string;
  }): Promise<IApiSuccess<Record<string, never>>> => {
    return apiInstance
      .post(ApiEndPoints.addContact, data)
      .then((response) => response)
      .catch((error) => {
        throw error.response.data;
      });
  },

  async getContactList(data: ICommonPagination): Promise<IContactListRes> {
    return apiInstance
      .post(ApiEndPoints.getContactList, data)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  },

  async getContactView(contactId: string): Promise<IApiSuccess<IContactUsViewRes>> {
    return apiInstance
      .get(ApiEndPoints.getContactView(contactId))
      .then((response) => response)
      .catch((error) => {
        throw error?.response?.data;
      });
  },

  async contactDelete(data: { ids: number[] }): Promise<IApiSuccess<Record<string, never>>> {
    return apiInstance
      .delete(ApiEndPoints.delete, { data: data })
      .then((response) => response)
      .catch((error) => {
        throw error?.response?.data;
      });
  }
};

export const contactHooks = {
  useCreate: () => {
    return useApiMutation({
      mutationKey: contactQueryKeys.addContact,
      mutationFn: (data: { title: string; description: string }) => contactApi.createContact(data)
    });
  },

  ContactList: (args: ICommonPagination) => {
    return useApiQuery({
      queryKey: contactQueryKeys.getContactList(args),
      queryFn: () => contactApi.getContactList(args),
      queryOptions: { ...defaultQueryOptions }
    });
  },

  useGetContactById: (contactId: string) => {
    return useApiQuery({
      queryKey: contactQueryKeys.getContactView(contactId),
      queryFn: () => contactApi.getContactView(contactId),
      queryOptions: { ...defaultQueryOptions, enabled: Boolean(contactId) }
    });
  },

  useDeleteContacts: (
    mutationOptions?: UseMutationOptions<
      IApiSuccess<Record<string, never>>,
      IApiError,
      { ids: number[] }
    >
  ) => {
    return useApiMutation({
      mutationKey: contactQueryKeys.deleteContact,
      mutationFn: (data: { ids: number[] }) => contactApi.contactDelete(data),
      mutationOptions
    });
  }
};
