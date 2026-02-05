import { Form } from 'antd';
import { useFormValidation } from 'hooks/useFormValidation';
import { useNavigate } from 'react-router-dom';

import { IApiError } from 'utils/Types';
import { showToaster } from 'utils/functions';

import { authHooks } from 'services/auth';
import { IChangePasswordReq } from 'services/auth/types';

export const useChangePassword = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { isFormValid, onFieldsChange } = useFormValidation(form);

  const { mutate: mutateChangePassword, isPending } = authHooks.useChangePassword();

  const onSubmit = (values: IChangePasswordReq) => {
    const payload: IChangePasswordReq = {
      current_password: values.current_password,
      new_password: values.new_password
    };

    mutateChangePassword(
      { ...payload },
      {
        onSuccess: (response) => {
          showToaster('success', response.message);
          form.resetFields();
        },
        onError: (error: IApiError) => {
          showToaster('error', error.message);
        }
      }
    );
  };

  return { form, onSubmit, navigate, isFormValid, onFieldsChange, isPending };
};
