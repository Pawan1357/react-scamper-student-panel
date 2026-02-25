import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { showToaster } from 'utils/functions';

import { chapterHooks } from 'services/chapter';

import type { ContentTabKey } from '../types';

export const useViewChapter = () => {
  const [contentTab, setContentTab] = useState<ContentTabKey>('lessons');

  const { chapterId } = useParams<{ chapterId: string }>();

  const {
    data: chapterData,
    isError,
    error,
    isLoading
  } = chapterHooks.useGetChapterById(chapterId as string);

  useEffect(() => {
    if (isError) {
      showToaster('error', error?.message || 'Failed to fetch chapter details.');
    }
  }, [isError, error]);

  const onContentTabChange = (tab: ContentTabKey) => {
    setContentTab(tab);
  };

  return {
    isLoading,
    contentTab,
    onContentTabChange,
    chapterData: chapterData?.data || undefined
  };
};
