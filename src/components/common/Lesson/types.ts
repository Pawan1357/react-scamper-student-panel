import { IGetLessonByIdRes } from 'services/chapter/types';

export type DetailTabKey = 'overview' | 'teacherGuidelines';

export type ContentTabKey = 'activities' | 'imagesVideos' | 'downloadableContent' | 'spinningWheel';

export type LessonModule = 'chapter' | 'teacherLearning';

export interface ActivityItem {
  id: string;
  title: string;
  curriculamDetails: any;
}

export interface GalleryItem {
  id: string;
  title: string;
  mediaType: 'image' | 'video';
  imageSrc: string;
}

export interface ResourceItem {
  id: string;
  title: string;
  size: string;
}

export interface SpinPart {
  id: string;
  title: string;
  image?: string;
  description?: string;
  points?: number;
}

export interface LessonData {
  title: string;
  description: string[];
}

export interface OverviewSectionProps {
  lesson:
    | IGetLessonByIdRes
    | (Omit<IGetLessonByIdRes, 'teacher_guidelines' | 'spin_configs'> & {
        teacher_guidelines?: IGetLessonByIdRes['teacher_guidelines'];
        spin_configs?: IGetLessonByIdRes['spin_configs'];
      });
}

export interface ContentTabsSectionProps {
  activeTab: ContentTabKey;
  onTabChange: (tab: ContentTabKey) => void;
  detailTab: DetailTabKey;
  activities: IGetLessonByIdRes['activities'];
  gallery: IGetLessonByIdRes['media'];
  resources: IGetLessonByIdRes['downloadable_content'];
  spinningWheelParts?: IGetLessonByIdRes['spin_configs'];
  showSpinningWheel?: boolean;
  mediaUrlName?: string;
  module?: LessonModule;
  activityRouteParams?: {
    teacherLearningId?: string;
    chapterId?: string;
  };
  showStatusBadge?: boolean;
  isPastContext?: boolean;
}
