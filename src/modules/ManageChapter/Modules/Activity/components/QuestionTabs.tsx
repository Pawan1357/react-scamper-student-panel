import React from 'react';

import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

import type { QuestionTabsProps } from '../types';

export const QuestionTabs: React.FC<QuestionTabsProps> = ({
  totalQuestions,
  activeIndex,
  onTabChange
}) => {
  const items: TabsProps['items'] = Array.from({ length: totalQuestions }, (_, index) => ({
    key: String(index),
    label: `Question ${index + 1}`
  }));

  const handleChange = (key: string) => {
    onTabChange(Number(key));
  };

  return (
    <Tabs activeKey={String(activeIndex)} items={items} onChange={handleChange} size="large" />
  );
};
