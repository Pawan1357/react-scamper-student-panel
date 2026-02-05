import React from 'react';

import Breadcrumb from 'antd/es/breadcrumb/Breadcrumb';

import { Wrapper } from './breadcrumb.styled';

interface BreadcrumbItem {
  title: string;
  href?: string;
}

interface IBreadcrumbProps {
  items: BreadcrumbItem[];
}

const StyledBreadcrumb: React.FC<IBreadcrumbProps> = ({ items }) => {
  return (
    <Wrapper>
      <Breadcrumb separator="/" items={items}></Breadcrumb>
    </Wrapper>
  );
};

export default StyledBreadcrumb;
