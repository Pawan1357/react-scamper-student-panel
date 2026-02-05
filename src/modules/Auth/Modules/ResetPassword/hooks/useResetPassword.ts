import { Form } from 'antd';
import { useFormValidation } from 'hooks/useFormValidation';
import { useNavigate, useParams } from 'react-router-dom';

import { IApiError } from 'utils/Types';
import { ROUTES } from 'utils/constants/routes';
import { showToaster } from 'utils/functions';

import { authHooks } from 'services/auth';
import { IResetPasswordReq } from 'services/auth/types';

export const useResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [form] = Form.useForm();

  const { isFormValid, onFieldsChange } = useFormValidation(form);

  const { mutate: mutateResetPassword, isPending } = authHooks.useResetPassword();

  const onSubmit = (values: IResetPasswordReq) => {
    if (!token) {
      showToaster('error', 'Reset token is missing.');
      return;
    }

    const payload: IResetPasswordReq = { reset_token: token, password: values.password };

    mutateResetPassword(
      { ...payload },
      {
        onSuccess: (response) => {
          showToaster('success', response.message);
          form.resetFields();
          navigate(ROUTES.signIn);
        },
        onError: (error: IApiError) => {
          showToaster('error', error.message);
        }
      }
    );
  };

  return {
    navigate,
    form,
    onSubmit,
    isFormValid,
    onFieldsChange,
    isPending
  };
};
