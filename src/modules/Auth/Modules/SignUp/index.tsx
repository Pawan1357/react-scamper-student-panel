import { useCallback } from 'react';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Col, Form, Row } from 'antd';
import { FormTitle } from 'modules/Auth/Auth.Styled';

import AuthLayout from 'components/common/AuthLayout';
import { RenderPasswordInput, RenderTextInput } from 'components/common/FormField';
import Meta from 'components/common/Meta';

const SignIn: React.FC = () => {
  const [form] = Form.useForm();
  const onSubmit = useCallback(async () => {
    console.log('onSubmit');
  }, []);

  return (
    <>
      <Meta title="Scamper Education - Sign Up" />
      <AuthLayout>
        <FormTitle>SignUp</FormTitle>
        <Form onFinish={onSubmit} form={form} autoComplete="off" className="signUpForm">
          <Row gutter={[0, 30]}>
            <RenderTextInput
              colProps={{
                xs: 24
              }}
              formItemProps={{
                name: 'email',
                rules: [
                  {
                    required: true,
                    message: 'Please enter your email'
                  },
                  {
                    type: 'email',
                    message: 'Please enter valid email'
                  }
                ]
              }}
              inputProps={{
                placeholder: 'Enter your email id here...',
                size: 'large',
                prefix: <UserOutlined />
              }}
            />
            <RenderPasswordInput
              formItemProps={{
                rules: [
                  () => ({
                    validator: (_: unknown, value: string) => {
                      if (!value) {
                        return Promise.reject(new Error('Please enter your password'));
                      } else if (/^\S{3,}$/.test(value) && /^.{6,16}$/.test(value)) {
                        return Promise.resolve();
                      } else {
                        return Promise.reject(
                          new Error('Password must be 6-16 characters long and not contain spaces')
                        );
                      }
                    }
                  })
                ]
              }}
              inputProps={{
                name: 'password',
                placeholder: 'Enter your password here...',
                required: true,
                type: 'password',
                prefix: <LockOutlined />
              }}
              colProps={{
                xs: 24
              }}
            />
            <Col xs={24}>
              <Button block={true} type="primary" size="middle" htmlType="submit">
                Login
              </Button>
            </Col>
          </Row>
        </Form>
      </AuthLayout>
    </>
  );
};

export default SignIn;
