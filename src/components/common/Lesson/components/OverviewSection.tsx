import { HiddenHeading, LessonBody, LessonCard } from '../Lesson.styled';
import type { OverviewSectionProps } from '../types';

export const OverviewSection: React.FC<OverviewSectionProps> = ({ lesson }) => {
  return (
    <LessonCard bordered={false}>
      <HiddenHeading id="lesson-detail-tabs">Lesson detail tabs</HiddenHeading>
      <LessonBody>
        <h2>{lesson?.name || '-'}</h2>
        <p
          className="tiptap-content-view"
          dangerouslySetInnerHTML={{ __html: lesson?.description || '' }}
        />
      </LessonBody>
    </LessonCard>
  );
};
