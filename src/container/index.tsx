import { Suspense } from 'react';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter } from 'react-router-dom';
import ThemeProvider from 'style/Config';
import GlobalStyle from 'style/Global';

import { setupAxios } from '../utils/functions';
import { GOOGLE_CLIENT_ID } from 'utils/constants';

import ErrorBoundary from 'components/common/Error';
import { LoaderWrapper } from 'components/common/Loader';

import Routes from './routes';

setupAxios();

const queryClient = new QueryClient();

const AppContainer = () => (
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <ThemeProvider>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <Suspense
            fallback={
              <LoaderWrapper>
                <h6 className="text-center">Loading</h6>
              </LoaderWrapper>
            }
          >
            <BrowserRouter>
              <GlobalStyle />
              <Routes />
            </BrowserRouter>
          </Suspense>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ErrorBoundary>
    </ThemeProvider>
  </GoogleOAuthProvider>
);

export default AppContainer;
