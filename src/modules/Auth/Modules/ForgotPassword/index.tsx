import { TITLES } from 'utils/constants';

import { ForgotPasswordForm } from './components/ForgotPasswordForm';
import AuthLayout from 'components/common/AuthLayout';
import Meta from 'components/common/Meta';

const ForgotPassword: React.FC = () => {
  return (
    <>
      <Meta title={`${TITLES.COMMON} - ${TITLES.AUTH.FORGOT_PASSWORD}`} />
      <AuthLayout
        formProps={{
          title: `${TITLES.AUTH.FORGOT_PASSWORD}?`,
          desc: 'Don’t worry! Enter your registered email to get a reset password link.'
        }}
      >
        <ForgotPasswordForm />
      </AuthLayout>
    </>
  );
};

export default ForgotPassword;
