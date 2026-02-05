import { TITLES } from 'utils/constants';

import { ResetPasswordForm } from './components/ResetPasswordForm';
import AuthLayout from 'components/common/AuthLayout';
import Meta from 'components/common/Meta';

const ResetPassword: React.FC = () => {
  return (
    <>
      <Meta title={`${TITLES.COMMON} - ${TITLES.AUTH.RESET_PASSWORD}`} />
      <AuthLayout
        formProps={{
          title: TITLES.AUTH.RESET_PASSWORD,
          desc: 'Please set your new password and then login again to access your account.'
        }}
      >
        <ResetPasswordForm />
      </AuthLayout>
    </>
  );
};

export default ResetPassword;
