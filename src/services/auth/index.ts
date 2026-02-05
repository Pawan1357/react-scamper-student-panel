import { UseMutationOptions } from '@tanstack/react-query';

import { IApiError, IApiSuccess } from 'utils/Types';
import { defaultQueryOptions } from 'utils/constants';

import apiInstance from 'services/interceptor';
import { useApiMutation, useApiQuery } from 'services/masterHook';

import * as Types from './types';

const ApiEndPoints = {
  signIn: `student-auth/login`,
  googleSignIn: `student-auth/google-login`,
  cleverSignIn: `student-auth/clever-login`,
  forgotPassword: `student-auth/forgotPassword`,
  resetPassword: `student-auth/resetPassword`,
  changePassword: `student-auth/changePassword`,
  profile: `student-auth/profile`,
  updateProfile: `student-auth/update-profile`
};

export const authQueryKey = {
  all: ['auth'] as const,
  signIn: () => [...authQueryKey.all, `signIn`],
  googleSignIn: () => [...authQueryKey.all, `googleSignIn`],
  cleverSignIn: () => [...authQueryKey.all, `cleverSignIn`],
  forgotPassword: () => [...authQueryKey.all, `forgotPassword`],
  resetPassword: () => [...authQueryKey.all, `resetPassword`],
  changePassword: () => [...authQueryKey.all, `changePassword`],
  profileGet: () => [...authQueryKey.all, `userProfileGet`],
  profileUpdate: () => [...authQueryKey.all, `profileUpdate`]
};

// API
export const authApi = {
  // SignIn
  async signIn(data: Types.ISignInReq): Promise<IApiSuccess<Types.ISignInRes>> {
    return apiInstance
      .post(ApiEndPoints.signIn, data)
      .then((response) => response)
      .catch((error) => {
        throw error?.response?.data;
      });
  },

  // forgot password
  async forgotPassword(data: Types.IForgotPasswordReq): Promise<IApiSuccess> {
    return apiInstance
      .post(ApiEndPoints.forgotPassword, data)
      .then((response) => response)
      .catch((error) => {
        throw error?.response?.data;
      });
  },

  // reset password
  async resetPassword(data: Types.IResetPasswordReq): Promise<IApiSuccess> {
    return apiInstance
      .post(ApiEndPoints.resetPassword, data)
      .then((response) => response)
      .catch((error) => {
        throw error?.response?.data;
      });
  },

  // change password
  async changePassword(data: Types.IChangePasswordReq): Promise<IApiSuccess> {
    return apiInstance
      .post(ApiEndPoints.changePassword, data)
      .then((response) => response)
      .catch((error) => {
        throw error?.response?.data;
      });
  },

  async updateProfile(data: Types.IProfileUpdateReq): Promise<IApiSuccess> {
    return apiInstance
      .patch(ApiEndPoints.updateProfile, data)
      .then((response) => response)
      .catch((error) => {
        throw error?.response?.data;
      });
  },

  async profileGet(): Promise<IApiSuccess<Types.IProfileRes>> {
    return apiInstance
      .get(ApiEndPoints.profile)
      .then((response) => response)
      .catch((error) => {
        throw error?.response?.data;
      });
  },

  // Google SignIn
  async googleSignIn(data: { access_token: string }): Promise<IApiSuccess<Types.ISignInRes>> {
    return apiInstance
      .post(ApiEndPoints.googleSignIn, data)
      .then((response) => response)
      .catch((error) => {
        throw error?.response?.data;
      });
  },

  // Clever SignIn
  async cleverSignIn(data: Types.ICleverSignInReq): Promise<IApiSuccess<Types.ISignInRes>> {
    return apiInstance
      .post(ApiEndPoints.cleverSignIn, data)
      .then((response) => response)
      .catch((error) => {
        throw error?.response?.data;
      });
  }
};

//hooks
export const authHooks = {
  useSignIn: (
    mutationOptions?: UseMutationOptions<IApiSuccess<Types.ISignInRes>, IApiError, Types.ISignInReq>
  ) => {
    return useApiMutation({
      mutationKey: authQueryKey.signIn(),
      mutationFn: authApi.signIn,
      mutationOptions
    });
  },

  useForgotPassword: (
    mutationOptions?: UseMutationOptions<IApiSuccess, IApiError, Types.IForgotPasswordReq>
  ) => {
    return useApiMutation({
      mutationKey: authQueryKey.forgotPassword(),
      mutationFn: authApi.forgotPassword,
      mutationOptions
    });
  },

  useResetPassword: (
    mutationOptions?: UseMutationOptions<IApiSuccess, IApiError, Types.IResetPasswordReq>
  ) => {
    return useApiMutation({
      mutationKey: authQueryKey.resetPassword(),
      mutationFn: authApi.resetPassword,
      mutationOptions
    });
  },

  useChangePassword: (
    mutationOptions?: UseMutationOptions<IApiSuccess, IApiError, Types.IChangePasswordReq>
  ) => {
    return useApiMutation({
      mutationKey: authQueryKey.changePassword(),
      mutationFn: authApi.changePassword,
      mutationOptions
    });
  },

  useUpdateProfile: (
    mutationOptions?: UseMutationOptions<IApiSuccess, IApiError, Types.IProfileUpdateReq>
  ) => {
    return useApiMutation({
      mutationKey: authQueryKey.profileUpdate(),
      mutationFn: authApi.updateProfile,
      mutationOptions
    });
  },

  useGetProfile: () => {
    return useApiQuery({
      queryKey: authQueryKey.profileGet(),
      queryFn: authApi.profileGet,
      queryOptions: { ...defaultQueryOptions }
    });
  },

  useGoogleSignIn: (
    mutationOptions?: UseMutationOptions<
      IApiSuccess<Types.ISignInRes>,
      IApiError,
      { access_token: string }
    >
  ) => {
    return useApiMutation({
      mutationKey: authQueryKey.googleSignIn(),
      mutationFn: authApi.googleSignIn,
      mutationOptions: mutationOptions as Omit<
        UseMutationOptions<IApiSuccess<Types.ISignInRes>, IApiError, { access_token: string }>,
        'mutationFn' | 'mutationKey'
      >
    });
  },

  useCleverSignIn: (
    mutationOptions?: UseMutationOptions<
      IApiSuccess<Types.ISignInRes>,
      IApiError,
      Types.ICleverSignInReq
    >
  ) => {
    return useApiMutation({
      mutationKey: authQueryKey.cleverSignIn(),
      mutationFn: authApi.cleverSignIn,
      mutationOptions: mutationOptions as Omit<
        UseMutationOptions<IApiSuccess<Types.ISignInRes>, IApiError, Types.ICleverSignInReq>,
        'mutationFn' | 'mutationKey'
      >
    });
  }
};
