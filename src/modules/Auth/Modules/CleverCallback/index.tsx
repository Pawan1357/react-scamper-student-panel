import { useEffect, useState } from 'react';

import { Button, Spin } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { TITLES } from 'utils/constants';
import { ROUTES } from 'utils/constants/routes';
import { showToaster } from 'utils/functions';

import { authStore } from 'services/store/auth';

import AuthLayout from 'components/common/AuthLayout';
import Meta from 'components/common/Meta';

import { useCleverCallback } from './hooks/useCleverCallback';

const CleverCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { processCallback, isProcessing } = useCleverCallback();
  const { isLoggedIn } = authStore((state) => state);

  const [status, setStatus] = useState<'loading' | 'error' | 'success'>('loading');

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');

    // Handle OAuth error from Clever
    if (error) {
      setStatus('error');
      showToaster('error', errorDescription || error || 'Clever authentication failed.');
      return;
    }

    // Check if code is present
    if (!code) {
      setStatus('error');
      showToaster('error', 'Authorization code not found. Please try logging in again.');
      return;
    }

    // Process the callback
    processCallback(
      { code, state: state || undefined },
      {
        onSuccess: () => {
          setStatus('success');
        },
        onError: (err) => {
          setStatus('error');
          showToaster('error', err.message || 'Failed to authenticate with Clever.');
        }
      }
    );
  }, []);

  // Redirect to dashboard when authentication is successful and user is logged in
  useEffect(() => {
    if (status === 'success' && isLoggedIn) {
      // Use a small delay to ensure state is fully updated
      const timer = setTimeout(() => {
        window.location.href = ROUTES.dashboard;
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [status, isLoggedIn]);

  // Handle manual redirect to login
  const handleGoBackToLogin = () => {
    navigate(ROUTES.signIn, { replace: true });
  };

  // Auto-redirect to login on error after a delay
  useEffect(() => {
    if (status === 'error') {
      const timer = setTimeout(() => {
        navigate(ROUTES.signIn, { replace: true });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status, navigate]);

  return (
    <>
      <Meta title={`${TITLES.COMMON} - Clever Authentication`} />
      <AuthLayout>
        {status === 'loading' || isProcessing ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '16px',
              padding: '20px'
            }}
          >
            <Spin />
            <p style={{ fontSize: '14px', margin: 0, textAlign: 'center' }}>
              Please wait while we complete your authentication...
            </p>
          </div>
        ) : status === 'error' ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <p style={{ marginBottom: '24px', color: '#8c8c8c', fontSize: '14px' }}>
              Authentication failed. Please try again.
            </p>
            <p style={{ marginBottom: '24px', color: '#8c8c8c', fontSize: '14px' }}>
              You will be redirected to the login page shortly.
            </p>
            <Button type="primary" size="large" onClick={handleGoBackToLogin} block>
              Back to Login
            </Button>
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '16px',
              padding: '20px'
            }}
          >
            <Spin />
            <p style={{ color: '#8c8c8c', fontSize: '14px', margin: 0, textAlign: 'center' }}>
              Redirecting to your dashboard...
            </p>
          </div>
        )}
      </AuthLayout>
    </>
  );
};

export default CleverCallback;
