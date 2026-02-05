import { Button, Col, Form } from 'antd';
import { InputWrapper } from 'modules/Auth/Auth.Styled';
import { useLogin } from 'modules/Auth/Modules/SignIn/hooks/useLogin.ts';

import { INPUTS, VALIDATION_MESSAGES } from 'utils/constants';
import { ROUTES } from 'utils/constants/routes';

import {
  LinkWrapper,
  LoginFormWrapper,
  SocialButtonsWrapper,
  VerticalDivider
} from 'components/common/AuthLayout/Auth.Styled';
import { RenderPasswordInput, RenderTextInput } from 'components/common/FormField';
import { Loader } from 'components/common/Loader';
import { CleverIcon, GoogleIcon } from 'components/svg';

export const LoginForm = () => {
  const {
    navigate,
    form,
    isFormValid,
    isPending,
    onFieldsChange,
    onSubmit,
    googleLogin,
    cleverLogin,
    isCleverLoading,
    isGoogleLoading,
    isProcessing
  } = useLogin();

  return (
    <>
      {isProcessing && <Loader />}
      <Form
        onFieldsChange={onFieldsChange}
        onFinish={onSubmit}
        form={form}
        autoComplete="off"
        className="sign-in-form"
      >
        <LoginFormWrapper>
          <div className="login-left-section">
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
              <RenderPasswordInput
                formItemProps={{
                  name: 'password',
                  label: INPUTS.LABEL.PASSWORD,
                  required: true,
                  rules: [
                    {
                      required: true,
                      message: VALIDATION_MESSAGES.PASSWORD.REQUIRED
                    }
                  ]
                }}
                inputProps={{
                  name: 'password',
                  placeholder: INPUTS.PLACEHOLDER.PASSWORD,
                  required: true,
                  type: 'password',
                  size: 'large'
                }}
                colProps={{
                  xs: 24
                }}
                colClassName="flex-none"
              />

              <div className="w-100 text-right">
                <LinkWrapper onClick={() => navigate(ROUTES.forgotPassword)}>
                  Forgot Password?
                </LinkWrapper>
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
                {isPending ? 'Logging in...' : 'Login'}
              </Button>
            </Col>
          </div>

          <VerticalDivider>
            <div className="divider-line"></div>
            <span className="divider-text">Or</span>
            <div className="divider-line"></div>
          </VerticalDivider>

          <SocialButtonsWrapper>
            <Button
              className="social-button"
              block={true}
              type="default"
              size="large"
              onClick={() => googleLogin()}
              loading={isGoogleLoading}
              disabled={isGoogleLoading}
            >
              <span className="button-content">
                <GoogleIcon />
                <span>
                  {isGoogleLoading ? 'Redirecting to Google login...' : 'Continue with Google'}
                </span>
              </span>
            </Button>
            <Button
              className="social-button"
              block={true}
              type="default"
              size="large"
              onClick={() => cleverLogin()}
              loading={isCleverLoading}
              disabled={isCleverLoading}
            >
              <span className="button-content">
                <CleverIcon />
                <span>{isCleverLoading ? 'Redirecting to Clever...' : 'Continue with Clever'}</span>
              </span>
            </Button>
          </SocialButtonsWrapper>
        </LoginFormWrapper>
      </Form>
    </>
  );
};
