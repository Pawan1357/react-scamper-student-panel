import { Form } from 'antd';
import { useFormValidation } from 'hooks/useFormValidation';
import { useNavigate } from 'react-router-dom';

import { showToaster } from 'utils/functions';

import { authHooks } from 'services/auth';
import { IForgotPasswordReq } from 'services/auth/types';

export const useForgotPassword = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const { isFormValid, onFieldsChange } = useFormValidation(form);
  const { mutate: mutateForgotPassword, isPending } = authHooks.useForgotPassword();

  const onSubmit = (values: IForgotPasswordReq) => {
    mutateForgotPassword(
      { email: values.email },
      {
        onSuccess: (response) => {
          showToaster('success', response.message);
          form.resetFields();
        },
        onError: (error) => {
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
