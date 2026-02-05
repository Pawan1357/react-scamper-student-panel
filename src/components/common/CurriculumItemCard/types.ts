export type LessonModule = 'chapter' | 'teacherLearning';

export interface CurriculumItemCardProps {
  listData: any;
  btnText: string;
  isDetailIcon?: boolean;
  isLabel?: boolean;
  isActivity?: boolean;
  module?: LessonModule;
  showStatusBadge?: boolean;
  isPastContext?: boolean;
}
