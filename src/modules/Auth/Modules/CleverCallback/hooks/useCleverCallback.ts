import { CLEVER_CONFIG } from 'utils/constants';
import { showToaster } from 'utils/functions';

import { authHooks } from 'services/auth';
import { IProfileRes } from 'services/auth/types';
import { authStore } from 'services/store/auth';

export interface ICleverCallbackParams {
  code: string;
  state?: string;
}

export const useCleverCallback = () => {
  const { actions } = authStore((state) => state);
  const { mutate: mutateCleverSignIn, isPending: isProcessing } = authHooks.useCleverSignIn();

  const processCallback = (
    params: ICleverCallbackParams,
    callbacks?: {
      onSuccess?: () => void;
      onError?: (error: { message: string }) => void;
    }
  ) => {
    // Prepare payload for backend
    const payload = {
      code: params.code,
      redirect_uri: CLEVER_CONFIG.getRedirectUri()
    };

    // Call the Clever sign-in API
    mutateCleverSignIn(payload, {
      onSuccess: (response) => {
        showToaster('success', response.message || 'Successfully authenticated with Clever');
        actions.authSuccess({ data: response?.data as IProfileRes });
        callbacks?.onSuccess?.();
        // Navigation will be handled by the component watching auth state
      },
      onError: (error: any) => {
        // Extract error message from various possible locations in the error response
        const errorMessage =
          error?.message ||
          error?.response?.data?.message ||
          error?.data?.message ||
          'Failed to authenticate with Clever';
        showToaster('error', errorMessage);
        callbacks?.onError?.({ message: errorMessage });
      }
    });
  };

  return {
    processCallback,
    isProcessing,
    error: null // Error is handled in the component via callbacks
  };
};
