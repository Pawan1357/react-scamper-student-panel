import { TITLES } from 'utils/constants';

import { OverviewSection } from '../view/components/OverviewSection';
import { ContentTabsSection } from './components/ContentTabsSection';
import HeaderToolbar from 'components/common/HeaderToolbar';
import { Loader } from 'components/common/Loader';
import Meta from 'components/common/Meta';

import {
  ContentSection,
  DetailTabsWrapper,
  HiddenHeading,
  OverviewTabContent
} from './ViewPastChapter.styled';
import { useViewPastChapter } from './hooks/useViewPastChapter';

const ViewPastChapterPage: React.FC = () => {
  const { isLoading, contentTab, onContentTabChange, chapterData } = useViewPastChapter();

  if (isLoading) return <Loader />;

  return (
    <>
      <Meta title={`${TITLES.COMMON} - ${TITLES.CLASSROOM.VIEW_PAST_CHAPTER}`} />
      <HeaderToolbar title={TITLES.CLASSROOM.VIEW_PAST_CHAPTER} isMultipleBtn backBtn />

      <ContentSection role="main">
        <DetailTabsWrapper>
          <HiddenHeading id="past-chapter-detail-tabs">Past chapter detail tabs</HiddenHeading>
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

export default ViewPastChapterPage;
