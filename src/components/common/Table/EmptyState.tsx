// components/common/EmptyState.tsx
import React from 'react';

import { Empty } from 'antd';

interface EmptyStateProps {
  isEmpty: boolean;
  search?: string;
  defaultDescription?: string;
  searchDescription?: string;
  defaultImage?: string;
  searchImage?: string;
  textStyle?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  isEmpty,
  textStyle,
  search,
  defaultDescription = 'No Data',
  searchDescription = 'Search not found',
  defaultImage = Empty.PRESENTED_IMAGE_SIMPLE
}) => {
  if (!isEmpty) return null;

  return search ? (
    <Empty
      style={textStyle ? { fontSize: '20px', fontWeight: 'bolder' } : undefined}
      className="pt-40 pb-40"
      image={defaultImage}
      description={searchDescription}
    />
  ) : (
    <Empty
      style={textStyle ? { fontSize: '20px', fontWeight: 'bolder' } : undefined}
      className="pt-40 pb-40"
      image={defaultImage}
      description={defaultDescription}
    />
  );
};

export default EmptyState;
