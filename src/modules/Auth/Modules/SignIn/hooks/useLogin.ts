import { useEffect, useState } from 'react';

import { Form } from 'antd';
import axios from 'axios';
import { useFormValidation } from 'hooks/useFormValidation';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { API_BASE } from 'utils/constants';
import { ROUTES } from 'utils/constants/routes';
import { showToaster } from 'utils/functions';

import { authHooks } from 'services/auth';
import { IProfileRes, ISignInReq } from 'services/auth/types';
import { apiEndPoints } from 'services/common';
import { authStore } from 'services/store/auth';

export const useLogin = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();

  const { actions } = authStore((state) => state);
  const [isCleverLoading, setIsCleverLoading] = useState(false);

  const { isFormValid, onFieldsChange } = useFormValidation(form);
  const { mutate: mutateSignIn, isPending } = authHooks.useSignIn();

  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const token = searchParams.get('token');
    const dataParam = searchParams.get('data');
    const error = searchParams.get('error');

    if (token || error) {
      setIsProcessing(true);
    }

    // Handle error case
    if (error) {
      const decodedError = decodeURIComponent(error);
      showToaster('error', decodedError);
      setTimeout(() => {
        navigate(ROUTES.signIn, { replace: true });
        setIsProcessing(false);
      }, 100);
      return;
    }

    // Handle success case
    if (token && dataParam) {
      try {
        // Decode the URL-encoded data
        const decodedData = decodeURIComponent(dataParam);
        const parsedData = JSON.parse(decodedData);

        // Combine token with parsed data for authSuccess
        const authData: IProfileRes = {
          ...parsedData,
          access_token: token
        } as IProfileRes;

        // Store data in authSuccess store
        actions.authSuccess({ data: authData });

        // Navigate to dashboard with replace: true
        setTimeout(() => {
          navigate(ROUTES.dashboard, { replace: true });
          setIsProcessing(false);
        }, 100);
        showToaster('success', 'You have successfully logged in to your account.');
      } catch (error) {
        const errorMessage = error as any;
        showToaster(
          'error',
          errorMessage?.message ||
            errorMessage?.[0]?.message ||
            'Failed to process authentication data. Please try again.'
        );
        setTimeout(() => {
          navigate(ROUTES.signIn, { replace: true });
          setIsProcessing(false);
        }, 100);
      }
    }
  }, [searchParams, navigate, actions]);

  const googleLogin = () => {
    setIsGoogleLoading(true);
    axios
      .get(`${API_BASE}${apiEndPoints.googleRedirectUrlApi}`)
      .then((res) => {
        const reDirectUrl = res?.data?.data?.auth_url;
        if (reDirectUrl) {
          window.location.href = reDirectUrl;
        }
      })
      .catch((err) =>
        showToaster('error', err?.message || err?.[0]?.message || 'Something went wrong.')
      )
      .finally(() => {
        setIsGoogleLoading(false);
      });
  };

  const cleverLogin = () => {
    setIsCleverLoading(true);
    axios
      .get(`${API_BASE}${apiEndPoints.cleverRedirectUrlApi}`)
      .then((res) => {
        const reDirectUrl = res?.data?.data?.auth_url;
        if (reDirectUrl) {
          window.location.href = reDirectUrl;
        }
      })
      .catch((err) =>
        showToaster('error', err?.message || err?.[0]?.message || 'Something went wrong.')
      )
      .finally(() => {
        setIsCleverLoading(false);
      });
  };

  const onSubmit = (values: ISignInReq) => {
    mutateSignIn(values, {
      onSuccess: (response) => {
        showToaster('success', response.message);
        actions.authSuccess({ data: response?.data as any });
        navigate(ROUTES.dashboard, { replace: true });
      },
      onError: (error) => {
        showToaster('error', error.message);
      }
    });
  };

  return {
    navigate,
    form,
    onSubmit,
    isPending,
    isFormValid,
    onFieldsChange,
    googleLogin,
    cleverLogin,
    isCleverLoading,
    isGoogleLoading,
    isProcessing
  };
};
