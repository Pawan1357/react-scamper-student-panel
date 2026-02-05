import { TITLES } from 'utils/constants';

import { ContentTabsSection } from './components/ContentTabsSection';
import { OverviewSection } from './components/OverviewSection';
import HeaderToolbar from 'components/common/HeaderToolbar';
import { Loader } from 'components/common/Loader';
import Meta from 'components/common/Meta';

import {
  ContentSection,
  DetailTabsWrapper,
  HiddenHeading,
  OverviewTabContent
} from './ViewChapter.styled';
import { useViewChapter } from './hooks/useViewChapter';

const ViewChapterPage: React.FC = () => {
  const { isLoading, contentTab, onContentTabChange, chapterData } = useViewChapter();

  if (isLoading) return <Loader />;

  return (
    <>
      <Meta title={`${TITLES.COMMON} - ${TITLES.CLASSROOM.VIEW_CHAPTER}`} />
      <HeaderToolbar title={TITLES.CLASSROOM.VIEW_CHAPTER} isMultipleBtn backBtn />

      <ContentSection role="main">
        <DetailTabsWrapper>
          <HiddenHeading id="chapter-detail-tabs">Chapter detail tabs</HiddenHeading>
          <OverviewTabContent>
            <OverviewSection overview={chapterData} />
            <ContentTabsSection
              activeTab={contentTab}
              onTabChange={onContentTabChange}
              lessons={chapterData?.lessons || []}
              gallery={chapterData?.media || []}
              resources={chapterData?.downloadable_content || []}
              rubrics={chapterData?.rubrics || []}
            />
          </OverviewTabContent>
        </DetailTabsWrapper>
      </ContentSection>
    </>
  );
};

export default ViewChapterPage;
