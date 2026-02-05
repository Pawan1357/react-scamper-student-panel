import { TITLES } from 'utils/constants';

import { LoginForm } from './components/LoginForm';
import AuthLayout from 'components/common/AuthLayout';
import Meta from 'components/common/Meta';

const SignIn: React.FC = () => {
  return (
    <>
      <Meta title={`${TITLES.COMMON} - ${TITLES.AUTH.LOGIN}`} />
      <AuthLayout formProps={{ title: TITLES.AUTH.LOGIN }}>
        <LoginForm />
      </AuthLayout>
    </>
  );
};

export default SignIn;
