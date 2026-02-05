import { LockOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Row } from 'antd';
import { useChangePassword } from 'modules/Auth/Modules/ChangePassword/hooks/useChangePassword';

import { INPUTS, VALIDATION_MESSAGES } from 'utils/constants';
import { validators } from 'utils/validation';

import { RenderPasswordInput } from 'components/common/FormField';

export const ChangePasswordForm = () => {
  const { form, onSubmit, navigate, isFormValid, onFieldsChange, isPending } = useChangePassword();

  return (
    <Form form={form} onFinish={onSubmit} onFieldsChange={onFieldsChange} autoComplete="off">
      <Row className="change-pwd-form" gutter={[15, 40]}>
        <RenderPasswordInput
          colProps={{ xs: 24, sm: 24 }}
          formItemProps={{
            name: 'current_password',
            label: INPUTS.LABEL.OLD_PASSWORD,
            required: true,
            rules: [
              {
                required: true,
                message: VALIDATION_MESSAGES.OLD_PASSWORD.REQUIRED
              }
            ]
          }}
          inputProps={{
            placeholder: INPUTS.PLACEHOLDER.OLD_PASSWORD,
            size: 'large',
            allowClear: true,
            autoFocus: true,
            'data-testid': 'current-password-input',
            prefix: <LockOutlined />
          }}
        />
        <RenderPasswordInput
          colProps={{ xs: 24, sm: 24 }}
          formItemProps={{
            name: 'new_password',
            label: INPUTS.LABEL.NEW_PASSWORD,
            dependencies: ['current_password'],
            required: true,
            rules: [
              {
                required: true,
                message: VALIDATION_MESSAGES.NEW_PASSWORD.REQUIRED
              },
              ({ getFieldValue }) => ({
                validator: validators.validateNewPasswordIsDifferent(
                  getFieldValue,
                  'current_password'
                )
              }),
              {
                pattern: VALIDATION_MESSAGES.PASSWORD.INVALID.REGEX,
                message: VALIDATION_MESSAGES.PASSWORD.INVALID.MESSAGE
              }
            ]
          }}
          inputProps={{
            placeholder: INPUTS.PLACEHOLDER.NEW_PASSWORD,
            size: 'large',
            allowClear: true,
            'data-testid': 'new-password-input',
            prefix: <LockOutlined />
          }}
        />
        <RenderPasswordInput
          colProps={{ xs: 24, sm: 24 }}
          formItemProps={{
            name: 'confirm_password',
            label: INPUTS.LABEL.CONFIRM_PASSWORD,
            dependencies: ['new_password'],
            required: true,
            rules: [
              {
                required: true,
                message: VALIDATION_MESSAGES.NEW_PASSWORD.CONFIRM_PASSWORD
              },
              ({ getFieldValue }) => ({
                validator: validators.validateNewPassword(getFieldValue, 'new_password')
              })
            ]
          }}
          inputProps={{
            placeholder: INPUTS.PLACEHOLDER.CONFIRM_PASSWORD,
            size: 'large',
            allowClear: true,
            'data-testid': 'confirm-password-input',
            prefix: <LockOutlined />
          }}
        />
      </Row>
      <div>
        <Divider />
        <Row className="form-btn-wrapper">
          <Button
            className="border-md pt-12 pb-12"
            block={true}
            type="default"
            size="large"
            htmlType="button"
            onClick={() => navigate(-1)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            className="border-md pt-12 pb-12"
            block={true}
            type="primary"
            size="large"
            htmlType="submit"
            loading={isPending}
            disabled={!isFormValid || isPending}
          >
            Save
          </Button>
        </Row>
      </div>
    </Form>
  );
};
