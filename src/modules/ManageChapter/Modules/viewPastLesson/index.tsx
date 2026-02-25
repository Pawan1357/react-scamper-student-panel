import { TITLES } from 'utils/constants';

import HeaderToolbar from 'components/common/HeaderToolbar';
import { ContentSection, ContentTabsSection, OverviewSection } from 'components/common/Lesson';
import { Loader } from 'components/common/Loader';
import Meta from 'components/common/Meta';

import { useViewPastLesson } from './hooks/useViewPastLesson';

const ViewPastLessonPage: React.FC = () => {
  const { detailTab, isLoading, contentTab, onContentTabChange, lessonData } = useViewPastLesson();

  if (isLoading) return <Loader />;

  return (
    <>
      <Meta title={`${TITLES.COMMON} - ${TITLES.CLASSROOM.VIEW_PAST_LESSON}`} />
      <HeaderToolbar title={TITLES.CLASSROOM.VIEW_PAST_LESSON} isMultipleBtn backBtn />

      <ContentSection role="main">
        <OverviewSection lesson={lessonData!} />

        <ContentTabsSection
          activeTab={contentTab}
          onTabChange={onContentTabChange}
          activities={lessonData?.activities || []}
          detailTab={detailTab}
          gallery={
            detailTab === 'teacherGuidelines'
              ? lessonData?.teacher_guidelines?.media || []
              : lessonData?.media || []
          }
          resources={
            detailTab === 'teacherGuidelines'
              ? lessonData?.teacher_guidelines?.downloadable_content || []
              : lessonData?.downloadable_content || []
          }
          spinningWheelParts={lessonData?.spin_configs || []}
          module="chapter"
          showStatusBadge={true}
          isPastContext={true}
        />
      </ContentSection>
    </>
  );
};

export default ViewPastLessonPage;
