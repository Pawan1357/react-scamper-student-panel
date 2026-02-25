// Shared components used: HeaderToolbar, Meta. New files: hooks/useViewLesson.ts, components/OverviewSection.tsx, components/ContentTabsSection.tsx, Lesson.styled.ts, types.ts
import { TITLES } from 'utils/constants';
import { ROUTES } from 'utils/constants/routes';

import HeaderToolbar from 'components/common/HeaderToolbar';
import { ContentSection, ContentTabsSection, OverviewSection } from 'components/common/Lesson';
import { Loader } from 'components/common/Loader';
import Meta from 'components/common/Meta';

import { useViewLesson } from './hooks/useViewLesson';

const ViewLessonPage: React.FC = () => {
  const { detailTab, isLoading, contentTab, onContentTabChange, lessonData } = useViewLesson();

  if (isLoading) return <Loader />;

  return (
    <>
      <Meta title={`${TITLES.COMMON} - View Lesson`} />
      <HeaderToolbar
        title="View Lesson"
        isMultipleBtn
        backBtn
        backTo={
          lessonData?.chapter_id
            ? ROUTES.chapter.viewChapter(String(lessonData?.chapter_id))
            : undefined
        }
      />

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
        />
      </ContentSection>
    </>
  );
};

export default ViewLessonPage;
