import { Navigate, Outlet, useSearchParams } from 'react-router-dom';

import { ROUTES } from 'utils/constants/routes';

import { authStore } from 'services/store/auth';

const PublicGuard = () => {
  const { isLoggedIn } = authStore((state) => state);
  const [searchParams] = useSearchParams();

  if (isLoggedIn) {
    // Check if there's a redirect parameter and use it, otherwise go to dashboard
    const redirectParam = searchParams.get('redirect');
    if (redirectParam) {
      try {
        const redirectPath = decodeURIComponent(redirectParam);
        return <Navigate to={redirectPath} replace={true} />;
      } catch (error) {
        // If redirect parameter is malformed, default to dashboard
        return <Navigate to={ROUTES.dashboard} replace={true} />;
      }
    }
    return <Navigate to={ROUTES.dashboard} replace={true} />;
  }

  return <Outlet />;
};

export default PublicGuard;
