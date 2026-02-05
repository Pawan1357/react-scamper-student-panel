import { Button, Col, Form, Row } from 'antd';
import { InputWrapper } from 'modules/Auth/Auth.Styled';
import { useForgotPassword } from 'modules/Auth/Modules/ForgotPassword/hooks/useForgotPassword';

import { INPUTS, VALIDATION_MESSAGES } from 'utils/constants';
import { ROUTES } from 'utils/constants/routes';

import { LinkWrapper } from 'components/common/AuthLayout/Auth.Styled';
import { RenderTextInput } from 'components/common/FormField';

export const ForgotPasswordForm = () => {
  const { form, navigate, onSubmit, isFormValid, onFieldsChange, isPending } = useForgotPassword();

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
          <RenderTextInput
            colProps={{
              xs: 24
            }}
            colClassName="flex-none"
            formItemProps={{
              name: 'email',
              label: INPUTS.LABEL.EMAIL,
              required: true,
              rules: [
                {
                  required: true,
                  message: VALIDATION_MESSAGES.EMAIL.REQUIRED
                },
                {
                  type: 'email',
                  message: VALIDATION_MESSAGES.EMAIL.INVALID.MESSAGE
                }
              ]
            }}
            inputProps={{
              placeholder: INPUTS.PLACEHOLDER.EMAIL,
              size: 'large'
            }}
          />
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
            {isPending ? 'Sending...' : 'Send Link'}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
