import { TITLES } from 'utils/constants';

import { SetupPasswordForm } from './components/SetupPasswordForm';
import AuthLayout from 'components/common/AuthLayout';
import Meta from 'components/common/Meta';

const SetupPassword: React.FC = () => {
  return (
    <>
      <Meta title={`${TITLES.COMMON} - ${TITLES.AUTH.SETUP_PASSWORD}`} />
      <AuthLayout
        formProps={{
          title: TITLES.AUTH.SETUP_PASSWORD,
          desc: 'Please set your new password and then login to access your account.'
        }}
      >
        <SetupPasswordForm />
      </AuthLayout>
    </>
  );
};

export default SetupPassword;
