import { create } from 'zustand';

import { LocalStorageKeys } from 'utils/constants';

import { IProfileRes } from 'services/auth/types';
import apiInstance from 'services/interceptor';

export type IAuthStore = {
  isLoading: boolean;
  isLoggedIn: boolean;
  userData: IProfileRes;
  isSuperAdmin?: boolean;
};

interface IAuthAction {
  actions: {
    loaderChange: (status: IAuthStore['isLoading']) => void;
    authSuccess: (payload: { data: IProfileRes }) => void;
    authFail: () => void;
  };
}

export const authStore = create<IAuthStore & IAuthAction>((set) => ({
  // initial state
  isLoading: false,
  isLoggedIn: false,
  userData: {} as IProfileRes,

  // Actions
  actions: {
    loaderChange: (status) => set((state) => ({ ...state, isLoading: status })),
    authSuccess: (payload) =>
      set((state) => {
        apiInstance.defaults.headers.common['Authorization'] =
          `Bearer ${payload.data?.access_token}`;
        localStorage.setItem(
          LocalStorageKeys.authToken,
          JSON.stringify(payload.data?.access_token)
        );
        localStorage.setItem(LocalStorageKeys.user, JSON.stringify(payload.data));
        return {
          ...state,
          userData: payload.data,
          isLoggedIn: true
        };
      }),
    authFail: () =>
      set((state) => {
        delete apiInstance.defaults.headers.common['Authorization'];
        localStorage.removeItem(LocalStorageKeys.authToken);
        localStorage.removeItem(LocalStorageKeys.user);
        return {
          ...state,
          userData: {} as any,
          isLoggedIn: false
        };
      })
  }
}));
