import { Suspense, lazy } from 'react';

import { Content } from 'antd/es/layout/layout';
import { Outlet } from 'react-router-dom';

import { Loader } from 'components/common/Loader';

import { StyledLayout } from './Layout.Styled';

const Header = lazy(() => import('./header'));

const Layout = () => {
  return (
    <StyledLayout>
      <Header />
      <Content>
        <div className="content-body">
          <div className="content-wrap">
            <Suspense fallback={<Loader />}>
              <Outlet />
            </Suspense>
          </div>
        </div>
      </Content>
    </StyledLayout>
  );
};

export default Layout;
