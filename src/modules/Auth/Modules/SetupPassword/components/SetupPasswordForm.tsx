import { Button, Col, Form, Row } from 'antd';
import { InputWrapper } from 'modules/Auth/Auth.Styled';
import { useSetupPassword } from 'modules/Auth/Modules/SetupPassword/hooks/useSetupPassword.ts';

import { INPUTS, VALIDATION_MESSAGES } from 'utils/constants';
import { ROUTES } from 'utils/constants/routes';
import { validators } from 'utils/validation';

import { LinkWrapper } from 'components/common/AuthLayout/Auth.Styled';
import { RenderPasswordInput } from 'components/common/FormField';
import { LabelWithInfo } from 'components/common/LabelWithInfo';

export const SetupPasswordForm = () => {
  const { form, navigate, onSubmit, isFormValid, isPending, onFieldsChange } = useSetupPassword();
  return (
    <Form
      onFieldsChange={onFieldsChange}
      onFinish={onSubmit}
      form={form}
      autoComplete="off"
      className="signInForm"
    >
      <Row gutter={[0, 25]}>
        <InputWrapper>
          <div>
            <LabelWithInfo
              required
              label={INPUTS.LABEL.NEW_PASSWORD}
              info="Your password must be at least 8 characters and contain at least 1 special character, 1 number and 1 capital letter."
            />
            <RenderPasswordInput
              formItemProps={{
                name: 'new_password',
                required: true,
                rules: [
                  {
                    required: true,
                    message: VALIDATION_MESSAGES.NEW_PASSWORD.REQUIRED
                  },
                  {
                    pattern: VALIDATION_MESSAGES.PASSWORD.INVALID.REGEX,
                    message: VALIDATION_MESSAGES.PASSWORD.INVALID.MESSAGE
                  }
                ]
              }}
              inputProps={{
                placeholder: INPUTS.PLACEHOLDER.NEW_PASSWORD,
                required: true,
                size: 'large'
              }}
              colProps={{
                xs: 24
              }}
              colClassName="flex-none"
            />
          </div>

          <div>
            <LabelWithInfo
              required
              label={INPUTS.LABEL.RE_ENTER}
              info="Should be exactly same as the password you just entered above."
            />

            <RenderPasswordInput
              formItemProps={{
                name: 'password',
                required: true,
                dependencies: ['new_password'],
                rules: [
                  {
                    required: true,
                    message: VALIDATION_MESSAGES.NEW_PASSWORD.RE_ENTER
                  },
                  ({ getFieldValue }) => ({
                    validator: validators.validateNewPassword(getFieldValue, 'new_password')
                  })
                ]
              }}
              inputProps={{
                placeholder: INPUTS.PLACEHOLDER.RE_ENTER,
                required: true,
                size: 'large'
              }}
              colProps={{
                xs: 24
              }}
              colClassName="flex-none"
            />
          </div>
          <div className="w-100 text-right">
            <LinkWrapper onClick={() => navigate(ROUTES.signIn)}>Back to Login</LinkWrapper>
          </div>
        </InputWrapper>
        <Col xs={24}>
          <Button
            className="border-md pt-12 pb-12"
            block={true}
            type="primary"
            size="large"
            htmlType="submit"
            disabled={!isFormValid || isPending}
            loading={isPending}
          >
            {isPending ? 'Setting up' : 'Setup Password'}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
