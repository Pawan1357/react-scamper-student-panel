import { useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { ROUTES } from 'utils/constants/routes';

import { authStore } from 'services/store/auth';

import { LoaderWrapper } from '../Loader';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { isLoggedIn } = authStore((state) => state);

  useEffect(() => {
    if (!isLoggedIn) {
      // Store the current path as redirect parameter
      const currentPath = location.pathname + location.search;
      // Only add redirect if it's not already the sign-in page
      if (currentPath !== ROUTES.signIn) {
        navigate(`${ROUTES.signIn}?redirect=${encodeURIComponent(currentPath)}`, { replace: true });
      } else {
        navigate(ROUTES.signIn, { replace: true });
      }
    }
  }, [isLoggedIn, navigate, location]);
  if (isLoggedIn) return <>{children}</>;
  else
    return (
      <LoaderWrapper>
        <h6>Loading</h6>
      </LoaderWrapper>
    );
};

export default AuthGuard;
