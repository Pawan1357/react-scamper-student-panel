import { Navigate, Outlet } from 'react-router-dom';

import { ROUTES } from 'utils/constants/routes';

import { authStore } from 'services/store/auth';

const PublicGuard = () => {
  const { isLoggedIn } = authStore((state) => state);

  if (isLoggedIn) {
    return <Navigate to={ROUTES.dashboard} replace={true} />;
  }

  return <Outlet />;
};

export default PublicGuard;
