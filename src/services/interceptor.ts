import axios, { AxiosInstance, AxiosResponse } from 'axios';

import { API_BASE } from 'utils/constants';
import { appLoader, showToaster } from 'utils/functions';

import { authStore } from 'services/store/auth';

const apiInstance: AxiosInstance = axios.create({
  baseURL: API_BASE
});

export function setAxiosInterceptor() {
  apiInstance.interceptors.request.use(
    (config) => {
      appLoader(true);
      console.log('Starting Loading');
      return config;
    },
    (error) => {
      console.error('Request interceptor error:', error);
      return Promise.reject(error);
    }
  );

  // It's used to intercept all the axios api response
  apiInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      appLoader(false);
      return response.data;
    },
    (err) => {
      appLoader(false);

      if (err.response) {
        if (err.response.status === 403) {
          authStore.getState().actions.authFail();
          showToaster('error', err?.response?.data?.message);
          return Promise.reject(err);
        } else {
          return Promise.reject(err);
        }
      } else if (err.request) {
        return Promise.reject({
          response: {
            data: {
              message: 'Something went wrong, Please try again later.'
            }
          }
        });
      }
    }
  );
}

export default apiInstance;
